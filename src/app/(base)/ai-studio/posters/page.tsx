import type { Metadata } from "next";
import { Button, Card, EmptyState, Field, PageHeader, inputClass } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { movies } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Постер, thumbnail" };

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
          <EmptyState icon="image" title="Үүсгэсэн хувилбар алга" desc="Зүүн талд тохиргоогоо сонгоод үүсгэнэ үү" />
        </Card>
      </div>
    </>
  );
}
