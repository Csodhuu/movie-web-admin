import type { Metadata } from "next";
import { Badge, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { SaveButton, ToggleRow } from "@/components/admin-client";

export const metadata: Metadata = { title: "Хэл" };

const languages = [
  { name: "Монгол", code: "mn", ui: 100, subtitles: 100, isDefault: true, enabled: true },
  { name: "English", code: "en", ui: 100, subtitles: 86, isDefault: false, enabled: true },
  { name: "中文", code: "zh", ui: 72, subtitles: 41, isDefault: false, enabled: true },
  { name: "한국어", code: "ko", ui: 64, subtitles: 38, isDefault: false, enabled: false },
  { name: "Русский", code: "ru", ui: 58, subtitles: 22, isDefault: false, enabled: false },
  { name: "日本語", code: "ja", ui: 12, subtitles: 9, isDefault: false, enabled: false },
];

function Bar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-800">
        <div className={value === 100 ? "h-full bg-emerald-500" : "h-full bg-red-500"} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-zinc-500">{value}%</span>
    </div>
  );
}

export default function LanguagesPage() {
  return (
    <>
      <PageHeader title="Хэл" description="Апп болон контентын дэмжих хэлнүүд" actions={<SaveButton />} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Хэлнүүд" className="xl:col-span-2">
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                  <th className="px-5 py-3 font-medium">Хэл</th>
                  <th className="px-5 py-3 font-medium">Апп орчуулга</th>
                  <th className="px-5 py-3 font-medium">Хадмалтай контент</th>
                  <th className="px-5 py-3 font-medium">Төлөв</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/70">
                {languages.map((l) => (
                  <tr key={l.code}>
                    <td className="px-5 py-3">
                      <span className="font-medium text-zinc-100">{l.name}</span>
                      <span className="ml-2 font-mono text-xs text-zinc-500">{l.code}</span>
                      {l.isDefault && (
                        <span className="ml-2">
                          <Badge tone="red">Үндсэн</Badge>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <Bar value={l.ui} />
                    </td>
                    <td className="px-5 py-3">
                      <Bar value={l.subtitles} />
                    </td>
                    <td className="px-5 py-3">{l.enabled ? <Badge tone="green">Идэвхтэй</Badge> : <Badge>Идэвхгүй</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Тохиргоо">
          <div className="mb-2 space-y-4">
            <Field label="Үндсэн хэл">
              <select className={inputClass}>
                <option>Монгол</option>
                <option>English</option>
              </select>
            </Field>
            <Field label="Хадмалын анхдагч хэл">
              <select className={inputClass}>
                <option>Апп-ын хэлээр</option>
                <option>Унтраалттай</option>
              </select>
            </Field>
          </div>
          <ToggleRow title="Төхөөрөмжийн хэлийг автоматаар таних" defaultChecked />
          <ToggleRow title="AI-аар дутуу орчуулгыг нөхөх" desc="Хүнээр шалгагдаагүй гэж тэмдэглэнэ" />
        </Card>
      </div>
    </>
  );
}
