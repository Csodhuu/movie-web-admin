import type { Metadata } from "next";
import { Avatar, Badge, Button, Card, Field, PageHeader, UploadBox, inputClass, type BadgeTone } from "@/components/admin";
import { ModalButton, Tabs } from "@/components/admin-client";
import { cast } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Жүжигчид, найруулагч" };

const roleTone: Record<string, BadgeTone> = {
  Жүжигчин: "blue",
  Найруулагч: "red",
  Зохиолч: "purple",
  Продюсер: "yellow",
};

export default function CastPage() {
  return (
    <>
      <PageHeader
        title="Жүжигчид, найруулагч"
        description="Кино бүтээлд оролцсон хүмүүсийн мэдээлэл"
        actions={
          <ModalButton label="Хүн нэмэх" title="Шинэ хүн нэмэх">
            <UploadBox title="Зураг оруулах" hint="JPG, PNG · 5MB хүртэл" />
            <Field label="Овог нэр">
              <input className={inputClass} />
            </Field>
            <Field label="Үүрэг">
              <select className={inputClass}>
                <option>Жүжигчин</option>
                <option>Найруулагч</option>
                <option>Зохиолч</option>
                <option>Продюсер</option>
              </select>
            </Field>
            <Field label="Намтар">
              <textarea rows={3} className={inputClass} />
            </Field>
          </ModalButton>
        }
      />

      <Tabs tabs={["Бүгд", "Жүжигчин", "Найруулагч", "Зохиолч", "Продюсер"]} className="mb-4 w-fit" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cast.map((p) => (
          <Card key={p.id}>
            <div className="flex items-center gap-4">
              <Avatar name={p.name} className="size-14 text-base" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-zinc-100">{p.name}</p>
                <p className="text-xs text-zinc-500">{p.born} он</p>
                <div className="mt-1.5">
                  <Badge tone={roleTone[p.role]}>{p.role}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/70 pt-3">
              <span className="text-sm text-zinc-400">{p.works} бүтээл</span>
              <Button variant="ghost" icon="edit">
                Засах
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
