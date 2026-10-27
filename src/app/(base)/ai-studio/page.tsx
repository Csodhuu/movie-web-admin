import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, PageHeader, StatCard } from "@/components/admin";
import { Icon, type IconName } from "@/components/icons";

export const metadata: Metadata = { title: "AI студи" };

const tools: { href: string; label: string; desc: string; icon: IconName; stat: string }[] = [
  { href: "/ai-studio/recommendations", label: "Санал болголтын систем", desc: "Хэрэглэгч бүрт тохирсон контент санал болгох модель", icon: "sparkles", stat: "CTR 26.3%" },
  { href: "/ai-studio/subtitles", label: "AI хадмал орчуулга", desc: "Яриаг таньж, олон хэл рүү хадмал үүсгэх", icon: "language", stat: "1,284 файл" },
  { href: "/ai-studio/dubbing", label: "AI дуу оруулга", desc: "Дүрийн дуу хоолойг хадгалан өөр хэлээр дуу оруулах", icon: "mic", stat: "42 кино" },
  { href: "/ai-studio/posters", label: "Постер, thumbnail", desc: "Видеоноос хамгийн тохиромжтой кадр сонгож постер үүсгэх", icon: "image", stat: "318 зураг" },
  { href: "/ai-studio/metadata", label: "Автомат шошго, тайлбар", desc: "Товч агуулга, түлхүүр үг, жанрыг автоматаар бичих", icon: "tag", stat: "96% нарийвчлал" },
  { href: "/ai-studio/moderation", label: "Шүүлт, насны ангилал", desc: "Хүчирхийлэл, бүдүүлэг үг илрүүлж насны ангилал тогтоох", icon: "shield", stat: "14 хүлээгдэж буй" },
  { href: "/ai-studio/highlights", label: "Highlight, трейлер", desc: "Онцлох хэсгийг таньж богино клип, трейлер таслах", icon: "scissors", stat: "87 клип" },
];

export default function AiStudioPage() {
  return (
    <>
      <PageHeader
        title="AI студи"
        description="Контент боловсруулалт, санал болголтыг AI-аар автоматжуулах"
        actions={<Badge tone="purple">Beta</Badge>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Энэ сарын AI ажил" value="3,412" change={22.4} icon="sparkles" />
        <StatCard label="Хэмнэсэн цаг" value="1,860 ц" change={18.0} icon="clock" />
        <StatCard label="Дараалалд" value="27" icon="layers" />
        <StatCard label="API зардал" value="$412" change={-6.2} icon="wallet" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="group">
            <Card className="h-full transition group-hover:border-red-500/40 group-hover:bg-red-500/5">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition group-hover:bg-red-600 group-hover:text-white">
                  <Icon name={t.icon} />
                </span>
                <span className="text-xs text-zinc-500">{t.stat}</span>
              </div>
              <p className="mt-4 font-semibold text-zinc-100">{t.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{t.desc}</p>
              <p className="mt-4 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-red-400">
                Нээх <Icon name="chevron" className="size-3.5" />
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
