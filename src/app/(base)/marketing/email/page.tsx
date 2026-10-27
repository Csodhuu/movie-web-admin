import type { Metadata } from "next";
import { Card, Field, IconButton, PageHeader, StatCard, StatusBadge, Table, Td, inputClass } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { emailCampaigns } from "@/lib/mock-data";

export const metadata: Metadata = { title: "И-мэйл кампанит ажил" };

export default function EmailCampaignsPage() {
  return (
    <>
      <PageHeader
        title="И-мэйл кампанит ажил"
        description="Захиалагчдад и-мэйл мэдээ, сурталчилгаа илгээх"
        actions={
          <ModalButton label="Шинэ кампанит ажил" title="Шинэ и-мэйл кампанит ажил" submitLabel="Ноорог үүсгэх" wide>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Нэр">
                <input className={inputClass} />
              </Field>
              <Field label="Хүлээн авагч">
                <select className={inputClass}>
                  <option>Бүх захиалагч</option>
                  <option>Цуцалсан хэрэглэгч</option>
                  <option>Дуусах гэж буй</option>
                  <option>Free хэрэглэгч</option>
                </select>
              </Field>
            </div>
            <Field label="Гарчиг (Subject)">
              <input className={inputClass} />
            </Field>
            <Field label="Агуулга">
              <textarea rows={8} className={inputClass} placeholder="Сайн байна уу, {{нэр}}..." />
            </Field>
          </ModalButton>
        }
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Захиалсан хүлээн авагч" value="28,410" change={3.1} icon="mail" />
        <StatCard label="Нээсэн хувь" value="34.2%" change={2.4} icon="eye" />
        <StatCard label="Дарсан хувь" value="7.8%" change={0.9} icon="up" />
        <StatCard label="Захиалгаа цуцалсан" value="0.3%" change={-0.1} icon="ban" />
      </div>

      <Card>
        <Table head={["Кампанит ажил", "Хүлээн авагч", "Илгээсэн", "Нээсэн", "Дарсан", "Төлөв", ""]}>
          {emailCampaigns.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-900/60">
              <Td>
                <p className="font-medium text-zinc-100">{c.name}</p>
                <p className="text-xs text-zinc-500">{c.subject}</p>
              </Td>
              <Td>{c.audience}</Td>
              <Td>{c.sent ? c.sent.toLocaleString() : "—"}</Td>
              <Td>{c.sent ? `${c.openRate}%` : "—"}</Td>
              <Td>{c.sent ? `${c.clickRate}%` : "—"}</Td>
              <Td>
                <StatusBadge status={c.status} />
              </Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="copy" label="Хуулбарлах" />
                  <IconButton icon="edit" label="Засах" />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
