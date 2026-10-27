"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  IconButton,
  PageHeader,
  Poster,
  SearchInput,
  Table,
  Td,
  cn,
  inputClass,
  type BadgeTone,
} from "@/components/admin";
import { Icon } from "@/components/icons";
import { formatCompact, movies as initialMovies, type ContentStatus } from "@/lib/mock-data";

const statusMeta: Record<ContentStatus, { label: string; tone: BadgeTone }> = {
  published: { label: "Нийтлэгдсэн", tone: "green" },
  draft: { label: "Ноорог", tone: "gray" },
  scheduled: { label: "Товлосон", tone: "blue" },
  archived: { label: "Архивлагдсан", tone: "yellow" },
};

const tabs: { key: ContentStatus | "all"; label: string }[] = [
  { key: "all", label: "Бүгд" },
  { key: "published", label: "Нийтлэгдсэн" },
  { key: "scheduled", label: "Товлосон" },
  { key: "draft", label: "Ноорог" },
  { key: "archived", label: "Архив" },
];

export function ContentManager() {
  const [items, setItems] = useState(initialMovies);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<ContentStatus | "all">("all");
  const [type, setType] = useState("Бүгд");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (tab === "all" || m.status === tab) &&
          (type === "Бүгд" || m.type === type) &&
          m.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query, tab, type],
  );

  return (
    <>
      <PageHeader
        title="Контент"
        description={`Нийт ${items.length} кино, цуврал, шоу`}
        actions={
          <>
            <Button variant="secondary" icon="upload">
              Импорт
            </Button>
            <Button icon="plus" onClick={() => setModalOpen(true)}>
              Шинэ контент
            </Button>
          </>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition",
                  tab === t.key
                    ? "bg-zinc-800 font-medium text-white"
                    : "text-zinc-400 hover:text-zinc-100",
                )}
              >
                {t.label}
                <span className="ml-1.5 text-xs text-zinc-500">
                  {t.key === "all" ? items.length : items.filter((m) => m.status === t.key).length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={cn(inputClass, "sm:w-36")}
            >
              {["Бүгд", "Кино", "Цуврал", "Баримтат", "Шоу"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <SearchInput placeholder="Нэрээр хайх..." value={query} onChange={setQuery} />
          </div>
        </div>

        <Table head={["Контент", "Төрөл", "Он", "Үргэлжлэх", "Үзэлт", "Үнэлгээ", "Төлөв", ""]}>
          {filtered.map((m) => (
            <tr key={m.id} className="hover:bg-zinc-900/60">
              <Td>
                <div className="flex items-center gap-3">
                  <Poster title={m.title} className="h-12 w-9" />
                  <div>
                    <p className="font-medium text-zinc-100">{m.title}</p>
                    <p className="text-xs text-zinc-500">{m.genre}</p>
                  </div>
                </div>
              </Td>
              <Td>{m.type}</Td>
              <Td>{m.year}</Td>
              <Td className="text-zinc-400">{m.duration}</Td>
              <Td>{m.views ? formatCompact(m.views) : "—"}</Td>
              <Td>
                {m.rating ? (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Icon name="star" className="size-3.5" />
                    {m.rating}
                  </span>
                ) : (
                  "—"
                )}
              </Td>
              <Td>
                <Badge tone={statusMeta[m.status].tone}>{statusMeta[m.status].label}</Badge>
              </Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="eye" label="Харах" />
                  <IconButton icon="edit" label="Засах" />
                  <IconButton
                    icon="trash"
                    label="Устгах"
                    className="hover:text-red-400"
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== m.id))}
                  />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">Илэрц олдсонгүй</div>
        )}
      </Card>

      {modalOpen && (
        <NewContentModal
          onClose={() => setModalOpen(false)}
          onSave={(title, contentType, genre) => {
            setItems((prev) => [
              {
                id: Date.now(),
                title,
                type: contentType,
                genre,
                year: 2026,
                duration: "—",
                views: 0,
                rating: 0,
                status: "draft",
              },
              ...prev,
            ]);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}

function NewContentModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (title: string, type: string, genre: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Кино");
  const [genre, setGenre] = useState("Драм");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-content-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="new-content-title" className="text-lg font-semibold text-white">
            Шинэ контент нэмэх
          </h2>
          <IconButton icon="x" label="Хаах" onClick={onClose} />
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (title.trim()) onSave(title.trim(), type, genre);
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-zinc-300">Нэр</span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Жишээ: Тэнгэрийн хаалга"
              className={inputClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1.5">
              <span className="text-sm text-zinc-300">Төрөл</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
                {["Кино", "Цуврал", "Баримтат", "Шоу"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm text-zinc-300">Жанр</span>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className={inputClass}>
                {["Драм", "Инээдмийн", "Триллер", "Түүхэн", "Романтик", "Адал явдал", "Баримтат"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm text-zinc-300">Тайлбар</span>
            <textarea rows={3} placeholder="Товч агуулга..." className={inputClass} />
          </label>
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/40 px-4 py-6 text-center">
            <Icon name="upload" className="size-6 text-zinc-500" />
            <p className="text-sm text-zinc-300">Постер болон видео файл чирж оруулна уу</p>
            <p className="text-xs text-zinc-500">JPG, PNG, MP4 · 10GB хүртэл</p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose}>
              Болих
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Ноорог болгон хадгалах
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
