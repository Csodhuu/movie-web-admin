"use client";

import { formatCompact } from "@/lib/format";
import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
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
import { Modal } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import type { MovieDTO } from "@/lib/data/movies";

import { deleteMovie, saveMovie, setMovieStatus, type ActionResult, type MovieFormState } from "./actions";

type Status = MovieDTO["status"];

const statusMeta: Record<Status, { label: string; tone: BadgeTone }> = {
  published: { label: "Нийтлэгдсэн", tone: "green" },
  draft: { label: "Ноорог", tone: "gray" },
  scheduled: { label: "Товлосон", tone: "blue" },
  archived: { label: "Архивлагдсан", tone: "yellow" },
};

const tabs: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "Бүгд" },
  { key: "published", label: "Нийтлэгдсэн" },
  { key: "scheduled", label: "Товлосон" },
  { key: "draft", label: "Ноорог" },
  { key: "archived", label: "Архив" },
];

const TYPES = ["Кино", "Цуврал", "Баримтат", "Шоу"];
const GENRES = ["Драм", "Инээдмийн", "Триллер", "Түүхэн", "Романтик", "Адал явдал", "Баримтат", "Гэр бүл", "Спорт", "Шинжлэх ухаан"];

export function ContentManager({ movies }: { movies: MovieDTO[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Status | "all">("all");
  const [type, setType] = useState("Бүгд");
  // null = хаалттай, "new" = шинэ, MovieDTO = засах
  const [editing, setEditing] = useState<MovieDTO | "new" | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(
    () =>
      movies.filter(
        (m) =>
          (tab === "all" || m.status === tab) &&
          (type === "Бүгд" || m.type === type) &&
          m.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [movies, query, tab, type],
  );

  function run(id: string, fn: () => Promise<ActionResult>) {
    setPendingId(id);
    setError(null);
    startTransition(async () => {
      try {
        const res = await fn();
        if (res.error) setError(res.error);
      } catch {
        setError("Алдаа гарлаа. Дахин оролдоно уу.");
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Кино"
        description={`Нийт ${movies.length} кино, цуврал, шоу`}
        actions={
          <Button icon="plus" onClick={() => setEditing("new")}>
            Шинэ контент
          </Button>
        }
      />

      {error && (
        <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Card>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition",
                  tab === t.key ? "bg-zinc-800 font-medium text-white" : "text-zinc-400 hover:text-zinc-100",
                )}
              >
                {t.label}
                <span className="ml-1.5 text-xs text-zinc-500">
                  {t.key === "all" ? movies.length : movies.filter((m) => m.status === t.key).length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select value={type} onChange={(e) => setType(e.target.value)} className={cn(inputClass, "sm:w-36")}>
              {["Бүгд", ...TYPES].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <SearchInput placeholder="Нэрээр хайх..." value={query} onChange={setQuery} />
          </div>
        </div>

        {movies.length === 0 ? (
          <EmptyState icon="film" title="Одоогоор контент алга" desc="“Шинэ контент” товчоор эхний киногоо нэмээрэй" />
        ) : (
          <>
            <Table head={["Контент", "Төрөл", "Он", "Үргэлжлэх", "Үзэлт", "Үнэлгээ", "Төлөв", ""]}>
              {filtered.map((m) => (
                <tr key={m.id} className={cn("hover:bg-zinc-900/60", pendingId === m.id && "opacity-50")}>
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
                  <Td>{m.year ?? "—"}</Td>
                  <Td className="text-zinc-400">{m.duration || "—"}</Td>
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
                    <StatusPicker
                      value={m.status}
                      disabled={pendingId === m.id}
                      onChange={(s) => run(m.id, () => setMovieStatus(m.id, s))}
                    />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-0.5">
                      <IconButton icon="edit" label="Засах" onClick={() => setEditing(m)} />
                      <IconButton
                        icon="trash"
                        label="Устгах"
                        className="hover:text-red-400"
                        disabled={pendingId === m.id}
                        onClick={() => {
                          if (confirm(`"${m.title}"-г устгах уу? Энэ үйлдлийг буцаах боломжгүй.`)) {
                            run(m.id, () => deleteMovie(m.id));
                          }
                        }}
                      />
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
            {filtered.length === 0 && <div className="py-12 text-center text-sm text-zinc-500">Илэрц олдсонгүй</div>}
          </>
        )}
      </Card>

      {editing && (
        <MovieFormModal
          key={editing === "new" ? "new" : editing.id}
          movie={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

/** Badge дээр дарахад төлөв сонгох жижиг цэс */
function StatusPicker({
  value,
  disabled,
  onChange,
}: {
  value: Status;
  disabled?: boolean;
  onChange: (s: Status) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-full disabled:opacity-50"
      >
        <Badge tone={statusMeta[value].tone}>{statusMeta[value].label}</Badge>
        <Icon name="chevron" className="size-3 rotate-90 text-zinc-500" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul role="listbox" className="absolute left-0 z-20 mt-1 w-40 rounded-lg border border-zinc-800 bg-zinc-950 p-1 shadow-xl">
            {(Object.keys(statusMeta) as Status[]).map((s) => (
              <li key={s}>
                <button
                  type="button"
                  role="option"
                  aria-selected={s === value}
                  onClick={() => {
                    setOpen(false);
                    if (s !== value) onChange(s);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  {statusMeta[s].label}
                  {s === value && <Icon name="check" className="size-3.5 text-red-400" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function MovieFormModal({ movie, onClose }: { movie: MovieDTO | null; onClose: () => void }) {
  const [state, formAction, pending] = useActionState<MovieFormState, FormData>(saveMovie, {});

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  return (
    <Modal title={movie ? "Контент засах" : "Шинэ контент нэмэх"} onClose={onClose} wide>
      <form action={formAction} className="space-y-4">
        {movie && <input type="hidden" name="id" value={movie.id} />}
        {state.error && (
          <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </div>
        )}
        <Field label="Нэр">
          <input name="title" required autoFocus defaultValue={movie?.title} placeholder="Жишээ: Тэнгэрийн хаалга" className={inputClass} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Төрөл">
            <select name="type" defaultValue={movie?.type ?? "Кино"} className={inputClass}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Жанр">
            <select name="genre" defaultValue={movie?.genre || "Драм"} className={inputClass}>
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Гарсан он">
            <input name="year" type="number" min={1900} max={2100} defaultValue={movie?.year ?? ""} className={inputClass} />
          </Field>
          <Field label="Үргэлжлэх хугацаа">
            <input name="duration" defaultValue={movie?.duration} placeholder="2ц 14м эсвэл 12 анги" className={inputClass} />
          </Field>
        </div>
        <Field label="Тайлбар">
          <textarea name="description" rows={3} defaultValue={movie?.description} placeholder="Товч агуулга..." className={inputClass} />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Болих
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Хадгалж байна..." : movie ? "Хадгалах" : "Ноорог болгон хадгалах"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
