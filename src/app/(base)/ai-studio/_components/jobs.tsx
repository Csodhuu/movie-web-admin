import { Card, IconButton, StatusBadge, Table, Td } from "@/components/admin";

export type Job = {
  id: string;
  title: string;
  detail: string;
  progress: number;
  status: "done" | "processing" | "queued" | "failed";
  created: string;
};

/** AI ажлын дараалал (хадмал, дуу оруулга, highlight гэх мэт) */
export function JobQueue({ jobs, title = "Ажлын дараалал" }: { jobs: Job[]; title?: string }) {
  return (
    <Card title={title}>
      <Table head={["Контент", "Дэлгэрэнгүй", "Явц", "Төлөв", "Огноо", ""]}>
        {jobs.map((j) => (
          <tr key={j.id} className="hover:bg-zinc-900/60">
            <Td className="font-medium text-zinc-100">{j.title}</Td>
            <Td className="text-zinc-400">{j.detail}</Td>
            <Td className="w-40">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={j.status === "failed" ? "h-full bg-red-500" : "h-full bg-emerald-500"}
                    style={{ width: `${j.progress}%` }}
                  />
                </div>
                <span className="w-9 text-right text-xs text-zinc-500">{j.progress}%</span>
              </div>
            </Td>
            <Td>
              <StatusBadge status={j.status} />
            </Td>
            <Td className="text-zinc-500">{j.created}</Td>
            <Td>
              <div className="flex justify-end gap-0.5">
                {j.status === "done" && <IconButton icon="download" label="Татах" />}
                {j.status === "failed" && <IconButton icon="refund" label="Дахин оролдох" />}
                <IconButton icon="more" label="Үйлдэл" />
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}
