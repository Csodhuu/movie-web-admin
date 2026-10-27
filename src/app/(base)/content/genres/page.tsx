import type { Metadata } from "next";
import { Badge, Card, Field, IconButton, PageHeader, Table, Td, inputClass } from "@/components/admin";
import { ModalButton } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import { categories, genres } from "@/lib/placeholders";

export const metadata: Metadata = { title: "Төрөл, ангилал" };

export default function GenresPage() {
  return (
    <>
      <PageHeader
        title="Төрөл, ангилал"
        description="Контентыг жанр болон сэдэвчилсэн ангиллаар зохион байгуулах"
        actions={
          <ModalButton label="Төрөл нэмэх" title="Шинэ төрөл">
            <Field label="Нэр">
              <input className={inputClass} placeholder="Жишээ: Аймшиг" />
            </Field>
            <Field label="Slug" hint="URL-д ашиглагдана">
              <input className={inputClass} placeholder="horror" />
            </Field>
          </ModalButton>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Жанрууд" className="xl:col-span-2">
          <Table head={["", "Нэр", "Slug", "Контент", "Төлөв", ""]}>
            {genres.map((g) => (
              <tr key={g.slug} className="hover:bg-zinc-900/60">
                <Td className="w-8 cursor-grab text-zinc-600">
                  <Icon name="menu" className="size-4" />
                </Td>
                <Td className="font-medium text-zinc-100">{g.name}</Td>
                <Td className="font-mono text-xs text-zinc-500">{g.slug}</Td>
                <Td>{g.count}</Td>
                <Td>{g.visible ? <Badge tone="green">Харагдана</Badge> : <Badge>Нуугдсан</Badge>}</Td>
                <Td>
                  <div className="flex justify-end gap-0.5">
                    <IconButton icon="edit" label="Засах" />
                    <IconButton icon="trash" label="Устгах" className="hover:text-red-400" />
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card
          title="Ангилал"
          action={
            <ModalButton label="Нэмэх" variant="ghost" title="Шинэ ангилал">
              <Field label="Нэр">
                <input className={inputClass} />
              </Field>
            </ModalButton>
          }
        >
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.name} className="flex items-center justify-between rounded-lg border border-zinc-800/70 px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm text-zinc-200">
                  <Icon name="tag" className="size-4 text-zinc-500" />
                  {c.name}
                </span>
                <span className="text-xs text-zinc-500">{c.count} контент</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
