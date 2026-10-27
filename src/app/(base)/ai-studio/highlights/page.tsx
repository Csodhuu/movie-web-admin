import type { Metadata } from "next";
import { Badge, Button, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { Icon } from "@/components/icons";
import { movies } from "@/lib/placeholders";
import { JobQueue, type Job } from "../_components/jobs";

export const metadata: Metadata = { title: "Highlight, трейлер" };

const clips: { start: string; end: string; label: string; score: number; type: string }[] = [];

const jobs: Job[] = [];

export default function HighlightsPage() {
  return (
    <>
      <PageHeader title="Highlight, трейлер автоматаар таслах" description="Онцлох хэсгийг AI таньж, трейлер, богино клип үүсгэх" />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card title="Тохиргоо">
          <div className="space-y-4">
            <Field label="Контент">
              <select className={inputClass}>
                {movies.map((m) => (
                  <option key={m.id}>{m.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Гаралт">
              <select className={inputClass}>
                <option>Трейлер (60–90 сек)</option>
                <option>Тизер (15–30 сек)</option>
                <option>Shorts / Reels (9:16)</option>
              </select>
            </Field>
            <Field label="Спойлер хамгаалалт">
              <select className={inputClass}>
                <option>Эхний 70%-аас л авах</option>
                <option>Хязгааргүй</option>
              </select>
            </Field>
            <Button icon="scissors" className="w-full">
              Highlight илрүүлэх
            </Button>
          </div>
        </Card>

        <Card title="Илрүүлсэн хэсгүүд">
          {/* Timeline */}
          <div className="relative mb-5 h-10 rounded-lg bg-zinc-900">
            {([] as number[]).map((left, i) => (
              <span
                key={i}
                className="absolute top-1 bottom-1 w-[3%] rounded bg-red-500/70"
                style={{ left: `${left}%` }}
              />
            ))}
            <span className="absolute top-0 bottom-0 left-[70%] w-px bg-amber-400" title="Спойлерийн хязгаар" />
          </div>
          <ul className="space-y-2">
            {clips.map((c) => (
              <li key={c.start} className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-800/70 p-3">
                <span className="flex h-12 w-20 items-center justify-center rounded bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500">
                  <Icon name="play" className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-100">{c.label}</p>
                  <p className="font-mono text-xs text-zinc-500">
                    {c.start} – {c.end}
                  </p>
                </div>
                <Badge tone="blue">{c.type}</Badge>
                <span className="w-16 text-right text-sm text-emerald-400">{c.score} оноо</span>
                <input type="checkbox" defaultChecked aria-label={`${c.label} сонгох`} className="size-4 accent-red-600" />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <Button icon="film">Сонгосноор трейлер үүсгэх</Button>
          </div>
        </Card>
      </div>

      <div className="mt-4">
        <JobQueue jobs={jobs} />
      </div>
    </>
  );
}
