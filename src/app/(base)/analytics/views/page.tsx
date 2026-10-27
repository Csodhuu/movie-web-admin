import type { Metadata } from "next";
import { BarChart, Button, Card, PageHeader, ProgressRow, StatCard, Table, Td } from "@/components/admin";
import { deviceShare, formatCompact, genreShare, monthlyViews, movies } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Үзэлтийн тайлан" };

const ranges = ["7 хоног", "30 хоног", "6 сар", "1 жил"];

export default function AnalyticsPage() {
  const ranked = [...movies].filter((m) => m.views > 0).sort((a, b) => b.views - a.views);

  return (
    <>
      <PageHeader
        title="Үзэлтийн тайлан"
        description="Үзэлт, үзсэн цаг, контентын гүйцэтгэл"
        actions={
          <>
            <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
              {ranges.map((r, i) => (
                <button
                  key={r}
                  className={
                    i === 2
                      ? "rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white"
                      : "rounded-md px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-100"
                  }
                >
                  {r}
                </button>
              ))}
            </div>
            <Button variant="secondary" icon="download">
              CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Нийт үзсэн цаг" value="1.24M" change={11.4} icon="clock" />
        <StatCard label="Дундаж үзэлт / хэрэглэгч" value="36 цаг" change={3.1} icon="eye" />
        <StatCard label="Шинэ бүртгэл" value="2,184" change={14.7} icon="users" />
        <StatCard label="Цуцлалт (churn)" value="2.8%" change={-0.4} icon="down" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Үзэлт (сараар)">
          <BarChart data={monthlyViews} />
        </Card>
        <Card title="Үзсэн цаг (мянгаар)">
          <BarChart data={monthlyViews.map((m) => ({ ...m, value: Math.round(m.value / 250) }))} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Төхөөрөмж">
          <div className="space-y-4">
            {deviceShare.map((d) => (
              <ProgressRow key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
        </Card>
        <Card title="Төрөл">
          <div className="space-y-4">
            {genreShare.map((g) => (
              <ProgressRow key={g.label} label={g.label} value={g.value} />
            ))}
          </div>
        </Card>
        <Card title="Хэрэглэгчийн байршил">
          <div className="space-y-4">
            <ProgressRow label="Улаанбаатар" value={68} />
            <ProgressRow label="Дархан-Уул" value={8} />
            <ProgressRow label="Орхон" value={7} />
            <ProgressRow label="Бусад аймаг" value={11} />
            <ProgressRow label="Гадаад" value={6} />
          </div>
        </Card>
      </div>

      <Card title="Контентын гүйцэтгэл" className="mt-4">
        <Table head={["Нэр", "Төрөл", "Үзэлт", "Дуусгасан %", "Үнэлгээ"]}>
          {ranked.map((m, i) => (
            <tr key={m.id} className="hover:bg-zinc-900/60">
              <Td className="font-medium text-zinc-100">{m.title}</Td>
              <Td>{m.type}</Td>
              <Td>{formatCompact(m.views)}</Td>
              <Td>{[82, 76, 71, 69, 64, 61, 58, 52][i] ?? 50}%</Td>
              <Td>⭐ {m.rating}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
