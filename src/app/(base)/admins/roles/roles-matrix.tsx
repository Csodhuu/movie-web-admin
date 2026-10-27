"use client";

import { useState } from "react";
import { Card, Field, PageHeader, cn, inputClass } from "@/components/admin";
import { ModalButton, SaveButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { ROLE_INFO as roles } from "@/lib/permissions";

const permissionGroups = [
  {
    group: "Контент",
    items: [
      { key: "content.view", label: "Харах" },
      { key: "content.edit", label: "Нэмэх, засах" },
      { key: "content.publish", label: "Нийтлэх" },
      { key: "content.delete", label: "Устгах" },
    ],
  },
  {
    group: "AI студи",
    items: [
      { key: "ai.run", label: "AI ажил эхлүүлэх" },
      { key: "ai.settings", label: "Модель тохируулах" },
    ],
  },
  {
    group: "Хэрэглэгч",
    items: [
      { key: "users.view", label: "Харах" },
      { key: "users.block", label: "Хаах, сэргээх" },
    ],
  },
  {
    group: "Төлбөр",
    items: [
      { key: "billing.view", label: "Харах" },
      { key: "billing.refund", label: "Буцаалт хийх" },
      { key: "billing.plans", label: "Багц засах" },
    ],
  },
  {
    group: "Бусад",
    items: [
      { key: "reviews.moderate", label: "Сэтгэгдэл хянах" },
      { key: "support.reply", label: "Тикетэд хариулах" },
      { key: "marketing.send", label: "Мэдэгдэл илгээх" },
      { key: "admins.manage", label: "Админ удирдах" },
      { key: "settings.edit", label: "Тохиргоо өөрчлөх" },
    ],
  },
];

const allKeys = permissionGroups.flatMap((g) => g.items.map((i) => i.key));

const initial: Record<string, string[]> = {
  "Super Admin": allKeys,
  "Контент менежер": ["content.view", "content.edit", "content.publish", "ai.run"],
  Модератор: ["content.view", "users.view", "users.block", "reviews.moderate"],
  Санхүү: ["billing.view", "billing.refund", "billing.plans", "users.view"],
  Дэмжлэг: ["users.view", "support.reply", "content.view"],
};

export function RolesMatrix() {
  const [matrix, setMatrix] = useState(initial);

  function toggle(role: string, key: string) {
    if (role === "Super Admin") return; // Super Admin үргэлж бүх эрхтэй
    setMatrix((m) => ({
      ...m,
      [role]: m[role].includes(key) ? m[role].filter((k) => k !== key) : [...m[role], key],
    }));
  }

  return (
    <>
      <PageHeader
        title="Эрхийн түвшин"
        description="Үүрэг бүрт ямар эрх олгохыг тохируулах"
        actions={
          <>
            <ModalButton label="Үүрэг нэмэх" variant="secondary" title="Шинэ үүрэг">
              <Field label="Нэр">
                <input className={inputClass} />
              </Field>
              <Field label="Тайлбар">
                <input className={inputClass} />
              </Field>
            </ModalButton>
            <SaveButton />
          </>
        }
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {roles.map((r) => (
          <Card key={r.name} className="p-4">
            <p className="text-sm font-medium text-zinc-100">{r.name}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{r.description}</p>
            <p className="mt-3 text-xs text-zinc-400">
              {matrix[r.name].length} эрх
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500">
                <th className="px-5 py-3 text-left font-medium">Эрх</th>
                {roles.map((r) => (
                  <th key={r.name} className="px-3 py-3 text-center font-medium">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            {permissionGroups.map((g) => (
              <tbody key={g.group} className="border-b border-zinc-800/70 last:border-0">
                <tr>
                  <td colSpan={roles.length + 1} className="bg-zinc-900/50 px-5 py-2 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                    {g.group}
                  </td>
                </tr>
                {g.items.map((p) => (
                  <tr key={p.key} className="hover:bg-zinc-900/40">
                    <td className="px-5 py-2.5 text-zinc-300">{p.label}</td>
                    {roles.map((r) => {
                      const on = matrix[r.name].includes(p.key);
                      const locked = r.name === "Super Admin";
                      return (
                        <td key={r.name} className="px-3 py-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => toggle(r.name, p.key)}
                            disabled={locked}
                            aria-pressed={on}
                            aria-label={`${r.name}: ${g.group} — ${p.label}`}
                            className={cn(
                              "inline-flex size-6 items-center justify-center rounded-md border transition",
                              on ? "border-red-500 bg-red-600 text-white" : "border-zinc-700 text-transparent hover:border-zinc-500",
                              locked && "cursor-not-allowed opacity-60",
                            )}
                          >
                            <Icon name="check" className="size-3.5" />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Card>
    </>
  );
}
