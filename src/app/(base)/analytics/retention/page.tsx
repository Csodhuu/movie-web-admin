import type { Metadata } from "next";
import { Card, LineChart, PageHeader, ProgressRow, StatCard } from "@/components/admin";
import { retentionCohorts } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Хэрэглэгчийн хадгалалт" };

// Хувь өндөр байх тусам улаан өнгө тод болно
function cellStyle(v: number) {
  return { backgroundColor: `rgb(220 38 38 / ${(v / 100) * 0.85 + 0.05})` };
}

export default function RetentionPage() {
  return (
    <>
      <PageHeader title="Хэрэглэгчийн хадгалалт (Retention)" description="Бүртгүүлсэн сараар нь бүлэглэсэн хэрэглэгчдийн үлдэх хувь" />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="1 сарын хадгалалт" value="—" icon="users" />
        <StatCard label="3 сарын хадгалалт" value="—" icon="users" />
        <StatCard label="Сарын churn" value="—" icon="down" />
        <StatCard label="Буцаж ирсэн" value="—" icon="refund" />
      </div>

      <Card title="Cohort хүснэгт">
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-center text-sm">
            <thead>
              <tr className="text-xs text-zinc-500">
                <th className="px-2 py-2 text-left font-medium">Cohort</th>
                <th className="px-2 py-2 font-medium">Хэрэглэгч</th>
                {Array.from({ length: 6 }, (_, i) => (
                  <th key={i} className="px-2 py-2 font-medium">
                    {i}-р сар
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retentionCohorts.map((c) => (
                <tr key={c.cohort}>
                  <td className="px-2 py-2 text-left text-zinc-300">{c.cohort}</td>
                  <td className="px-2 py-2 text-zinc-500">{c.users.toLocaleString()}</td>
                  {Array.from({ length: 6 }, (_, i) => {
                    const v = c.months[i];
                    return v === undefined ? (
                      <td key={i} className="rounded bg-zinc-900/50" />
                    ) : (
                      <td key={i} className="rounded px-2 py-2 font-medium text-white" style={cellStyle(v)}>
                        {v}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card title="Churn (сараар, %)" className="xl:col-span-2">
          <LineChart
            suffix="%"
            data={[]}
          />
        </Card>
        <Card title="Цуцалсан шалтгаан">
          <div className="space-y-4">
            <ProgressRow label="Үнэ өндөр" value={0} />
            <ProgressRow label="Контент хангалтгүй" value={0} />
            <ProgressRow label="Цаг завгүй" value={0} />
            <ProgressRow label="Техникийн асуудал" value={0} />
            <ProgressRow label="Бусад" value={0} />
          </div>
        </Card>
      </div>
    </>
  );
}
