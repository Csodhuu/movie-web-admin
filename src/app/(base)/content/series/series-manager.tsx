"use client";

import { formatCompact } from "@/lib/format";
import { useState } from "react";
import { Badge, Button, Card, EmptyState, Field, IconButton, PageHeader, Poster, Table, Td, cn, inputClass, type BadgeTone } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { episodes, series, type ContentStatus } from "@/lib/placeholders";

const statusMeta: Record<ContentStatus, { label: string; tone: BadgeTone }> = {
  published: { label: "Нийтлэгдсэн", tone: "green" },
  draft: { label: "Ноорог", tone: "gray" },
  scheduled: { label: "Товлосон", tone: "blue" },
  archived: { label: "Архив", tone: "yellow" },
};

export function SeriesManager() {
  const [selectedId, setSelectedId] = useState(series[0]?.id);
  const [season, setSeason] = useState(1);
  const selected = series.find((s) => s.id === selectedId);

  const header = (
    <PageHeader
      title="Цуврал"
      description="Цуврал, улирал, ангиудыг удирдах"
      actions={
        <ModalButton label="Шинэ цуврал" title="Шинэ цуврал нэмэх">
          <Field label="Нэр">
            <input className={inputClass} placeholder="Цувралын нэр" />
          </Field>
          <Field label="Тайлбар">
            <textarea rows={3} className={inputClass} />
          </Field>
        </ModalButton>
      }
    />
  );

  if (!selected) {
    return (
      <>
        {header}
        <Card>
          <EmptyState icon="film" title="Одоогоор цуврал алга" desc="“Шинэ цуврал” товчоор нэмээрэй" />
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Цуврал"
        description="Цуврал, улирал, ангиудыг удирдах"
        actions={
          <ModalButton label="Шинэ цуврал" title="Шинэ цуврал нэмэх">
            <Field label="Нэр">
              <input className={inputClass} placeholder="Цувралын нэр" />
            </Field>
            <Field label="Төрөл">
              <select className={inputClass}>
                <option>Драм</option>
                <option>Инээдмийн</option>
                <option>Триллер</option>
                <option>Түүхэн</option>
              </select>
            </Field>
            <Field label="Тайлбар">
              <textarea rows={3} className={inputClass} />
            </Field>
          </ModalButton>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card title={`Цувралууд (${series.length})`}>
          <ul className="-mx-2 space-y-1">
            {series.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    setSelectedId(s.id);
                    setSeason(1);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-2 text-left transition",
                    s.id === selectedId ? "bg-red-500/10" : "hover:bg-zinc-900",
                  )}
                >
                  <Poster title={s.title} className="h-14 w-10" />
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-sm font-medium", s.id === selectedId ? "text-red-300" : "text-zinc-100")}>
                      {s.title}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {s.seasons.length} улирал · {s.seasons.reduce((n, x) => n + x.episodes, 0)} анги
                    </p>
                  </div>
                  <Badge tone={statusMeta[s.status].tone}>{statusMeta[s.status].label}</Badge>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <Poster title={selected.title} className="h-24 w-16" />
              <div>
                <h2 className="text-lg font-semibold text-white">{selected.title}</h2>
                <p className="text-sm text-zinc-500">{selected.genre}</p>
                <div className="mt-2">
                  <Badge tone={statusMeta[selected.status].tone}>{statusMeta[selected.status].label}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" icon="edit">
                Засах
              </Button>
              <Button variant="secondary" icon="plus">
                Улирал нэмэх
              </Button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex gap-1">
              {selected.seasons.map((s) => (
                <button
                  key={s.n}
                  onClick={() => setSeason(s.n)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm transition",
                    season === s.n ? "bg-zinc-800 font-medium text-white" : "text-zinc-400 hover:text-zinc-100",
                  )}
                >
                  {s.n}-р улирал
                  <span className="ml-1.5 text-xs text-zinc-500">{s.episodes}</span>
                </button>
              ))}
            </div>
            <Button icon="upload">Анги нэмэх</Button>
          </div>

          <Table head={["#", "Ангийн нэр", "Үргэлжлэх", "Үзэлт", "Төлөв", ""]}>
            {episodes.map((e) => (
              <tr key={e.n} className="hover:bg-zinc-900/60">
                <Td className="w-12 text-zinc-500">{e.n}</Td>
                <Td className="font-medium text-zinc-100">{e.title}</Td>
                <Td>{e.duration}</Td>
                <Td>{e.views ? formatCompact(e.views) : "—"}</Td>
                <Td>
                  <Badge tone={statusMeta[e.status].tone}>{statusMeta[e.status].label}</Badge>
                </Td>
                <Td>
                  <div className="flex justify-end gap-0.5">
                    <IconButton icon="play" label="Тоглуулах" />
                    <IconButton icon="edit" label="Засах" />
                    <IconButton icon="trash" label="Устгах" className="hover:text-red-400" />
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </>
  );
}
