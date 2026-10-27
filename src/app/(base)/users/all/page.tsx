import type { Metadata } from "next";
import { UsersTable } from "./users-table";

export const metadata: Metadata = { title: "Хэрэглэгчид" };

export default function UsersPage() {
  return <UsersTable />;
}
