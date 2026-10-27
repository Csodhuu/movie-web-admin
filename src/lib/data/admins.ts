import "server-only";
import { authorize } from "../auth";
import { connectDB } from "../db";
import { Admin } from "../models/admin";
import type { Role } from "../permissions";

export type AdminDTO = {
  id: string;
  name: string;
  email: string;
  role: Role;
  twoFA: boolean;
  disabled: boolean;
  lastActive: string;
  isSelf: boolean;
};

const dateFmt = new Intl.DateTimeFormat("mn-MN", {
  timeZone: "Asia/Ulaanbaatar",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

/** Эрхгүй бол null буцаана */
export async function listAdmins(): Promise<AdminDTO[] | null> {
  const me = await authorize("admins.manage");
  if (!me) return null;

  await connectDB();
  const docs = await Admin.find().sort({ createdAt: 1 }).lean();
  return docs.map((a) => ({
    id: String(a._id),
    name: a.name,
    email: a.email,
    role: a.role as Role,
    twoFA: Boolean(a.twoFA),
    disabled: Boolean(a.disabled),
    lastActive: a.lastActiveAt ? dateFmt.format(a.lastActiveAt) : "Нэвтэрч байгаагүй",
    isSelf: String(a._id) === me.id,
  }));
}
