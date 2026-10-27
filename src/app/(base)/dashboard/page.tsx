import type { Metadata } from "next";
import Link from "next/link";
import {
  Avatar,
  BarChart,
  Badge,
  Button,
  Card,
  PageHeader,
  Poster,
  ProgressRow,
  StatCard,
} from "@/components/admin";
import { Icon } from "@/components/icons";
import { activity, formatCompact, genreShare, monthlyViews, movies, nowWatching, series } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Хяналтын самбар" };

export default function DashboardPage() {
  const top = [...movies].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Сайн байна уу 👋"
        description="Платформын өнөөдрийн ерөнхий байдал"
        actions={
          <>
            <Button variant="secondary" icon="download">
              Тайлан татах
            </Button>
            <Link
              href="/content/movies"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
              <Icon name="plus" className="size-4" />
              Контент нэмэх
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Нийт хэрэглэгч" value="34,650" change={8.2} icon="users" />
        <StatCard label="Идэвхтэй захиалга" value="16,230" change={5.4} icon="card" />
        <StatCard label="Сарын орлого" value="₮421.3M" change={8.1} icon="wallet" />
        <StatCard label="Үзэлт (энэ сар)" value="312K" change={-2.3} icon="eye" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card
          title="Сарын үзэлт"
          className="xl:col-span-2"
          action={<Badge tone="green">+13% өсөлт</Badge>}
        >
          <BarChart data={monthlyViews} height={220} />
        </Card>

        <Card
          title="Яг одоо үзэж буй"
          action={
            <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              LIVE · 2,847
            </span>
          }
        >
          <ul className="space-y-3.5">
            {nowWatching.map((w) => (
              <li key={w.user} className="flex items-center gap-3">
                <Avatar name={w.user} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-200">{w.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full bg-red-500" style={{ width: `${w.progress}%` }} />
                    </div>
                    <span className="text-[11px] text-zinc-500">{w.device}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="Төрлөөр (%)" className="sm:col-span-2 xl:col-span-1">
          <div className="space-y-4">
            {genreShare.map((g) => (
              <ProgressRow key={g.label} label={g.label} value={g.value} />
            ))}
          </div>
        </Card>
        <Card title="Топ цуврал" className="sm:col-span-2 xl:col-span-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {series
              .filter((s) => s.status === "published")
              .concat(series.filter((s) => s.status !== "published"))
              .slice(0, 3)
              .map((s, i) => (
                <Link key={s.id} href="/content/series" className="flex items-center gap-3 rounded-lg border border-zinc-800/70 p-3 transition hover:border-zinc-700">
                  <span className="text-2xl font-bold text-zinc-700">{i + 1}</span>
                  <Poster title={s.title} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-100">{s.title}</p>
                    <p className="text-xs text-zinc-500">{s.seasons.length} улирал</p>
                  </div>
                </Link>
              ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Card
          title="Топ кино"
          className="xl:col-span-2"
          action={
            <Link href="/content/movies" className="text-xs text-zinc-400 hover:text-red-400">
              Бүгдийг харах →
            </Link>
          }
        >
          <ul className="divide-y divide-zinc-800/70">
            {top.map((m, i) => (
              <li key={m.id} className="flex items-center gap-4 py-3">
                <span className="w-5 text-center text-sm font-semibold text-zinc-600">{i + 1}</span>
                <Poster title={m.title} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-zinc-100">{m.title}</p>
                  <p className="text-xs text-zinc-500">
                    {m.type} · {m.genre} · {m.year}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-zinc-200">{formatCompact(m.views)}</p>
                  <p className="text-xs text-zinc-500">үзэлт</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-amber-400">
                  <Icon name="star" className="size-4" />
                  {m.rating}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Сүүлийн үйлдлүүд">
          <ol className="space-y-4">
            {activity.map((a, i) => (
              <li key={i} className="flex gap-3">
                <Avatar name={a.who} />
                <div className="min-w-0 text-sm">
                  <p className="text-zinc-300">
                    <span className="font-medium text-zinc-100">{a.who}</span> {a.what}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">{a.when} өмнө</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
