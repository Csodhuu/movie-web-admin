import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, Table, Td, inputClass } from "@/components/admin";
import { CopyField, ModalButton } from "@/components/admin-client";
import { promos } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Промо код, купон" };

export default function PromosPage() {
  return (
    <>
      <PageHeader
        title="Промо код, купон"
        description="Хөнгөлөлтийн код үүсгэж, ашиглалтыг хянах"
        actions={
          <ModalButton label="Код үүсгэх" title="Шинэ промо код" submitLabel="Үүсгэх">
            <Field label="Код">
              <input className={`${inputClass} font-mono uppercase`} placeholder="NEWYEAR2027" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Хөнгөлөлтийн төрөл">
                <select className={inputClass}>
                  <option>Хувь (%)</option>
                  <option>Тогтмол дүн (₮)</option>
                  <option>Үнэгүй сар</option>
                </select>
              </Field>
              <Field label="Хэмжээ">
                <input type="number" className={inputClass} />
              </Field>
              <Field label="Ашиглах дээд тоо">
                <input type="number" placeholder="Хязгааргүй" className={inputClass} />
              </Field>
              <Field label="Дуусах огноо">
                <input type="date" className={inputClass} />
              </Field>
            </div>
          </ModalButton>
        }
      />

      <Card>
        <Table head={["Код", "Хөнгөлөлт", "Хамрах хүрээ", "Ашигласан", "Дуусах", "Төлөв", ""]}>
          {promos.map((p) => (
            <tr key={p.code} className="hover:bg-zinc-900/60">
              <Td className="w-56">
                <CopyField value={p.code} />
              </Td>
              <Td className="font-medium text-zinc-100">{p.discount}</Td>
              <Td>{p.type}</Td>
              <Td className="w-44">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full bg-red-500" style={{ width: p.limit ? `${(p.used / p.limit) * 100}%` : "15%" }} />
                  </div>
                  <span className="text-xs whitespace-nowrap text-zinc-500">
                    {p.used.toLocaleString()} / {p.limit ? p.limit.toLocaleString() : "∞"}
                  </span>
                </div>
              </Td>
              <Td className="text-zinc-500">{p.expires}</Td>
              <Td>{p.active ? <Badge tone="green">Идэвхтэй</Badge> : <Badge>Дууссан</Badge>}</Td>
              <Td className="text-right">
                <IconButton icon="edit" label="Засах" />
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
