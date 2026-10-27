import type { Metadata } from "next";
import { Button, Card, EmptyState, Field, PageHeader, inputClass } from "@/components/admin";
import { movies } from "@/lib/placeholders";
import { JobQueue, type Job } from "../_components/jobs";

export const metadata: Metadata = { title: "AI хадмал орчуулга" };

const langs = ["Монгол", "English", "中文", "한국어", "日本語", "Русский"];

const jobs: Job[] = [];

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

        <Card title="Хадмал засварлагч" className="xl:col-span-2">
          <EmptyState icon="language" title="Засварлах хадмал алга" desc="Хадмал үүсгэх ажил дуусахад энд засварлана" />
        </Card>
      </div>

      <div className="mt-4">
        <JobQueue jobs={jobs} />
      </div>
    </>
  );
}
