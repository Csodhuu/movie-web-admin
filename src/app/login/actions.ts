"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import {
  createSession,
  deleteSession,
  getCurrentAdmin,
  logAudit,
} from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models/admin";

export type LoginState = { error?: string; email?: string };

// Имэйл олдоогүй үед ч bcrypt-ийг ажиллуулж, хариу өгөх хугацаагаар имэйл байгаа эсэхийг тааж болохгүй болгоно.
const DUMMY_HASH =
  "$2b$12$C6UzMDM.H6dfI/f/IKcEeO3SgiL2bL5lJ3xV8sP0dXcN3r1QmM8zG";

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  if (!email || !password) {
    return { error: "Имэйл болон нууц үгээ оруулна уу", email };
  }

  try {
    await connectDB();
  } catch (err) {
    // Жинхэнэ шалтгаан (env байхгүй, IP зөвшөөрөөгүй, нууц үг буруу) Vercel → Logs дээр харагдана
    console.error("[login] MongoDB холболт амжилтгүй:", err);
    return {
      error: "Өгөгдлийн сантай холбогдож чадсангүй. Дараа дахин оролдоно уу.",
      email,
    };
  }

  const admin = await Admin.findOne({ email }).select("+passwordHash");
  const valid = await bcrypt.compare(
    password,
    admin?.passwordHash ?? DUMMY_HASH,
  );

  if (!admin || !valid) {
    return { error: "Имэйл эсвэл нууц үг буруу байна", email };
  }
  if (admin.disabled) {
    return {
      error: "Энэ данс идэвхгүй болсон байна. Super Admin-д хандана уу.",
      email,
    };
  }

  await createSession(String(admin._id), remember);
  admin.lastActiveAt = new Date();
  await admin.save();
  await logAudit(
    {
      id: String(admin._id),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    "Нэвтэрсэн",
  );

  redirect("/dashboard");
}

export async function logout() {
  const admin = await getCurrentAdmin();
  if (admin) await logAudit(admin, "Гарсан");
  await deleteSession();
  redirect("/login");
}
