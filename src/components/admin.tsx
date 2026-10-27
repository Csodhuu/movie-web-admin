import { Children, type ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-2">
          {title && <h2 className="font-semibold text-zinc-100">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change?: number;
  icon: IconName;
}) {
  const positive = (change ?? 0) >= 0;
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
          <Icon name={icon} />
        </div>
      </div>
      {change !== undefined && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1 text-xs font-medium",
            positive ? "text-emerald-400" : "text-red-400",
          )}
        >
          <Icon name={positive ? "up" : "down"} className="size-3.5" />
          {Math.abs(change)}%
          <span className="font-normal text-zinc-500">өнгөрсөн сараас</span>
        </p>
      )}
    </Card>
  );
}

const badgeTones = {
  green: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  red: "bg-red-500/10 text-red-400 ring-red-500/20",
  yellow: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  blue: "bg-sky-500/10 text-sky-400 ring-sky-500/20",
  purple: "bg-violet-500/10 text-violet-400 ring-violet-500/20",
  gray: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
} as const;

export type BadgeTone = keyof typeof badgeTones;

export function Badge({ tone = "gray", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap",
        badgeTones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  icon,
  className,
  ...props
}: {
  variant?: "primary" | "secondary" | "ghost";
  icon?: IconName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:opacity-50",
        variant === "primary" && "bg-red-600 text-white hover:bg-red-500",
        variant === "secondary" &&
          "border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800",
        variant === "ghost" && "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} className="size-4" />}
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  className,
  ...props
}: { icon: IconName; label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-100",
        className,
      )}
      {...props}
    >
      <Icon name={icon} className="size-4" />
    </button>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hues = ["bg-red-500/20 text-red-300", "bg-sky-500/20 text-sky-300", "bg-violet-500/20 text-violet-300", "bg-emerald-500/20 text-emerald-300", "bg-amber-500/20 text-amber-300"];
  const tone = hues[name.length % hues.length];
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        tone,
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
            {head.map((h, i) => (
              <th key={i} className="px-5 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/70">
          {Children.count(children) > 0 ? (
            children
          ) : (
            <tr>
              <td colSpan={head.length} className="px-5 py-12 text-center text-sm text-zinc-500">
                Мэдээлэл алга
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("px-5 py-3 text-zinc-300", className)}>{children}</td>;
}

export const inputClass =
  "block w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30";

export function SearchInput({
  placeholder = "Хайх...",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Icon
        name="search"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className={cn(inputClass, "pl-9")}
      />
    </div>
  );
}

function ChartEmpty({ height }: { height: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border border-dashed border-zinc-800 text-sm text-zinc-500"
      style={{ height }}
    >
      Мэдээлэл алга
    </div>
  );
}

/** Жагсаалт хоосон үед карт дотор харуулах жижиг мессеж */
export function NoData({ text = "Мэдээлэл алга" }: { text?: string }) {
  return <p className="py-8 text-center text-sm text-zinc-500">{text}</p>;
}

export function BarChart({
  data,
  height = 180,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  if (data.length === 0) return <ChartEmpty height={height} />;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-red-700 to-red-500 opacity-80 transition group-hover:opacity-100"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-200 opacity-0 transition group-hover:opacity-100">
              {d.value.toLocaleString()}
            </span>
          </div>
          <span className="text-[11px] text-zinc-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ProgressRow({
  label,
  value,
  max = 100,
  suffix = "%",
}: {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="text-zinc-500">
          {value.toLocaleString()}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-500"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function Poster({ title, className }: { title: string; className?: string }) {
  const gradients = [
    "from-red-900 to-zinc-900",
    "from-sky-900 to-zinc-900",
    "from-violet-900 to-zinc-900",
    "from-amber-900 to-zinc-900",
    "from-emerald-900 to-zinc-900",
  ];
  const g = gradients[title.length % gradients.length];
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-zinc-400",
        g,
        className ?? "h-14 w-10",
      )}
    >
      <Icon name="film" className="size-4 opacity-60" />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition",
        checked ? "bg-red-600" : "bg-zinc-700",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow transition",
          checked ? "translate-x-5.5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-zinc-300">{label}</span>
      {children}
      {hint && <span className="block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

export function LineChart({
  data,
  height = 180,
  suffix = "",
}: {
  data: { label: string; value: number }[];
  height?: number;
  suffix?: string;
}) {
  if (data.length < 2) return <ChartEmpty height={height} />;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const w = 100;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = 90 - ((d.value - min) / range) * 80;
    return { x, y, ...d };
  });
  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <div>
      <div className="relative" style={{ height }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          <polygon points={`0,100 ${line} 100,100`} className="fill-red-500/10" />
          <polyline
            points={line}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-red-500"
            strokeWidth={2}
          />
        </svg>
        {points.map((p) => (
          <div
            key={p.label}
            className="group absolute size-3 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className="block size-full rounded-full border-2 border-red-500 bg-zinc-950" />
            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-zinc-200 opacity-0 transition group-hover:opacity-100">
              {p.value.toLocaleString()}
              {suffix}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between">
        {data.map((d) => (
          <span key={d.label} className="text-[11px] text-zinc-500">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, desc }: { icon: IconName; title: string; desc?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
        <Icon name={icon} />
      </span>
      <p className="mt-3 text-sm text-zinc-300">{title}</p>
      {desc && <p className="mt-1 text-xs text-zinc-500">{desc}</p>}
    </div>
  );
}

export function UploadBox({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/40 px-4 py-8 text-center transition hover:border-red-500/50">
      <Icon name="upload" className="size-6 text-zinc-500" />
      <p className="text-sm text-zinc-300">{title}</p>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

const statusMap: Record<string, { label: string; tone: BadgeTone }> = {
  published: { label: "Нийтлэгдсэн", tone: "green" },
  draft: { label: "Ноорог", tone: "gray" },
  scheduled: { label: "Товлосон", tone: "blue" },
  archived: { label: "Архив", tone: "yellow" },
  sent: { label: "Илгээсэн", tone: "green" },
  approved: { label: "Зөвшөөрсөн", tone: "green" },
  pending: { label: "Хүлээгдэж буй", tone: "yellow" },
  rejected: { label: "Татгалзсан", tone: "red" },
  open: { label: "Нээлттэй", tone: "red" },
  in_progress: { label: "Шийдвэрлэж буй", tone: "yellow" },
  resolved: { label: "Шийдсэн", tone: "green" },
  processing: { label: "Боловсруулж байна", tone: "blue" },
  done: { label: "Дууссан", tone: "green" },
  queued: { label: "Дараалалд", tone: "gray" },
  failed: { label: "Алдаа", tone: "red" },
};

export function formatBadge(status: string) {
  return statusMap[status] ?? { label: status, tone: "gray" as BadgeTone };
}

export function StatusBadge({ status }: { status: string }) {
  const s = formatBadge(status);
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
