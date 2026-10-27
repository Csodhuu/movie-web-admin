import type { Metadata } from "next";
import { SeriesManager } from "./series-manager";

export const metadata: Metadata = { title: "Цуврал" };

export default function SeriesPage() {
  return <SeriesManager />;
}
