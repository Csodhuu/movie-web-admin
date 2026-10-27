import type { Metadata } from "next";
import { BarChart, Button, Card, LineChart, PageHeader, ProgressRow, StatCard, Table, Td } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { formatMNT, monthlyRevenue, plans } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Орлогын тайлан" };

export default function RevenueReportPage() {
  const total = plans.reduce((n, p) => n + p.price * p.subscribers, 0);

  return (
    <>
      <PageHeader
        title="Орлогын тайлан"
        description="Захиалга, багц, төлбөрийн хэлбэрээр орлогын задаргаа"
        actions={
          <>
            <Tabs tabs={["30 хоног", "6 сар", "1 жил"]} />
            <Button variant="secondary" icon="download">
              CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR" value="₮421.3M" change={8.1} icon="wallet" />
        <StatCard label="ARR" value="₮5.06B" change={8.1} icon="chart" />
        <StatCard label="ARPU" value="₮25,960" change={2.6} icon="users" />
        <StatCard label="LTV" value="₮312K" change={4.0} icon="star" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card title="Сарын орлого (сая ₮)" className="xl:col-span-2">
          <LineChart data={monthlyRevenue} suffix="M" />
        </Card>
        <Card title="Төлбөрийн хэлбэр">
          <div className="space-y-4">
            <ProgressRow label="QPay" value={54} />
            <ProgressRow label="Карт" value={27} />
            <ProgressRow label="SocialPay" value={14} />
            <ProgressRow label="Бусад" value={5} />
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card title="Шинэ захиалга (сараар)">
          <BarChart data={monthlyRevenue.map((m) => ({ ...m, value: m.value * 4 }))} />
        </Card>
        <Card title="Багцаар" className="xl:col-span-2">
          <Table head={["Багц", "Захиалагч", "Үнэ", "Сарын орлого", "Хувь"]}>
            {plans
              .filter((p) => p.price > 0)
              .map((p) => (
                <tr key={p.name}>
                  <Td className="font-medium text-zinc-100">{p.name}</Td>
                  <Td>{p.subscribers.toLocaleString()}</Td>
                  <Td>{formatMNT(p.price)}</Td>
                  <Td className="text-zinc-100">{formatMNT(p.price * p.subscribers)}</Td>
                  <Td>{Math.round(((p.price * p.subscribers) / total) * 100)}%</Td>
                </tr>
              ))}
          </Table>
        </Card>
      </div>
    </>
  );
}
