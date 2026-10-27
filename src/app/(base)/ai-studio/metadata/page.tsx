import type { Metadata } from "next";
import { PageHeader } from "@/components/admin";
import { Generator } from "../_components/generator";

export const metadata: Metadata = { title: "Автомат шошго, тайлбар" };

export default function MetadataPage() {
  return (
    <>
      <PageHeader
        title="Автомат шошго, тайлбар"
        description="Контентын товч агуулга, түлхүүр үг, жанрыг AI-аар үүсгэх"
      />
      <Generator only={["description", "tags"]} />
    </>
  );
}
