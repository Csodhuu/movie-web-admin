// Үүрэг бүрийн эрх. Дараагийн шатанд "Эрхийн түвшин" хуудаснаас өгөгдлийн санд хадгалдаг болно.

export const ROLES = ["Super Admin", "Контент менежер", "Модератор", "Санхүү", "Дэмжлэг"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_INFO: { name: Role; description: string }[] = [
  { name: "Super Admin", description: "Бүх эрх" },
  { name: "Контент менежер", description: "Кино, цуврал удирдах" },
  { name: "Модератор", description: "Сэтгэгдэл, үнэлгээ хянах" },
  { name: "Санхүү", description: "Төлбөр, тайлан харах" },
  { name: "Дэмжлэг", description: "Хэрэглэгчийн асуудал шийдэх" },
];

export const PERMISSIONS = [
  "content.view",
  "content.edit",
  "content.publish",
  "content.delete",
  "ai.run",
  "ai.settings",
  "users.view",
  "users.block",
  "billing.view",
  "billing.refund",
  "billing.plans",
  "reviews.moderate",
  "support.reply",
  "marketing.send",
  "admins.manage",
  "settings.edit",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  "Super Admin": PERMISSIONS,
  "Контент менежер": ["content.view", "content.edit", "content.publish", "ai.run"],
  Модератор: ["content.view", "users.view", "users.block", "reviews.moderate"],
  Санхүү: ["billing.view", "billing.refund", "billing.plans", "users.view"],
  Дэмжлэг: ["users.view", "support.reply", "content.view"],
};

export function hasPermission(role: Role, permission: Permission) {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
