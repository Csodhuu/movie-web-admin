"use client";

// Server хуудсуудад шууд ашиглаж болох, өөрийн state-тэй жижиг component-ууд.

import { useState, type ReactNode } from "react";
import { Button, IconButton, Toggle, cn } from "./admin";
import type { IconName } from "./icons";

export function ToggleRow({
  title,
  desc,
  defaultChecked = false,
}: {
  title: string;
  desc?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-800/70 py-3.5 last:border-0">
      <div>
        <p className="text-sm text-zinc-200">{title}</p>
        {desc && <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={setChecked} label={title} />
    </div>
  );
}

export function Tabs({ tabs, className }: { tabs: string[]; className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={cn("flex rounded-lg border border-zinc-800 bg-zinc-900 p-0.5", className)}>
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs whitespace-nowrap transition",
            active === i ? "bg-zinc-800 font-medium text-white" : "text-zinc-400 hover:text-zinc-100",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Modal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl",
          wide ? "max-w-2xl" : "max-w-md",
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <IconButton icon="x" label="Хаах" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

/** Товч дарахад form-той modal нээгдэнэ. Илгээхэд зүгээр л хаагдана (UI шат). */
export function ModalButton({
  label,
  icon = "plus",
  title,
  submitLabel = "Хадгалах",
  variant = "primary",
  wide,
  children,
}: {
  label: string;
  icon?: IconName;
  title: string;
  submitLabel?: string;
  variant?: "primary" | "secondary" | "ghost";
  wide?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button icon={icon} variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>
      {open && (
        <Modal title={title} onClose={() => setOpen(false)} wide={wide}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            {children}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Болих
              </Button>
              <Button type="submit">{submitLabel}</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export function SaveButton({ label = "Хадгалах" }: { label?: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <Button
      icon={saved ? "check" : undefined}
      onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }}
    >
      {saved ? "Хадгалагдлаа" : label}
    </Button>
  );
}

export function CopyField({ value, secret }: { value: string; secret?: boolean }) {
  const [shown, setShown] = useState(!secret);
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 py-1 pr-1 pl-3">
      <code className="min-w-0 flex-1 truncate font-mono text-xs text-zinc-300">
        {shown ? value : "•".repeat(Math.min(value.length, 32))}
      </code>
      {secret && <IconButton icon="eye" label={shown ? "Нуух" : "Харах"} onClick={() => setShown((s) => !s)} />}
      <IconButton
        icon={copied ? "check" : "copy"}
        label="Хуулах"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      />
    </div>
  );
}
