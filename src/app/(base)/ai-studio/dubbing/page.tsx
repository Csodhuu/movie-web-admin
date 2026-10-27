import type { Metadata } from "next";
import { Avatar, Badge, Button, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { ToggleRow } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { movies } from "@/lib/mock-data";
import { JobQueue, type Job } from "../_components/jobs";

export const metadata: Metadata = { title: "AI дуу оруулга" };

const voices = [
  { character: "Тэмүүжин", actor: "Батбаяр Нямдорж", voice: "Эрэгтэй · гүн", match: 94 },
  { character: "Бөртэ", actor: "Наранцэцэг Баяр", voice: "Эмэгтэй · зөөлөн", match: 91 },
  { character: "Өвгөн", actor: "Оюунчимэг Дашдаваа", voice: "Эрэгтэй · сөөнгө", match: 88 },
];

const jobs: Job[] = [
  { id: "d1", title: "Тэнгэрийн хаалга", detail: "MN → EN (3 дүр)", progress: 58, status: "processing", created: "08:30" },
  { id: "d2", title: "Говийн нууц", detail: "MN → EN (хүүрнэгч)", progress: 100, status: "done", created: "Өчигдөр" },
  { id: "d3", title: "Нүүдэлчдийн домог S1", detail: "MN → KO (12 дүр)", progress: 0, status: "queued", created: "Өчигдөр" },
];

export default function DubbingPage() {
  return (
    <>
      <PageHeader title="AI дуу оруулга" description="Жүжигчдийн дуу хоолойн өнгийг хадгалан өөр хэлээр дуу оруулах" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Тохиргоо">
          <div className="space-y-4">
            <Field label="Контент">
              <select className={inputClass}>
                {movies.map((m) => (
                  <option key={m.id}>{m.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Зорилтот хэл">
              <select className={inputClass}>
                <option>English</option>
                <option>한국어</option>
                <option>中文</option>
              </select>
            </Field>
          </div>
          <div className="mt-2">
            <ToggleRow title="Уруулын хөдөлгөөн тааруулах" desc="Lip-sync" defaultChecked />
            <ToggleRow title="Арын хөгжмийг хадгалах" defaultChecked />
          </div>
          <Button icon="mic" className="mt-4 w-full">
            Дуу оруулга эхлүүлэх
          </Button>
        </Card>

        <Card title="Дүрийн дуу хоолой" className="xl:col-span-2">
          <ul className="space-y-3">
            {voices.map((v) => (
              <li key={v.character} className="flex flex-wrap items-center gap-4 rounded-lg border border-zinc-800/70 p-3">
                <Avatar name={v.actor} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-100">{v.character}</p>
                  <p className="text-xs text-zinc-500">
                    {v.actor} · {v.voice}
                  </p>
                </div>
                {/* Дууны долгионы дүрслэл */}
                <div className="hidden h-8 items-center gap-0.5 sm:flex" aria-hidden>
                  {Array.from({ length: 28 }, (_, i) => (
                    <span key={i} className="w-1 rounded-full bg-red-500/60" style={{ height: `${20 + ((i * 37) % 80)}%` }} />
                  ))}
                </div>
                <Badge tone="green">{v.match}% төстэй</Badge>
                <Button variant="secondary" className="px-2.5">
                  <Icon name="play" className="size-4" />
                </Button>
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
