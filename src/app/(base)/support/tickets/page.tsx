import type { Metadata } from "next";
import { TicketsInbox } from "./tickets-inbox";

export const metadata: Metadata = { title: "Хүсэлт, тикет" };

export default function TicketsPage() {
  return <TicketsInbox />;
}
