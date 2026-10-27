import { Avatar } from "@/components/admin";
import { Icon } from "@/components/icons";
import { requireAdmin } from "@/lib/auth";
import { logout } from "@/app/login/actions";

/** Sidebar-ын доод хэсэг: нэвтэрсэн админ ба гарах товч. Session уншдаг тул Suspense дотор рендерлэнэ. */
export async function Account() {
  const admin = await requireAdmin();
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      <Avatar name={admin.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{admin.name}</p>
        <p className="truncate text-xs text-zinc-500">{admin.role}</p>
      </div>
      <form action={logout}>
        <button
          type="submit"
          aria-label="Гарах"
          title="Гарах"
          className="rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
        >
          <Icon name="logout" className="size-4" />
        </button>
      </form>
    </div>
  );
}

export function AccountSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2">
      <span className="size-8 animate-pulse rounded-full bg-zinc-800" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
        <div className="h-2.5 w-16 animate-pulse rounded bg-zinc-800" />
      </div>
    </div>
  );
}
