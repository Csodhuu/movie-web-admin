import type { Metadata } from "next";
import { ReviewsQueue } from "./reviews-queue";

export const metadata: Metadata = { title: "Сэтгэгдэл" };

export default function ReviewsPage() {
  return <ReviewsQueue />;
}
