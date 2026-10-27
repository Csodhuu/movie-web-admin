import type { Metadata } from "next";
import { Avatar, Badge, Card, IconButton, PageHeader, ProgressRow, SearchInput, StatCard, Table, Td } from "@/components/admin";
import { deviceShare, devices } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Профайл, төхөөрөмж" };

export default function DevicesPage() {
  return (
    <>
      <PageHeader title="Профайл, төхөөрөмж" description="Хэрэглэгчдийн профайл болон холбогдсон төхөөрөмжүүд" />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Нийт профайл" value="—" icon="users" />
        <StatCard label="Холбогдсон төхөөрөмж" value="—" icon="device" />
        <StatCard label="Дундаж профайл / данс" value="—" icon="layers" />
        <StatCard label="Хүүхдийн профайл" value="—" icon="shield" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2" title="Идэвхтэй төхөөрөмжүүд" action={<SearchInput placeholder="Хэрэглэгч хайх..." />}>
          <Table head={["Хэрэглэгч", "Профайл", "Төхөөрөмж", "Сүүлд", ""]}>
            {devices.map((d, i) => (
              <tr key={i} className="hover:bg-zinc-900/60">
                <Td>
                  <span className="flex items-center gap-3">
                    <Avatar name={d.user} />
                    <span className="font-medium text-zinc-100">{d.user}</span>
                  </span>
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-1">
                    {d.profiles.map((p) => (
                      <Badge key={p}>{p}</Badge>
                    ))}
                  </div>
                </Td>
                <Td>
                  <p className="text-zinc-200">{d.device}</p>
                  <p className="text-xs text-zinc-500">{d.os}</p>
                </Td>
                <Td>
                  {d.lastSeen === "Одоо" ? (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Онлайн
                    </span>
                  ) : (
                    <span className="text-zinc-500">{d.lastSeen}</span>
                  )}
                </Td>
                <Td className="text-right">
                  <IconButton icon="logout" label="Төхөөрөмжөөс гаргах" className="hover:text-red-400" />
                </Td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card title="Төхөөрөмжийн төрөл">
          <div className="space-y-4">
            {deviceShare.map((d) => (
              <ProgressRow key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
