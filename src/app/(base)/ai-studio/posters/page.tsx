import type { Metadata } from "next";
import { Badge, Button, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { movies } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Постер, thumbnail" };

const gradients = [
  "from-red-800 via-red-950 to-zinc-950",
  "from-amber-700 via-orange-950 to-zinc-950",
  "from-sky-800 via-slate-900 to-zinc-950",
  "from-violet-800 via-purple-950 to-zinc-950",
  "from-emerald-800 via-teal-950 to-zinc-950",
  "from-rose-700 via-zinc-900 to-black",
];

export default function PostersPage() {
  return (
    <>
      <PageHeader title="Постер, thumbnail үүсгэгч" description="Видеоноос онцлох кадр сонгож, AI-аар постер, thumbnail үүсгэх" />

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
            <div className="space-y-1.5">
              <span className="text-sm text-zinc-300">Хэмжээ</span>
              <Tabs tabs={["Постер 2:3", "Thumbnail 16:9", "Баннер 3:1"]} />
            </div>
            <Field label="Загвар">
              <select className={inputClass}>
                <option>Кино театрын</option>
                <option>Минималист</option>
                <option>Хуучин ретро</option>
              </select>
            </Field>
            <Field label="Нэмэлт заавар">
              <textarea rows={3} className={inputClass} placeholder="Гол дүр төвд, нар жаргах өнгө..." />
            </Field>
            <Button icon="sparkles" className="w-full">
              6 хувилбар үүсгэх
            </Button>
          </div>
        </Card>

        <Card title="Хувилбарууд" action={<span className="text-xs text-zinc-500">Нэгийг сонгож контентод онооно</span>}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gradients.map((g, i) => (
              <div key={g} className="group relative">
                <div
                  className={`flex aspect-[2/3] flex-col justify-end rounded-lg bg-gradient-to-b ${g} p-3 ring-2 ${i === 0 ? "ring-red-500" : "ring-transparent"} transition group-hover:ring-zinc-600`}
                >
                  <p className="text-sm font-bold tracking-wide text-white uppercase">Тэнгэрийн хаалга</p>
                  <p className="text-[10px] text-zinc-300">2025</p>
                </div>
                {i === 0 && (
                  <span className="absolute top-2 left-2">
                    <Badge tone="red">Сонгосон</Badge>
                  </span>
                )}
                <p className="mt-1.5 text-xs text-zinc-500">Хувилбар {i + 1} · CTR таамаг {[8.4, 7.1, 6.9, 6.2, 5.8, 5.1][i]}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
