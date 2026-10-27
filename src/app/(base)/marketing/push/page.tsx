import type { Metadata } from "next";
import { Button, Card, Field, PageHeader, StatCard, StatusBadge, Table, Td, inputClass } from "@/components/admin";
import { Icon } from "@/components/icons";
import { pushCampaigns } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Push мэдэгдэл" };

export default function PushPage() {
  return (
    <>
      <PageHeader title="Push мэдэгдэл" description="Гар утас, ТВ апп руу мэдэгдэл илгээх" />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Энэ сард илгээсэн" value="128K" change={14.0} icon="bell" />
        <StatCard label="Нээсэн хувь" value="23.7%" change={1.9} icon="eye" />
        <StatCard label="Мэдэгдэл зөвшөөрсөн" value="71%" icon="check" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Card title="Шинэ мэдэгдэл">
          <div className="space-y-4">
            <Field label="Гарчиг">
              <input className={inputClass} defaultValue="Шөнийн анчин одоо гарлаа! 🎬" />
            </Field>
            <Field label="Агуулга">
              <textarea rows={3} className={inputClass} defaultValue="Энэ жилийн хамгийн их хүлээгдсэн триллер — яг одоо үзээрэй." />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Хүлээн авагч">
                <select className={inputClass}>
                  <option>Бүх хэрэглэгч</option>
                  <option>Premium</option>
                  <option>Free</option>
                  <option>7 хоног идэвхгүй</option>
                </select>
              </Field>
              <Field label="Платформ">
                <select className={inputClass}>
                  <option>Бүгд</option>
                  <option>iOS</option>
                  <option>Android</option>
                  <option>Smart TV</option>
                </select>
              </Field>
              <Field label="Илгээх цаг">
                <input type="datetime-local" className={inputClass} />
              </Field>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost">Ноорог</Button>
              <Button variant="secondary" icon="clock">
                Товлох
              </Button>
              <Button icon="bell">Одоо илгээх</Button>
            </div>
          </div>
        </Card>

        {/* Утасны урьдчилсан харагдац */}
        <Card title="Урьдчилсан харагдац">
          <div className="mx-auto w-full max-w-[260px] rounded-[2rem] border-4 border-zinc-800 bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 pt-8">
            <div className="rounded-xl bg-zinc-950/90 p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-red-600">
                  <Icon name="film" className="size-3 text-white" />
                </span>
                <span className="text-[11px] text-zinc-400">Movie · одоо</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-white">Шөнийн анчин одоо гарлаа! 🎬</p>
              <p className="text-[11px] text-zinc-400">Энэ жилийн хамгийн их хүлээгдсэн триллер — яг одоо үзээрэй.</p>
            </div>
            <div className="h-40" />
          </div>
        </Card>
      </div>

      <Card title="Кампанит ажлууд" className="mt-4">
        <Table head={["Гарчиг", "Хүлээн авагч", "Илгээсэн", "Нээсэн", "Огноо", "Төлөв"]}>
          {pushCampaigns.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-900/60">
              <Td className="font-medium text-zinc-100">{c.title}</Td>
              <Td>{c.audience}</Td>
              <Td>{c.sent ? c.sent.toLocaleString() : "—"}</Td>
              <Td>{c.sent ? `${((c.opened / c.sent) * 100).toFixed(1)}%` : "—"}</Td>
              <Td className="text-zinc-500">{c.date}</Td>
              <Td>
                <StatusBadge status={c.status} />
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
