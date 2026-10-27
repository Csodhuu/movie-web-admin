import type { Metadata } from "next";
import { AdminsManager } from "./admins-manager";

export const metadata: Metadata = { title: "Админууд" };

export default function AdminsPage() {
  return <AdminsManager />;
}
