import type { Metadata } from "next";
import { Button, Card, PageHeader, StatCard, StatusBadge, Table, Td } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { formatMNT, refunds } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Буцаалт" };

export default function RefundsPage() {
  return (
    <>
      <PageHeader title="Буцаалт" description="Төлбөр буцаах хүсэлтүүдийг шийдвэрлэх" />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Хүлээгдэж буй" value="2" icon="clock" />
        <StatCard label="Энэ сард буцаасан" value="₮1.2M" change={-8.3} icon="refund" />
        <StatCard label="Буцаалтын хувь" value="0.4%" change={-0.1} icon="chart" />
      </div>

      <Card>
        <Tabs tabs={["Бүгд", "Хүлээгдэж буй", "Зөвшөөрсөн", "Татгалзсан"]} className="mb-4 w-fit" />
        <Table head={["Хүсэлт", "Гүйлгээ", "Хэрэглэгч", "Дүн", "Шалтгаан", "Огноо", "Төлөв", ""]}>
          {refunds.map((r) => (
            <tr key={r.id} className="hover:bg-zinc-900/60">
              <Td className="font-mono text-xs text-zinc-400">{r.id}</Td>
              <Td className="font-mono text-xs text-zinc-500">{r.tx}</Td>
              <Td className="font-medium text-zinc-100">{r.user}</Td>
              <Td>{formatMNT(r.amount)}</Td>
              <Td className="text-zinc-400">{r.reason}</Td>
              <Td className="text-zinc-500">{r.date}</Td>
              <Td>
                <StatusBadge status={r.status} />
              </Td>
              <Td>
                {r.status === "pending" && (
                  <div className="flex justify-end gap-1">
                    <Button variant="secondary" icon="check">
                      Зөвшөөрөх
                    </Button>
                    <Button variant="ghost">Татгалзах</Button>
                  </div>
                )}
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
