import type { Metadata } from "next";
import Link from "next/link";
import { BarChart, Badge, Card, LineChart, PageHeader, StatCard, Table, Td } from "@/components/admin";
import { recoCtr } from "@/lib/mock-data";

export const metadata: Metadata = { title: "AI санал болголтын үр дүн" };

const rows = [
  { name: "Таньд зориулсан", impressions: 1240000, ctr: 28.4, watch: 62 },
  { name: "Учир нь та ... үзсэн", impressions: 860000, ctr: 24.1, watch: 58 },
  { name: "Трэнд Монголд", impressions: 1020000, ctr: 19.7, watch: 49 },
  { name: "Үргэлжлүүлэн үзэх", impressions: 640000, ctr: 41.2, watch: 81 },
];

export default function RecoAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="AI санал болголтын үр дүн"
        description="Санал болголт үзэлт, хадгалалтад хэрхэн нөлөөлж буйг хэмжих"
        actions={
          <Link href="/ai-studio/recommendations" className="text-sm text-zinc-400 hover:text-red-400">
            Тохиргоо руу →
          </Link>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="CTR" value="26.3%" change={6.0} icon="eye" />
        <StatCard label="Санал болголтоос үзсэн цаг" value="41%" change={3.4} icon="clock" />
        <StatCard label="Дуусгах хувь" value="64%" change={2.2} icon="check" />
        <StatCard label="A/B туршилт (v4)" value="+4.1%" icon="sparkles" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="CTR (сараар, %)">
          <LineChart data={recoCtr} suffix="%" />
        </Card>
        <Card title="A/B туршилт: collab-v3 vs v4" action={<Badge tone="blue">Үргэлжилж буй</Badge>}>
          <BarChart
            data={[
              { label: "v3 CTR", value: 26 },
              { label: "v4 CTR", value: 30 },
              { label: "v3 дуусгах", value: 64 },
              { label: "v4 дуусгах", value: 67 },
            ]}
          />
        </Card>
      </div>

      <Card title="Мөр тус бүрийн гүйцэтгэл" className="mt-4">
        <Table head={["Мөр", "Харагдсан", "CTR", "Дуусгах хувь"]}>
          {rows.map((r) => (
            <tr key={r.name}>
              <Td className="font-medium text-zinc-100">{r.name}</Td>
              <Td>{r.impressions.toLocaleString()}</Td>
              <Td>{r.ctr}%</Td>
              <Td>{r.watch}%</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
