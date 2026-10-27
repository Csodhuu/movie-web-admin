"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  PageHeader,
  SearchInput,
  StatCard,
  Table,
  Td,
  cn,
  inputClass,
  type BadgeTone,
} from "@/components/admin";
import { users as initialUsers, type UserPlan, type UserStatus } from "@/lib/placeholders";

const statusMeta: Record<UserStatus, { label: string; tone: BadgeTone }> = {
  active: { label: "Идэвхтэй", tone: "green" },
  pending: { label: "Баталгаажаагүй", tone: "yellow" },
  suspended: { label: "Түдгэлзүүлсэн", tone: "red" },
};

const planTone: Record<UserPlan, BadgeTone> = {
  Premium: "red",
  Standard: "purple",
  Basic: "blue",
  Free: "gray",
};

export function UsersTable() {
  const [items, setItems] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState<UserPlan | "all">("all");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = useMemo(
    () =>
      items.filter(
        (u) =>
          (plan === "all" || u.plan === plan) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [items, query, plan],
  );

  const allSelected = filtered.length > 0 && filtered.every((u) => selected.includes(u.id));

  function toggleSuspend(id: number) {
    setItems((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u,
      ),
    );
  }

  return (
    <>
      <PageHeader
        title="Хэрэглэгчид"
        description="Бүртгэлтэй хэрэглэгчдийг удирдах"
        actions={
          <>
            <Button variant="secondary" icon="download">
              Экспорт
            </Button>
            <Button icon="plus">Хэрэглэгч нэмэх</Button>
          </>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Нийт" value="—" icon="users" />
        <StatCard label="Энэ сард шинэ" value="—" icon="plus" />
        <StatCard label="Өнөөдөр идэвхтэй" value="—" icon="eye" />
        <StatCard label="Түдгэлзүүлсэн" value="—" icon="lock" />
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {selected.length > 0 ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-zinc-300">{selected.length} сонгогдсон</span>
              <Button variant="secondary" icon="bell">
                Мэдэгдэл илгээх
              </Button>
              <Button variant="ghost" onClick={() => setSelected([])}>
                Цуцлах
              </Button>
            </div>
          ) : (
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as UserPlan | "all")}
              className={cn(inputClass, "sm:w-44")}
            >
              <option value="all">Бүх багц</option>
              {(["Premium", "Standard", "Basic", "Free"] as const).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          )}
          <SearchInput placeholder="Нэр, имэйлээр хайх..." value={query} onChange={setQuery} />
        </div>

        <Table head={["", "Хэрэглэгч", "Багц", "Төлөв", "Бүртгүүлсэн", "Үзсэн цаг", ""]}>
          {filtered.map((u) => (
            <tr key={u.id} className={cn("hover:bg-zinc-900/60", selected.includes(u.id) && "bg-red-500/5")}>
              <Td className="w-10">
                <input
                  type="checkbox"
                  aria-label={`${u.name} сонгох`}
                  checked={selected.includes(u.id)}
                  onChange={(e) =>
                    setSelected((prev) =>
                      e.target.checked ? [...prev, u.id] : prev.filter((id) => id !== u.id),
                    )
                  }
                  className="size-4 accent-red-600"
                />
              </Td>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} />
                  <div>
                    <p className="font-medium text-zinc-100">{u.name}</p>
                    <p className="text-xs text-zinc-500">{u.email}</p>
                  </div>
                </div>
              </Td>
              <Td>
                <Badge tone={planTone[u.plan]}>{u.plan}</Badge>
              </Td>
              <Td>
                <Badge tone={statusMeta[u.status].tone}>{statusMeta[u.status].label}</Badge>
              </Td>
              <Td className="text-zinc-500">{u.joined}</Td>
              <Td>{u.watchHours} ц</Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="edit" label="Засах" />
                  <IconButton
                    icon="lock"
                    label={u.status === "suspended" ? "Сэргээх" : "Түдгэлзүүлэх"}
                    className={u.status === "suspended" ? "text-red-400" : undefined}
                    onClick={() => toggleSuspend(u.id)}
                  />
                </div>
              </Td>
            </tr>
          ))}
        </Table>

        <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => setSelected(e.target.checked ? filtered.map((u) => u.id) : [])}
              className="size-4 accent-red-600"
            />
            Бүгдийг сонгох
          </label>
          <div className="flex items-center gap-1">
            <span className="mr-2">{filtered.length} хэрэглэгч</span>
            <IconButton icon="down" label="Өмнөх" className="rotate-[135deg]" />
            <IconButton icon="up" label="Дараах" className="rotate-45" />
          </div>
        </div>
      </Card>
    </>
  );
}
