import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, inputClass } from "@/components/admin";
import { ModalButton, Tabs } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { faqs } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Түгээмэл асуулт" };

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Түгээмэл асуулт (FAQ)"
        description="Хэрэглэгчдэд харагдах тусламжийн асуулт, хариулт"
        actions={
          <ModalButton label="Асуулт нэмэх" title="Шинэ асуулт" wide>
            <Field label="Асуулт">
              <input className={inputClass} />
            </Field>
            <Field label="Ангилал">
              <select className={inputClass}>
                <option>Төлбөр</option>
                <option>Данс</option>
                <option>Үзэх</option>
              </select>
            </Field>
            <Field label="Хариулт">
              <textarea rows={5} className={inputClass} />
            </Field>
          </ModalButton>
        }
      />

      <Tabs tabs={["Бүгд", "Төлбөр", "Данс", "Үзэх"]} className="mb-4 w-fit" />

      <Card className="p-0">
        <ul className="divide-y divide-zinc-800/70">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 hover:bg-zinc-900/60">
                  <Icon name="chevron" className="size-4 text-zinc-500 transition group-open:rotate-90" />
                  <span className="flex-1 text-sm font-medium text-zinc-100">{f.q}</span>
                  <Badge>{f.category}</Badge>
                  <span className="hidden w-24 text-right text-xs text-zinc-500 sm:block">{f.views.toLocaleString()} үзсэн</span>
                </summary>
                <div className="flex items-start gap-3 px-5 pb-4 pl-12">
                  <p className="flex-1 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                  <IconButton icon="edit" label="Засах" />
                  <IconButton icon="trash" label="Устгах" className="hover:text-red-400" />
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
