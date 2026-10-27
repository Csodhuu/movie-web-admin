import type { Metadata } from "next";
import { Badge, Button, Card, IconButton, PageHeader, SearchInput, Table, Td, type BadgeTone } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { formatMNT, transactions, type TxStatus } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Гүйлгээ" };

const txStatus: Record<TxStatus, { label: string; tone: BadgeTone }> = {
  paid: { label: "Төлөгдсөн", tone: "green" },
  failed: { label: "Амжилтгүй", tone: "red" },
  refunded: { label: "Буцаасан", tone: "yellow" },
};

export default function TransactionsPage() {
  return (
    <>
      <PageHeader
        title="Гүйлгээ"
        description="Бүх төлбөрийн гүйлгээний түүх"
        actions={
          <Button variant="secondary" icon="download">
            Экспорт
          </Button>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={["Бүгд", "Төлөгдсөн", "Амжилтгүй", "Буцаасан"]} className="w-fit" />
          <SearchInput placeholder="Гүйлгээ, хэрэглэгч хайх..." />
        </div>
        <Table head={["Гүйлгээ", "Хэрэглэгч", "Багц", "Дүн", "Төлбөрийн хэлбэр", "Огноо", "Төлөв", ""]}>
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-zinc-900/60">
              <Td className="font-mono text-xs text-zinc-400">{t.id}</Td>
              <Td className="font-medium text-zinc-100">{t.user}</Td>
              <Td>{t.plan}</Td>
              <Td className="font-medium text-zinc-100">{formatMNT(t.amount)}</Td>
              <Td>{t.method}</Td>
              <Td className="text-zinc-500">{t.date}</Td>
              <Td>
                <Badge tone={txStatus[t.status].tone}>{txStatus[t.status].label}</Badge>
              </Td>
              <Td className="text-right">
                <IconButton icon="more" label="Үйлдэл" />
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
