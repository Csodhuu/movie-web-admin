import type { Metadata } from "next";
import { Badge, Button, Card, PageHeader, Poster, ProgressRow, StatCard } from "@/components/admin";

export const metadata: Metadata = { title: "Шүүлт, насны ангилал" };

const queue: { title: string; suggested: string; confidence: number; flags: { label: string; value: number }[] }[] = [];

const ratingTone = { "18+": "red", "16+": "yellow", "7+": "green" } as const;

export default function ModerationPage() {
  return (
    <>
      <PageHeader title="Контент шүүлт, насны ангилал" description="AI шинжилгээгээр насны ангилал санал болгож, хүнээр баталгаажуулах" />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Хянах хүлээгдэж буй" value="—" icon="clock" />
        <StatCard label="Энэ сард шалгасан" value="—" icon="check" />
        <StatCard label="AI-тай санал нийлсэн" value="—" icon="sparkles" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {queue.map((q) => (
          <Card key={q.title}>
            <div className="flex items-start gap-3">
              <Poster title={q.title} className="h-16 w-11" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-zinc-100">{q.title}</p>
                <p className="text-xs text-zinc-500">AI итгэл: {q.confidence}%</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-zinc-500">Санал болгосон</p>
                <Badge tone={ratingTone[q.suggested as keyof typeof ratingTone]}>{q.suggested}</Badge>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {q.flags.map((f) => (
                <ProgressRow key={f.label} label={f.label} value={f.value} />
              ))}
            </div>
            <div className="mt-5 flex gap-2 border-t border-zinc-800/70 pt-4">
              <Button icon="check" className="flex-1">
                Батлах
              </Button>
              <Button variant="secondary" className="flex-1">
                Өөрчлөх
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
