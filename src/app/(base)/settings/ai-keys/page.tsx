import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, ProgressRow, inputClass } from "@/components/admin";
import { CopyField, ModalButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "AI моделийн API түлхүүр" };

// Жишээ утгууд. Жинхэнэ түлхүүрийг backend-д нууцлан хадгална.
const keys: { provider: string; use: string; model: string; key: string; status: string; usage: number }[] = [];

export default function AiKeysPage() {
  return (
    <>
      <PageHeader
        title="AI моделийн API түлхүүр"
        description="AI студийн хэрэгслүүдэд ашиглах үйлчилгээ үзүүлэгчийн түлхүүрүүд"
        actions={
          <ModalButton label="Түлхүүр нэмэх" title="Шинэ API түлхүүр">
            <Field label="Үйлчилгээ үзүүлэгч">
              <select className={inputClass}>
                <option>Anthropic</option>
                <option>ElevenLabs</option>
                <option>Stability</option>
                <option>Бусад</option>
              </select>
            </Field>
            <Field label="API түлхүүр">
              <input type="password" className={`${inputClass} font-mono`} />
            </Field>
            <Field label="Сарын төсвийн хязгаар ($)">
              <input type="number" defaultValue={500} className={inputClass} />
            </Field>
          </ModalButton>
        }
      />

      <div className="mb-4 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
        <Icon name="lock" className="mt-0.5 size-4 shrink-0 text-amber-400" />
        <p className="text-zinc-300">
          API түлхүүрийг зөвхөн сервер талд шифрлэн хадгална. Энэ хуудсанд зөвхөн сүүлийн тэмдэгтүүд харагдана.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {keys.map((k) => (
          <Card key={k.provider}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-100">{k.provider}</p>
                <p className="text-sm text-zinc-500">{k.use}</p>
              </div>
              {k.status === "active" ? <Badge tone="green">Идэвхтэй</Badge> : <Badge>Идэвхгүй</Badge>}
            </div>
            <div className="mt-4 space-y-3">
              <CopyField value={k.key} secret />
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>
                  Модель: <span className="font-mono text-zinc-300">{k.model}</span>
                </span>
                <div className="flex gap-0.5">
                  <IconButton icon="refund" label="Шинэчлэх" />
                  <IconButton icon="trash" label="Устгах" className="hover:text-red-400" />
                </div>
              </div>
              <ProgressRow label="Сарын төсөв ашиглалт" value={k.usage} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
