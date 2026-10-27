import type { Metadata } from "next";
import { Avatar, Button, Card, PageHeader, SearchInput, Table, Td, inputClass, cn } from "@/components/admin";
import { auditLog } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Үйлдлийн түүх" };

export default function AuditLogPage() {
  return (
    <>
      <PageHeader
        title="Үйлдлийн түүх (Audit Log)"
        description="Админуудын хийсэн бүх үйлдлийн бүртгэл"
        actions={
          <Button variant="secondary" icon="download">
            Экспорт
          </Button>
        }
      />

      <Card>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <select className={cn(inputClass, "sm:w-44")}>
              <option>Бүх админ</option>
            </select>
            <select className={cn(inputClass, "sm:w-44")}>
              <option>Сүүлийн 7 хоног</option>
              <option>Сүүлийн 30 хоног</option>
              <option>Бүгд</option>
            </select>
          </div>
          <SearchInput placeholder="Үйлдэл, объект хайх..." />
        </div>
        <Table head={["Хэн", "Үйлдэл", "Объект", "IP", "Цаг"]}>
          {auditLog.map((l, i) => (
            <tr key={i} className="hover:bg-zinc-900/60">
              <Td>
                <span className="flex items-center gap-3">
                  <Avatar name={l.who} />
                  <span className="font-medium text-zinc-100">{l.who}</span>
                </span>
              </Td>
              <Td>{l.action}</Td>
              <Td className="text-zinc-400">{l.target}</Td>
              <Td className="font-mono text-xs text-zinc-500">{l.ip}</Td>
              <Td className="whitespace-nowrap text-zinc-500">{l.time}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
