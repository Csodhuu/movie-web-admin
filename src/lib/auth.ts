import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { connectDB } from "./db";
import { Admin } from "./models/admin";
import { AuditLog } from "./models/audit-log";
import { Session } from "./models/session";
import { hasPermission, type Permission, type Role } from "./permissions";

export const SESSION_COOKIE = "admin_session";
const DAY = 24 * 60 * 60 * 1000;

export type CurrentAdmin = { id: string; name: string; email: string; role: Role };

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function requestMeta() {
  const h = await headers();
  return {
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
    userAgent: h.get("user-agent") ?? undefined,
  };
}

export async function createSession(adminId: string, remember: boolean) {
  await connectDB();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + (remember ? 30 : 1) * DAY);

  await Session.create({ tokenHash: hashToken(token), admin: adminId, expiresAt, ...(await requestMeta()) });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // "Намайг сана" сонгоогүй бол хөтөч хаагдахад cookie устна
    ...(remember ? { expires: expiresAt } : {}),
  });
}

export async function deleteSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await connectDB();
    await Session.deleteOne({ tokenHash: hashToken(token) });
  }
  jar.delete(SESSION_COOKIE);
}

/** Одоогийн админ. Нэвтрээгүй эсвэл сесс хүчингүй бол null. Нэг хүсэлтэд нэг л удаа DB-ээс уншина. */
export const getCurrentAdmin = cache(async (): Promise<CurrentAdmin | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // Админы өгөгдлийг prefetch/prerender хийлгүй, жинхэнэ хүсэлт ирэхэд л уншина.
  // (MongoDB драйвер дотооддоо new Date() ашигладаг тул үүнгүйгээр Cache Components алдаа өгнө.)
  await connection();
  await connectDB();
  // Хугацааг MongoDB серверийн цагаар ($$NOW) шалгана
  const session = await Session.findOne({
    tokenHash: hashToken(token),
    $expr: { $gt: ["$expiresAt", "$$NOW"] },
  }).lean();
  if (!session) return null;

  const admin = await Admin.findById(session.admin).lean();
  if (!admin || admin.disabled) return null;

  return { id: String(admin._id), name: admin.name, email: admin.email, role: admin.role as Role };
});

/** Хуудас, action-ий эхэнд дуудна. Нэвтрээгүй бол /login руу шилжүүлнэ. */
export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/login");
  return admin;
}

export const FORBIDDEN_MESSAGE = "Энэ үйлдлийг хийх эрх хүрэлцэхгүй байна";

/** Өгөгдөл уншихад: эрхгүй бол алдаа шиднэ (error boundary харуулна). */
export async function requirePermission(permission: Permission) {
  const admin = await requireAdmin();
  if (!hasPermission(admin.role, permission)) throw new Error(FORBIDDEN_MESSAGE);
  return admin;
}

/**
 * Server action-д: эрхгүй бол null буцаана. Production-д шидэгдсэн алдааны мессеж
 * client-д нуугддаг тул action-ууд алдааг { error } хэлбэрээр буцаах ёстой.
 */
export async function authorize(permission: Permission) {
  const admin = await requireAdmin();
  return hasPermission(admin.role, permission) ? admin : null;
}

export async function logAudit(admin: CurrentAdmin, action: string, target = "") {
  await connectDB();
  const { ip } = await requestMeta();
  await AuditLog.create({ admin: admin.id, adminName: admin.name, action, target, ip });
}
