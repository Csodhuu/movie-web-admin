import type { Metadata } from "next";
import { ContentManager } from "./content-manager";

export const metadata: Metadata = { title: "Контент" };

export default function ContentPage() {
  return <ContentManager />;
}
