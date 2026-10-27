import type { Metadata } from "next";
import { Badge, Card, Field, PageHeader, ProgressRow, StatCard, inputClass } from "@/components/admin";
import { SaveButton, ToggleRow } from "@/components/admin-client";

export const metadata: Metadata = { title: "Стриминг, CDN, DRM" };

const ladder = [
  { q: "2160p (4K)", bitrate: "16 Mbps", codec: "HEVC", plans: "Premium" },
  { q: "1080p", bitrate: "6 Mbps", codec: "H.264", plans: "Standard+" },
  { q: "720p", bitrate: "3 Mbps", codec: "H.264", plans: "Basic+" },
  { q: "480p", bitrate: "1.2 Mbps", codec: "H.264", plans: "Бүгд" },
];

export default function StreamingSettingsPage() {
  return (
    <>
      <PageHeader title="Стриминг, CDN, DRM" description="Видео дамжуулалт, транскод, хамгаалалтын тохиргоо" actions={<SaveButton />} />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="CDN cache hit" value="—" icon="server" />
        <StatCard label="Дундаж эхлэх хугацаа" value="—" icon="clock" />
        <StatCard label="Буфер хувь" value="—" icon="play" />
        <StatCard label="Сарын траффик" value="—" icon="live" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="CDN">
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <Field label="Үндсэн CDN">
              <select className={inputClass}>
                <option>Cloudflare Stream</option>
                <option>AWS CloudFront</option>
                <option>Дотоод CDN (УБ)</option>
              </select>
            </Field>
            <Field label="Нөөц CDN">
              <select className={inputClass}>
                <option>Дотоод CDN (УБ)</option>
                <option>Байхгүй</option>
              </select>
            </Field>
          </div>
          <p className="mb-3 text-sm text-zinc-300">Бүс тус бүрийн ачаалал</p>
          <div className="space-y-3">
            <ProgressRow label="Улаанбаатар" value={0} />
            <ProgressRow label="Азийн бүс" value={0} />
            <ProgressRow label="Европ" value={0} />
            <ProgressRow label="Америк" value={0} />
          </div>
        </Card>

        <Card title="DRM ба хамгаалалт">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge tone="green">Widevine</Badge>
            <Badge tone="green">FairPlay</Badge>
            <Badge tone="green">PlayReady</Badge>
          </div>
          <ToggleRow title="DRM хамгаалалт" desc="Бүх төлбөртэй контентод" defaultChecked />
          <ToggleRow title="Дэлгэцийн бичлэг хаах" defaultChecked />
          <ToggleRow title="Үл үзэгдэх watermark" desc="Хэрэглэгчийн ID-г видеод нууцаар шингээнэ" defaultChecked />
          <ToggleRow title="Татаж үзэх" desc="Standard болон Premium багцад офлайн үзэх" defaultChecked />
          <ToggleRow title="Дараагийн анги автоматаар тоглуулах" defaultChecked />
        </Card>
      </div>

      <Card title="Транскод (ABR шат)" className="mt-4">
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                <th className="px-5 py-3 font-medium">Чанар</th>
                <th className="px-5 py-3 font-medium">Bitrate</th>
                <th className="px-5 py-3 font-medium">Codec</th>
                <th className="px-5 py-3 font-medium">Багц</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {ladder.map((l) => (
                <tr key={l.q}>
                  <td className="px-5 py-3 font-medium text-zinc-100">{l.q}</td>
                  <td className="px-5 py-3 text-zinc-300">{l.bitrate}</td>
                  <td className="px-5 py-3 font-mono text-xs text-zinc-400">{l.codec}</td>
                  <td className="px-5 py-3 text-zinc-300">{l.plans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
