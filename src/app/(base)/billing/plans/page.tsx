import type { Metadata } from "next";
import { Badge, Card, Field, PageHeader, StatCard, inputClass } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { plans } from "@/lib/placeholders";
import { formatMNT } from "@/lib/format";

export const metadata: Metadata = { title: "Багцууд" };

function PlanForm({ name, price, features }: { name?: string; price?: number; features?: string[] }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Нэр">
          <input defaultValue={name} className={inputClass} />
        </Field>
        <Field label="Сарын үнэ (₮)">
          <input type="number" defaultValue={price} className={inputClass} />
        </Field>
      </div>
      <Field label="Онцлогууд" hint="Мөр бүрт нэг онцлог">
        <textarea rows={4} defaultValue={features?.join("\n")} className={inputClass} />
      </Field>
    </>
  );
}

export default function PlansPage() {
  return (
    <>
      <PageHeader
        title="Багцууд"
        description="Захиалгын багц, үнэ, онцлогуудыг удирдах"
        actions={
          <ModalButton label="Багц нэмэх" title="Шинэ багц">
            <PlanForm />
          </ModalButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Сарын орлого (MRR)" value="—" icon="wallet" />
        <StatCard label="Төлбөртэй захиалагч" value="—" icon="users" />
        <StatCard label="Дундаж орлого / хэрэглэгч" value="—" icon="card" />
        <StatCard label="Амжилтгүй төлбөр" value="—" icon="flag" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <Card key={p.name} className={p.name === "Premium" ? "border-red-500/40 bg-red-500/5" : undefined}>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-zinc-100">{p.name}</p>
              {p.name === "Premium" && <Badge tone="red">Түгээмэл</Badge>}
            </div>
            <p className="mt-3 text-2xl font-bold text-white">
              {p.price === 0 ? "Үнэгүй" : formatMNT(p.price)}
              {p.price > 0 && <span className="text-sm font-normal text-zinc-500"> / сар</span>}
            </p>
            <p className="mt-1 text-xs text-zinc-500">{p.subscribers.toLocaleString()} захиалагч</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 [&>button]:w-full">
              <ModalButton label="Засах" icon="edit" variant="secondary" title={`${p.name} багц засах`}>
                <PlanForm name={p.name} price={p.price} features={p.features} />
              </ModalButton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
