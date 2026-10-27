import type { Metadata } from "next";
import { Button, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { movies } from "@/lib/mock-data";
import { JobQueue, type Job } from "../_components/jobs";

export const metadata: Metadata = { title: "AI хадмал орчуулга" };

const langs = ["Монгол", "English", "中文", "한국어", "日本語", "Русский"];

const jobs: Job[] = [
  { id: "s1", title: "Шөнийн анчин", detail: "MN → EN, KO, ZH", progress: 72, status: "processing", created: "10:42" },
  { id: "s2", title: "Нүүдэлчдийн домог S2E5", detail: "Яриа таних (MN)", progress: 100, status: "done", created: "09:15" },
  { id: "s3", title: "Мөнгөн хөндий", detail: "MN → JA", progress: 0, status: "queued", created: "09:02" },
  { id: "s4", title: "Хотын шөнө E1", detail: "Яриа таних (MN)", progress: 34, status: "failed", created: "Өчигдөр" },
];

export default function SubtitlesPage() {
  return (
    <>
      <PageHeader title="AI хадмал орчуулга" description="Яриаг автоматаар таньж, олон хэл рүү хадмал үүсгэх" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Шинэ ажил">
          <form className="space-y-4">
            <Field label="Контент">
              <select className={inputClass}>
                {movies.map((m) => (
                  <option key={m.id}>{m.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Эх хэл">
              <select className={inputClass}>{langs.map((l) => <option key={l}>{l}</option>)}</select>
            </Field>
            <fieldset className="space-y-2">
              <legend className="mb-1.5 text-sm text-zinc-300">Орчуулах хэл</legend>
              <div className="grid grid-cols-2 gap-2">
                {langs.slice(1).map((l, i) => (
                  <label key={l} className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300">
                    <input type="checkbox" defaultChecked={i < 2} className="size-4 accent-red-600" />
                    {l}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label="Формат">
              <select className={inputClass}>
                <option>SRT</option>
                <option>WebVTT</option>
              </select>
            </Field>
            <Button type="button" icon="sparkles" className="w-full">
              Хадмал үүсгэх
            </Button>
          </form>
        </Card>

        <Card title="Хадмал засварлагч" className="xl:col-span-2" action={<Button variant="secondary" icon="check">Хадгалах</Button>}>
          <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-950">
            <p className="rounded bg-black/70 px-3 py-1 text-sm text-white">The steppe has been waiting for you.</p>
          </div>
          <ul className="space-y-2">
            {[
              ["00:00:01,000", "Тавтай морил, хүү минь.", "Welcome home, my son."],
              ["00:00:04,800", "Тал нутаг чамайг хүлээж байсан.", "The steppe has been waiting for you."],
              ["00:00:08,100", "Би буцаж ирнэ гэж бодоогүй.", "I never thought I would return."],
            ].map(([t, mn, en]) => (
              <li key={t} className="grid gap-2 rounded-lg border border-zinc-800/70 p-3 sm:grid-cols-[110px_1fr_1fr]">
                <span className="font-mono text-xs text-zinc-500">{t}</span>
                <span className="text-sm text-zinc-400">{mn}</span>
                <input defaultValue={en} className={inputClass} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4">
        <JobQueue jobs={jobs} />
      </div>
    </>
  );
}
