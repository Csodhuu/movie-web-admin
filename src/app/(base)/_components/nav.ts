import type { IconName } from "@/components/icons";

export type NavLink = { href: string; label: string };
export type NavItem = { label: string; icon: IconName; href: string; children?: NavLink[] };

export const nav: NavItem[] = [
  { label: "Хяналтын самбар", icon: "dashboard", href: "/dashboard" },
  {
    label: "Контент",
    icon: "film",
    href: "/content",
    children: [
      { href: "/content/movies", label: "Кино" },
      { href: "/content/series", label: "Цуврал" },
      { href: "/content/genres", label: "Төрөл, ангилал" },
      { href: "/content/cast", label: "Жүжигчид, найруулагч" },
      { href: "/content/trailers", label: "Трейлер" },
      { href: "/content/media", label: "Медиа сан" },
      { href: "/content/collections", label: "Баннер, жагсаалт" },
    ],
  },
  {
    label: "AI студи",
    icon: "sparkles",
    href: "/ai-studio",
    children: [
      { href: "/ai-studio/recommendations", label: "Санал болголт" },
      { href: "/ai-studio/subtitles", label: "AI хадмал" },
      { href: "/ai-studio/dubbing", label: "AI дуу оруулга" },
      { href: "/ai-studio/posters", label: "Постер, thumbnail" },
      { href: "/ai-studio/metadata", label: "Шошго, тайлбар" },
      { href: "/ai-studio/moderation", label: "Шүүлт, насны ангилал" },
      { href: "/ai-studio/highlights", label: "Highlight, трейлер" },
    ],
  },
  {
    label: "Хэрэглэгчид",
    icon: "users",
    href: "/users",
    children: [
      { href: "/users/all", label: "Бүх хэрэглэгч" },
      { href: "/users/devices", label: "Профайл, төхөөрөмж" },
      { href: "/users/blocked", label: "Хаагдсан" },
    ],
  },
  {
    label: "Багц ба төлбөр",
    icon: "card",
    href: "/billing",
    children: [
      { href: "/billing/plans", label: "Багцууд" },
      { href: "/billing/transactions", label: "Гүйлгээ" },
      { href: "/billing/promos", label: "Промо код, купон" },
      { href: "/billing/refunds", label: "Буцаалт" },
    ],
  },
  {
    label: "Аналитик",
    icon: "chart",
    href: "/analytics",
    children: [
      { href: "/analytics/views", label: "Үзэлтийн тайлан" },
      { href: "/analytics/revenue", label: "Орлогын тайлан" },
      { href: "/analytics/retention", label: "Хадгалалт (Retention)" },
      { href: "/analytics/recommendations", label: "AI санал болголт" },
    ],
  },
  {
    label: "Маркетинг",
    icon: "megaphone",
    href: "/marketing",
    children: [
      { href: "/marketing/push", label: "Push мэдэгдэл" },
      { href: "/marketing/email", label: "И-мэйл кампанит ажил" },
    ],
  },
  { label: "Сэтгэгдэл ба үнэлгээ", icon: "star", href: "/reviews" },
  {
    label: "Тусламж",
    icon: "help",
    href: "/support",
    children: [
      { href: "/support/tickets", label: "Хүсэлт, тикет" },
      { href: "/support/faq", label: "Түгээмэл асуулт" },
    ],
  },
  {
    label: "Админ ба эрх",
    icon: "shield",
    href: "/admins",
    children: [
      { href: "/admins/users", label: "Админ хэрэглэгчид" },
      { href: "/admins/roles", label: "Эрхийн түвшин" },
      { href: "/admins/audit-log", label: "Үйлдлийн түүх" },
    ],
  },
  {
    label: "Тохиргоо",
    icon: "settings",
    href: "/settings",
    children: [
      { href: "/settings/general", label: "Ерөнхий" },
      { href: "/settings/payments", label: "Төлбөрийн систем" },
      { href: "/settings/streaming", label: "Стриминг, CDN, DRM" },
      { href: "/settings/ai-keys", label: "AI API түлхүүр" },
      { href: "/settings/languages", label: "Хэл" },
    ],
  },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
