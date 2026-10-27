import type { Metadata } from "next";
import { Badge, Card, Field, LineChart, PageHeader, ProgressRow, StatCard, inputClass } from "@/components/admin";
import { SaveButton, ToggleRow } from "@/components/admin-client";
import { recoCtr } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Санал болголтын систем" };

const signals: { label: string; value: number }[] = [];

const rows: { name: string; model: string; active: boolean }[] = [];

export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        title="Санал болголтын систем"
        description="Recommendation Engine-ийн тохиргоо ба гүйцэтгэл"
        actions={<SaveButton />}
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="CTR" value="—" icon="eye" />
        <StatCard label="Санал болголтоос үзсэн" value="—" icon="play" />
        <StatCard label="Дундаж хариу хугацаа" value="—" icon="clock" />
        <StatCard label="Модель шинэчлэгдсэн" value="—" icon="sparkles" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="CTR (сараар, %)" className="xl:col-span-2">
          <LineChart data={recoCtr} suffix="%" />
        </Card>
        <Card title="Дохионы жин">
          <div className="space-y-4">
            {signals.map((s) => (
              <ProgressRow key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="Нүүр хуудасны мөрүүд">
          <ul className="divide-y divide-zinc-800/70">
            {rows.map((r) => (
              <li key={r.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm text-zinc-100">{r.name}</p>
                  <p className="font-mono text-xs text-zinc-500">{r.model}</p>
                </div>
                {r.active ? <Badge tone="green">Идэвхтэй</Badge> : <Badge>Идэвхгүй</Badge>}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Тохиргоо">
          <div className="mb-2 grid gap-4 sm:grid-cols-2">
            <Field label="Модель">
              <select className={inputClass}>
                <option>collab-v3 (үндсэн)</option>
                <option>collab-v4 (туршилт)</option>
              </select>
            </Field>
            <Field label="A/B туршилтын хувь">
              <input type="number" defaultValue={10} className={inputClass} />
            </Field>
          </div>
          <ToggleRow title="Хүүхдийн профайлд насны шүүлт" defaultChecked />
          <ToggleRow title="Үзсэн контентыг дахин санал болгохгүй" defaultChecked />
          <ToggleRow title="Монгол контентыг тэргүүлүүлэх" desc="Ижил оноотой үед Монгол бүтээлийг дээр гаргана" />
        </Card>
      </div>
    </>
  );
}
