import type { Metadata } from "next";
import { Avatar, Badge, Button, Card, PageHeader, SearchInput, Table, Td } from "@/components/admin";
import { blockedUsers } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Хаагдсан хэрэглэгчид" };

export default function BlockedUsersPage() {
  return (
    <>
      <PageHeader title="Хаагдсан хэрэглэгчид" description="Дүрэм зөрчсөний улмаас хаагдсан дансууд" />

      <Card>
        <div className="mb-4 flex justify-end">
          <SearchInput placeholder="Нэр, имэйлээр хайх..." />
        </div>
        <Table head={["Хэрэглэгч", "Шалтгаан", "Хаасан", "Хэн", "Хүртэл", ""]}>
          {blockedUsers.map((u) => (
            <tr key={u.id} className="hover:bg-zinc-900/60">
              <Td>
                <span className="flex items-center gap-3">
                  <Avatar name={u.name} />
                  <span>
                    <span className="block font-medium text-zinc-100">{u.name}</span>
                    <span className="block text-xs text-zinc-500">{u.email}</span>
                  </span>
                </span>
              </Td>
              <Td>
                <Badge tone="red">{u.reason}</Badge>
              </Td>
              <Td className="text-zinc-500">{u.blockedAt}</Td>
              <Td>{u.by}</Td>
              <Td className="text-zinc-400">{u.until}</Td>
              <Td className="text-right">
                <Button variant="secondary">Сэргээх</Button>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
