import type { Metadata } from "next";
import { Badge, Button, Card, Field, PageHeader, inputClass } from "@/components/admin";
import { SaveButton, ToggleRow } from "@/components/admin-client";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "Төлбөрийн систем" };

const gateways = [
  { name: "QPay", desc: "QR код, банкны апп", connected: false, share: "—" },
  { name: "SocialPay", desc: "Голомт банк", connected: false, share: "—" },
  { name: "Visa / Mastercard", desc: "Олон улсын карт", connected: false, share: "—" },
  { name: "Monpay", desc: "Цахим түрийвч", connected: false, share: "—" },
  { name: "Apple / Google Pay", desc: "Апп доторх төлбөр", connected: false, share: "—" },
];

export default function PaymentsSettingsPage() {
  return (
    <>
      <PageHeader title="Төлбөрийн систем" description="Төлбөрийн гарц, нэхэмжлэх, татварын тохиргоо" actions={<SaveButton />} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {gateways.map((g) => (
          <Card key={g.name}>
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                <Icon name="card" />
              </span>
              {g.connected ? <Badge tone="green">Холбогдсон</Badge> : <Badge>Холбогдоогүй</Badge>}
            </div>
            <p className="mt-4 font-semibold text-zinc-100">{g.name}</p>
            <p className="text-sm text-zinc-500">{g.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/70 pt-3">
              <span className="text-xs text-zinc-500">Гүйлгээний хувь: {g.share}</span>
              <Button variant={g.connected ? "ghost" : "secondary"}>{g.connected ? "Тохируулах" : "Холбох"}</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card title="QPay тохиргоо">
          <div className="space-y-4">
            <Field label="Merchant ID">
              <input className={inputClass} placeholder="QPay-аас авсан Merchant ID" />
            </Field>
            <Field label="Client secret">
              <input type="password" className={inputClass} placeholder="Client secret" />
            </Field>
            <Field label="Callback URL">
              <input className={inputClass} placeholder="https://.../webhooks/qpay" />
            </Field>
          </div>
        </Card>
        <Card title="Нэхэмжлэх, татвар">
          <div className="mb-2 grid gap-4 sm:grid-cols-2">
            <Field label="НӨАТ (%)">
              <input type="number" defaultValue={10} className={inputClass} />
            </Field>
            <Field label="Төлбөр дахин оролдох">
              <select className={inputClass}>
                <option>3 удаа, 2 хоног тутам</option>
                <option>5 удаа, өдөр бүр</option>
              </select>
            </Field>
          </div>
          <ToggleRow title="И-баримт автоматаар илгээх" defaultChecked />
          <ToggleRow title="Туршилтын 7 хоног" desc="Шинэ хэрэглэгч эхний 7 хоногт үнэгүй" defaultChecked />
          <ToggleRow title="Туршилтын горим (sandbox)" desc="Жинхэнэ төлбөр татахгүй" />
        </Card>
      </div>
    </>
  );
}
