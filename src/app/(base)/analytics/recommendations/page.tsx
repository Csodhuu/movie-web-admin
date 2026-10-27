import type { Metadata } from "next";
import Link from "next/link";
import { BarChart, Card, LineChart, PageHeader, StatCard, Table, Td } from "@/components/admin";
import { recoCtr } from "@/lib/placeholders";

export const metadata: Metadata = { title: "AI санал болголтын үр дүн" };

const rows: { name: string; impressions: number; ctr: number; watch: number }[] = [];

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
        <StatCard label="CTR" value="—" icon="eye" />
        <StatCard label="Санал болголтоос үзсэн цаг" value="—" icon="clock" />
        <StatCard label="Дуусгах хувь" value="—" icon="check" />
        <StatCard label="A/B туршилт (v4)" value="—" icon="sparkles" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="CTR (сараар, %)">
          <LineChart data={recoCtr} suffix="%" />
        </Card>
        <Card title="A/B туршилт">
          <BarChart
            data={[]}
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
