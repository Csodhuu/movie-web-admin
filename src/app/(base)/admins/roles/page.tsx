import type { Metadata } from "next";
import { RolesMatrix } from "./roles-matrix";

export const metadata: Metadata = { title: "Эрхийн түвшин" };

export default function RolesPage() {
  return <RolesMatrix />;
}
