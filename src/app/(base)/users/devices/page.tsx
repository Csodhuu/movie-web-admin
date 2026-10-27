import type { Metadata } from "next";
import { Avatar, Badge, Card, IconButton, PageHeader, ProgressRow, SearchInput, StatCard, Table, Td } from "@/components/admin";
import { Icon } from "@/components/icons";
import { deviceShare, devices } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Профайл, төхөөрөмж" };

export default function DevicesPage() {
  return (
    <>
      <PageHeader title="Профайл, төхөөрөмж" description="Хэрэглэгчдийн профайл болон холбогдсон төхөөрөмжүүд" />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Нийт профайл" value="58,920" change={6.1} icon="users" />
        <StatCard label="Холбогдсон төхөөрөмж" value="71,304" change={7.8} icon="device" />
        <StatCard label="Дундаж профайл / данс" value="1.7" icon="layers" />
        <StatCard label="Хүүхдийн профайл" value="9,140" change={11.2} icon="shield" />
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
          <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm">
            <p className="flex items-center gap-2 font-medium text-amber-400">
              <Icon name="flag" className="size-4" /> Сэжигтэй хуваалцалт
            </p>
            <p className="mt-1 text-xs text-zinc-400">23 данс 3-аас дээш хотоос зэрэг нэвтэрсэн байна.</p>
          </div>
        </Card>
      </div>
    </>
  );
}
