import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Нэвтрэх | Movie Admin",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12">
      {/* Background glow + film grid */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-900/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="size-7 text-white"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Movie Admin
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Удирдлагын хэсэгт нэвтрэх
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-xl">
          <LoginForm />
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="size-3.5"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Зөвхөн эрх бүхий ажилтнууд нэвтэрнэ
        </p>
      </div>
    </main>
  );
}
