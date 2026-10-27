"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Avatar, cn } from "@/components/admin";
import { isActive, nav } from "./nav";

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Хэрэглэгч гараар нээсэн/хаасан бүлэг. Тохируулаагүй бол идэвхтэй бүлэг нээлттэй.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const group = nav.find((n) => isActive(pathname, n.href));
  const page = group?.children?.find((c) => isActive(pathname, c.href));

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-68 flex-col border-r border-zinc-800/80 bg-zinc-950 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-700">
              <Icon name="film" className="size-4.5 text-white" />
            </span>
            <span className="font-bold tracking-tight">Movie Admin</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-500 hover:text-zinc-200 lg:hidden"
            aria-label="Цэс хаах"
          >
            <Icon name="x" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-0.5">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);

              if (!item.children) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                        active
                          ? "bg-red-500/10 font-medium text-red-400"
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                      )}
                    >
                      <Icon name={item.icon} className="size-4.5" />
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isOpen = expanded[item.href] ?? active;
              return (
                <li key={item.href}>
                  <button
                    onClick={() =>
                      setExpanded((e) => ({ ...e, [item.href]: !isOpen }))
                    }
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "font-medium text-zinc-100"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
                    )}
                  >
                    <Icon
                      name={item.icon}
                      className={cn("size-4.5", active && "text-red-400")}
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    <Icon
                      name="chevron"
                      className={cn(
                        "size-4 text-zinc-600 transition-transform",
                        isOpen && "rotate-90",
                      )}
                    />
                  </button>
                  {isOpen && (
                    <ul className="mt-0.5 mb-1 ml-5 space-y-0.5 border-l border-zinc-800 pl-3">
                      {item.children.map((child) => {
                        const childActive = isActive(pathname, child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "block rounded-md px-3 py-1.5 text-[13px] transition",
                                childActive
                                  ? "bg-red-500/10 font-medium text-red-400"
                                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-zinc-800/80 p-3">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar name="Админ" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Админ</p>
              <p className="truncate text-xs text-zinc-500">Super Admin</p>
            </div>
            <Link
              href="/login"
              aria-label="Гарах"
              title="Гарах"
              className="rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
            >
              <Icon name="logout" className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-zinc-800/80 bg-zinc-950/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-900 lg:hidden"
            aria-label="Цэс нээх"
          >
            <Icon name="menu" />
          </button>
          <p className="flex min-w-0 items-center gap-1.5 truncate text-sm text-zinc-500">
            <span className={page ? undefined : "text-zinc-200"}>
              {group?.label}
            </span>
            {page && (
              <>
                <Icon name="chevron" className="size-3.5" />
                <span className="text-zinc-200">{page.label}</span>
              </>
            )}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Icon
                name="search"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="search"
                placeholder="Кино, хэрэглэгч хайх..."
                className="w-72 rounded-lg border border-zinc-800 bg-zinc-900/60 py-1.5 pr-3 pl-9 text-sm placeholder:text-zinc-600 outline-none focus:border-red-500"
              />
            </div>
            <button
              className="relative rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
              aria-label="Мэдэгдэл"
            >
              <Icon name="bell" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500 ring-2 ring-zinc-950" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
