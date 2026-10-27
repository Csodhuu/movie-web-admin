"use client";

import { useState } from "react";
import { Avatar, Badge, Button, Card, PageHeader, StatCard, cn, type BadgeTone } from "@/components/admin";
import { Icon } from "@/components/icons";
import { reviews as initialReviews, type ReviewStatus } from "@/lib/mock-data";

const statusMeta: Record<ReviewStatus, { label: string; tone: BadgeTone }> = {
  approved: { label: "Зөвшөөрсөн", tone: "green" },
  pending: { label: "Хүлээгдэж буй", tone: "yellow" },
  flagged: { label: "Мэдэгдэгдсэн", tone: "red" },
};

const filters: { key: ReviewStatus | "all"; label: string }[] = [
  { key: "all", label: "Бүгд" },
  { key: "pending", label: "Хүлээгдэж буй" },
  { key: "flagged", label: "Мэдэгдэгдсэн" },
  { key: "approved", label: "Зөвшөөрсөн" },
];

export function ReviewsQueue() {
  const [items, setItems] = useState(initialReviews);
  const [filter, setFilter] = useState<ReviewStatus | "all">("all");

  const visible = items.filter((r) => filter === "all" || r.status === filter);

  function setStatus(id: number, status: ReviewStatus) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <>
      <PageHeader title="Сэтгэгдэл ба үнэлгээ" description="Хэрэглэгчдийн сэтгэгдлийг хянах, зохицуулах" />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Дундаж үнэлгээ" value="4.4 / 5" change={1.2} icon="star" />
        <StatCard
          label="Хүлээгдэж буй"
          value={String(items.filter((r) => r.status === "pending").length)}
          icon="clock"
        />
        <StatCard
          label="Мэдэгдэгдсэн"
          value={String(items.filter((r) => r.status === "flagged").length)}
          icon="flag"
        />
      </div>

      <div className="mb-4 flex gap-1 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition",
              filter === f.key ? "bg-zinc-800 font-medium text-white" : "text-zinc-400 hover:text-zinc-100",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((r) => (
          <Card key={r.id} className={r.status === "flagged" ? "border-red-500/30" : undefined}>
            <div className="flex items-start gap-3">
              <Avatar name={r.user} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-medium text-zinc-100">{r.user}</p>
                  <Badge tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {r.movie} · {r.date}
                </p>
              </div>
              <div className="flex" aria-label={`${r.rating} од`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    className={cn("size-4", i < r.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700")}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">{r.text}</p>
            <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-zinc-800/70 pt-4">
              {r.status !== "approved" && (
                <Button variant="secondary" icon="check" onClick={() => setStatus(r.id, "approved")}>
                  Зөвшөөрөх
                </Button>
              )}
              {r.status !== "flagged" && (
                <Button variant="ghost" icon="flag" onClick={() => setStatus(r.id, "flagged")}>
                  Мэдэгдэх
                </Button>
              )}
              <Button
                variant="ghost"
                icon="trash"
                className="hover:text-red-400"
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== r.id))}
              >
                Устгах
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {visible.length === 0 && (
        <Card className="py-12 text-center text-sm text-zinc-500">Энэ ангилалд сэтгэгдэл алга</Card>
      )}
    </>
  );
}
