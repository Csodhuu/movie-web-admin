"use client";

import { useState } from "react";
import { Avatar, Badge, Button, Card, EmptyState, PageHeader, StatusBadge, cn, inputClass, type BadgeTone } from "@/components/admin";
import { tickets, type Priority } from "@/lib/placeholders";

const priorityMeta: Record<Priority, { label: string; tone: BadgeTone }> = {
  high: { label: "Яаралтай", tone: "red" },
  medium: { label: "Дунд", tone: "yellow" },
  low: { label: "Бага", tone: "gray" },
};

export function TicketsInbox() {
  const [activeId, setActiveId] = useState(tickets[0]?.id ?? "");
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<Record<string, { from: "user" | "admin"; text: string }[]>>({});
  const active = tickets.find((t) => t.id === activeId);

  if (!active) {
    return (
      <>
        <PageHeader title="Хүсэлт, тикет" description="Хэрэглэгчдийн асуудал, хүсэлтийг шийдвэрлэх" />
        <Card>
          <EmptyState icon="ticket" title="Одоогоор хүсэлт алга" desc="Хэрэглэгчид хүсэлт илгээхэд энд харагдана" />
        </Card>
      </>
    );
  }

  const thread = messages[activeId] ?? [];

  return (
    <>
      <PageHeader title="Хүсэлт, тикет" description="Хэрэглэгчдийн асуудал, хүсэлтийг шийдвэрлэх" />

      <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <Card className="p-0">
          <ul className="divide-y divide-zinc-800/70">
            {tickets.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "w-full px-4 py-3.5 text-left transition",
                    t.id === activeId ? "bg-red-500/5" : "hover:bg-zinc-900/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-zinc-500">{t.id}</span>
                    <span className="text-xs text-zinc-500">{t.updated}</span>
                  </div>
                  <p className={cn("mt-1 text-sm font-medium", t.id === activeId ? "text-red-300" : "text-zinc-100")}>
                    {t.subject}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-zinc-500">{t.user}</span>
                    <Badge tone={priorityMeta[t.priority].tone}>{priorityMeta[t.priority].label}</Badge>
                    <StatusBadge status={t.status} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <p className="font-mono text-xs text-zinc-500">
                {active.id} · {active.category}
              </p>
              <h2 className="mt-0.5 text-lg font-semibold text-white">{active.subject}</h2>
            </div>
            <div className="flex gap-2">
              <select className={cn(inputClass, "w-36")} defaultValue={active.status} key={active.id}>
                <option value="open">Нээлттэй</option>
                <option value="in_progress">Шийдвэрлэж буй</option>
                <option value="resolved">Шийдсэн</option>
              </select>
            </div>
          </div>

          <ul className="flex-1 space-y-4">
            {thread.map((m, i) => (
              <li key={i} className={cn("flex gap-3", m.from === "admin" && "flex-row-reverse")}>
                <Avatar name={m.from === "user" ? active.user : "Админ"} />
                <div
                  className={cn(
                    "max-w-[75%] rounded-xl px-4 py-2.5 text-sm",
                    m.from === "user" ? "bg-zinc-800 text-zinc-200" : "bg-red-600 text-white",
                  )}
                >
                  {m.text}
                </div>
              </li>
            ))}
          </ul>

          <form
            className="mt-6 flex gap-2 border-t border-zinc-800 pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!reply.trim()) return;
              setMessages((prev) => ({
                ...prev,
                [activeId]: [...(prev[activeId] ?? []), { from: "admin", text: reply.trim() }],
              }));
              setReply("");
            }}
          >
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Хариу бичих..."
              className={inputClass}
            />
            <Button type="submit">Илгээх</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
