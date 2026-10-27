import type { Metadata } from "next";
import { Badge, Card, IconButton, PageHeader, ProgressRow, SearchInput, Table, Td, UploadBox } from "@/components/admin";
import { Tabs } from "@/components/admin-client";
import { Icon, type IconName } from "@/components/icons";
import { mediaFiles } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Медиа сан" };

const typeIcon: Record<string, IconName> = { video: "film", image: "image", subtitle: "language" };

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Медиа сан" description="Видео, зураг, хадмал файлууд" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <UploadBox title="Файлаа энд чирж оруулах эсвэл дарж сонгох" hint="MP4, MOV, MKV, JPG, PNG, SRT, VTT · 50GB хүртэл" />
          <div className="mt-4 rounded-lg border border-zinc-800 p-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-zinc-200">
                <Icon name="film" className="size-4 text-zinc-500" />
                shuniin_anchin_master.mov
              </span>
              <span className="text-xs text-zinc-500">Транскод хийж байна · 64%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[64%] animate-pulse rounded-full bg-red-500" />
            </div>
          </div>
        </Card>

        <Card title="Хадгалах сан">
          <p className="text-2xl font-bold text-white">
            8.4 TB <span className="text-sm font-normal text-zinc-500">/ 20 TB</span>
          </p>
          <div className="mt-4 space-y-3">
            <ProgressRow label="Видео" value={7.9} max={20} suffix=" TB" />
            <ProgressRow label="Зураг" value={0.4} max={20} suffix=" TB" />
            <ProgressRow label="Хадмал" value={0.1} max={20} suffix=" TB" />
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs tabs={["Бүгд", "Видео", "Зураг", "Хадмал"]} className="w-fit" />
          <SearchInput placeholder="Файл хайх..." />
        </div>
        <Table head={["Файл", "Хэмжээ", "Огноо", "Төлөв", ""]}>
          {mediaFiles.map((f) => (
            <tr key={f.name} className="hover:bg-zinc-900/60">
              <Td>
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                    <Icon name={typeIcon[f.type]} className="size-4" />
                  </span>
                  <span className="font-mono text-xs text-zinc-200">{f.name}</span>
                </span>
              </Td>
              <Td>{f.size}</Td>
              <Td className="text-zinc-500">{f.uploaded}</Td>
              <Td>
                {f.status === "ready" && <Badge tone="green">Бэлэн</Badge>}
                {f.status === "processing" && <Badge tone="blue">Боловсруулж байна</Badge>}
                {f.status === "failed" && <Badge tone="red">Алдаа</Badge>}
              </Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="download" label="Татах" />
                  <IconButton icon="trash" label="Устгах" className="hover:text-red-400" />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
    </>
  );
}
