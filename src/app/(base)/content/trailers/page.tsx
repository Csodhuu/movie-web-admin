import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, UploadBox, formatBadge, inputClass } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { movies, trailers } from "@/lib/placeholders";
import { formatCompact } from "@/lib/format";

export const metadata: Metadata = { title: "Трейлер" };

export default function TrailersPage() {
  return (
    <>
      <PageHeader
        title="Трейлер"
        description="Кино, цувралын трейлер, тизер"
        actions={
          <ModalButton label="Трейлер оруулах" icon="upload" title="Трейлер оруулах" submitLabel="Оруулах">
            <UploadBox title="Видео файл чирж оруулна уу" hint="MP4, MOV · 2GB хүртэл" />
            <Field label="Гарчиг">
              <input className={inputClass} />
            </Field>
            <Field label="Холбогдох контент">
              <select className={inputClass}>
                {movies.map((m) => (
                  <option key={m.id}>{m.title}</option>
                ))}
              </select>
            </Field>
          </ModalButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trailers.map((t) => {
          const s = formatBadge(t.status);
          return (
            <Card key={t.id} className="overflow-hidden p-0">
              <div className="group relative flex aspect-video items-center justify-center bg-gradient-to-br from-red-950 via-zinc-900 to-zinc-950">
                <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-red-600">
                  <Icon name="play" className="size-5" />
                </span>
                <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                  {t.duration}
                </span>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-medium text-zinc-100">{t.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{t.movie}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge tone={s.tone}>{s.label}</Badge>
                  <div className="flex items-center gap-1">
                    <span className="mr-1 text-xs text-zinc-500">{t.views ? formatCompact(t.views) : "—"} үзэлт</span>
                    <IconButton icon="edit" label="Засах" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
