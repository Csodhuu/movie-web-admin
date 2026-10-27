"use server";

import bcrypt from "bcryptjs";
import { isValidObjectId } from "mongoose";
import { refresh } from "next/cache";
import { FORBIDDEN_MESSAGE, authorize, logAudit } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models/admin";
import { Session } from "@/lib/models/session";
import { ROLES, type Role } from "@/lib/permissions";

export type ActionResult = { error?: string; ok?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRole(v: string): v is Role {
  return (ROLES as readonly string[]).includes(v);
}

/** Сүүлийн идэвхтэй Super Admin-ыг хасах/бууруулахаас сэргийлнэ */
async function isLastSuperAdmin(id: string) {
  const target = await Admin.findById(id).lean();
  if (target?.role !== "Super Admin" || target.disabled) return false;
  const count = await Admin.countDocuments({ role: "Super Admin", disabled: { $ne: true } });
  return count <= 1;
}

export async function createAdmin(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const me = await authorize("admins.manage");
  if (!me) return { error: FORBIDDEN_MESSAGE };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!name) return { error: "Нэр оруулна уу" };
  if (!EMAIL_RE.test(email)) return { error: "Зөв имэйл хаяг оруулна уу" };
  if (!isRole(role)) return { error: "Үүрэг буруу байна" };
  if (password.length < 8) return { error: "Нууц үг хамгийн багадаа 8 тэмдэгт байна" };

  await connectDB();
  if (await Admin.exists({ email })) return { error: "Энэ имэйлтэй админ аль хэдийн бүртгэлтэй байна" };

  await Admin.create({ name, email, role, passwordHash: await bcrypt.hash(password, 12) });
  await logAudit(me, "Админ нэмсэн", `${name} (${role})`);
  refresh();
  return { ok: true };
}

export async function updateAdmin(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const me = await authorize("admins.manage");
  if (!me) return { error: FORBIDDEN_MESSAGE };

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isValidObjectId(id)) return { error: "Админ олдсонгүй" };
  if (!name) return { error: "Нэр оруулна уу" };
  if (!isRole(role)) return { error: "Үүрэг буруу байна" };
  if (password && password.length < 8) return { error: "Нууц үг хамгийн багадаа 8 тэмдэгт байна" };

  await connectDB();
  const admin = await Admin.findById(id);
  if (!admin) return { error: "Админ олдсонгүй" };
  if (admin.role !== role && (await isLastSuperAdmin(id))) {
    return { error: "Сүүлийн Super Admin-ын үүргийг өөрчлөх боломжгүй" };
  }

  const roleChanged = admin.role !== role;
  admin.name = name;
  admin.role = role;
  if (password) admin.passwordHash = await bcrypt.hash(password, 12);
  await admin.save();

  // Нууц үг солигдвол бусад төхөөрөмж дээрх сессийг хүчингүй болгоно
  if (password && id !== me.id) await Session.deleteMany({ admin: id });

  await logAudit(
    me,
    "Админ засварласан",
    [name, roleChanged && `үүрэг → ${role}`, password && "нууц үг солисон"].filter(Boolean).join(", "),
  );
  refresh();
  return { ok: true };
}

export async function setAdminDisabled(id: string, disabled: boolean): Promise<ActionResult> {
  const me = await authorize("admins.manage");
  if (!me) return { error: FORBIDDEN_MESSAGE };
  if (!isValidObjectId(id)) return { error: "Админ олдсонгүй" };
  if (id === me.id) return { error: "Өөрийгөө идэвхгүй болгох боломжгүй" };

  await connectDB();
  if (disabled && (await isLastSuperAdmin(id))) return { error: "Сүүлийн Super Admin-ыг идэвхгүй болгох боломжгүй" };

  const admin = await Admin.findByIdAndUpdate(id, { disabled });
  if (!admin) return { error: "Админ олдсонгүй" };
  if (disabled) await Session.deleteMany({ admin: id });

  await logAudit(me, disabled ? "Админ идэвхгүй болгосон" : "Админ идэвхжүүлсэн", admin.name);
  refresh();
  return { ok: true };
}

export async function deleteAdmin(id: string): Promise<ActionResult> {
  const me = await authorize("admins.manage");
  if (!me) return { error: FORBIDDEN_MESSAGE };
  if (!isValidObjectId(id)) return { error: "Админ олдсонгүй" };
  if (id === me.id) return { error: "Өөрийгөө устгах боломжгүй" };

  await connectDB();
  if (await isLastSuperAdmin(id)) return { error: "Сүүлийн Super Admin-ыг устгах боломжгүй" };

  const admin = await Admin.findByIdAndDelete(id);
  if (!admin) return { error: "Админ олдсонгүй" };
  await Session.deleteMany({ admin: id });

  await logAudit(me, "Админ устгасан", admin.name);
  refresh();
  return { ok: true };
}
