import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, Poster, UploadBox, inputClass } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { collections, movies } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Баннер, жагсаалт" };

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Нүүр хуудасны баннер, жагсаалт"
        description="Нүүр хуудсанд харагдах баннер болон кино жагсаалтуудыг зохион байгуулах"
        actions={
          <ModalButton label="Шинэ жагсаалт" title="Шинэ жагсаалт / баннер" wide>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Нэр">
                <input className={inputClass} />
              </Field>
              <Field label="Төрөл">
                <select className={inputClass}>
                  <option>Жагсаалт</option>
                  <option>Баннер</option>
                </select>
              </Field>
            </div>
            <Field label="Байршил">
              <select className={inputClass}>
                <option>Нүүр — дээд</option>
                <option>Нүүр — 1-р мөр</option>
                <option>Нүүр — 2-р мөр</option>
              </select>
            </Field>
            <UploadBox title="Баннер зураг (1920×640)" />
          </ModalButton>
        }
      />

      {/* Нүүр хуудасны урьдчилсан харагдац */}
      <Card title="Урьдчилсан харагдац" className="mb-4">
        <div className="relative flex aspect-[3/1] items-end overflow-hidden rounded-lg bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-950 p-6 sm:p-8">
          <div className="max-w-md">
            <Badge tone="red">Шинэ</Badge>
            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">Шөнийн анчин</p>
            <p className="mt-1 hidden text-sm text-zinc-400 sm:block">11 сарын 1-нээс зөвхөн манай платформд</p>
          </div>
          <div className="absolute right-4 bottom-4 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={i === 0 ? "h-1.5 w-6 rounded-full bg-white" : "size-1.5 rounded-full bg-white/30"} />
            ))}
          </div>
        </div>
        <p className="mt-4 mb-2 text-sm font-medium text-zinc-300">Энэ долоо хоногийн топ 10</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {movies.slice(0, 8).map((m) => (
            <div key={m.id} className="w-24 shrink-0">
              <Poster title={m.title} className="h-36 w-24" />
              <p className="mt-1.5 truncate text-xs text-zinc-400">{m.title}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Бүх жагсаалт" action={<span className="text-xs text-zinc-500">Чирж дарааллыг өөрчилнө</span>}>
        <ul className="space-y-2">
          {collections.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-lg border border-zinc-800/70 p-3 transition hover:border-zinc-700">
              <Icon name="menu" className="size-4 cursor-grab text-zinc-600" />
              <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                <Icon name={c.type === "Баннер" ? "image" : "layers"} className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-100">{c.name}</p>
                <p className="text-xs text-zinc-500">
                  {c.type} · {c.items} контент · {c.placement}
                </p>
              </div>
              {c.active ? <Badge tone="green">Идэвхтэй</Badge> : <Badge>Идэвхгүй</Badge>}
              <IconButton icon="edit" label="Засах" />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
