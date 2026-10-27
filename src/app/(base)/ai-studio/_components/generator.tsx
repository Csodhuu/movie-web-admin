"use client";

import { useState } from "react";
import { Button, Card, IconButton, cn, inputClass } from "@/components/admin";
import { Icon, type IconName } from "@/components/icons";
import { movies } from "@/lib/placeholders";

export type Tool = "description" | "tags" | "subtitles" | "poster";

const allTools:{ key: Tool; label: string; desc: string; icon: IconName }[] = [
  { key: "description", label: "Тайлбар бичих", desc: "Киноны товч агуулга үүсгэх", icon: "edit" },
  { key: "tags", label: "Шошго, жанр", desc: "Хайлтын түлхүүр үг санал болгох", icon: "filter" },
  { key: "subtitles", label: "Хадмал орчуулга", desc: "Хадмалыг өөр хэл рүү орчуулах", icon: "globe" },
  { key: "poster", label: "Постер санаа", desc: "Постерын дизайн санаа гаргах", icon: "sparkles" },
];

const tones = ["Албан", "Сонирхолтой", "Товч", "Дэлгэрэнгүй"];

// TODO: AI API (Тохиргоо → AI API түлхүүр) холбогдоход жинхэнэ үр дүн буцаана.
const NOT_CONNECTED = "AI үйлчилгээ холбогдоогүй байна. Тохиргоо → AI API түлхүүр хэсэгт түлхүүр нэмсний дараа ажиллана.";

type HistoryItem = { id: number; tool: Tool; title: string; result: string; time: string };

/** AI текст үүсгэгч. `only`-оор харуулах хэрэгслүүдийг хязгаарлана. */
export function Generator({ only }: { only?: Tool[] }) {
  const tools = only ? allTools.filter((t) => only.includes(t.key)) : allTools;
  const [tool, setTool] = useState<Tool>(tools[0].key);
  const [movie, setMovie] = useState(movies[0]?.title ?? "");
  const [tone, setTone] = useState(tones[1]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [history] = useState<HistoryItem[]>([]);

  function generate() {
    setLoading(true);
    setResult("");
    setTimeout(() => {
      setResult(NOT_CONNECTED);
      setLoading(false);
    }, 300);
  }

  async function copy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      {tools.length > 1 && (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {tools.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTool(t.key);
              setResult("");
            }}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-4 text-left transition",
              tool === t.key
                ? "border-red-500/50 bg-red-500/10"
                : "border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700",
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                tool === t.key ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400",
              )}
            >
              <Icon name={t.icon} className="size-4.5" />
            </span>
            <span>
              <span className="block text-sm font-medium text-zinc-100">{t.label}</span>
              <span className="mt-0.5 block text-xs text-zinc-500">{t.desc}</span>
            </span>
          </button>
        ))}
      </div>
      )}

      <div className={cn("grid gap-4 xl:grid-cols-5", tools.length > 1 && "mt-4")}>
        <Card title="Тохиргоо" className="xl:col-span-2">
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
          >
            <label className="block space-y-1.5">
              <span className="text-sm text-zinc-300">Контент</span>
              <select value={movie} onChange={(e) => setMovie(e.target.value)} className={inputClass}>
                {movies.map((m) => (
                  <option key={m.id}>{m.title}</option>
                ))}
              </select>
            </label>

            <div className="space-y-1.5">
              <span className="text-sm text-zinc-300">Өнгө аяс</span>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition",
                      tone === t
                        ? "border-red-500 bg-red-500/10 text-red-300"
                        : "border-zinc-800 text-zinc-400 hover:text-zinc-100",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-1.5">
              <span className="text-sm text-zinc-300">Нэмэлт заавар (заавал биш)</span>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Жишээ: Залуучуудад чиглэсэн, спойлергүй бич..."
                className={inputClass}
              />
            </label>

            <Button type="submit" icon="sparkles" disabled={loading} className="w-full py-2.5">
              {loading ? "Үүсгэж байна..." : "Үүсгэх"}
            </Button>
          </form>
        </Card>

        <Card
          title="Үр дүн"
          className="xl:col-span-3"
          action={
            result && (
              <div className="flex gap-1">
                <IconButton icon={copied ? "check" : "copy"} label="Хуулах" onClick={copy} />
                <IconButton icon="sparkles" label="Дахин үүсгэх" onClick={generate} />
              </div>
            )
          }
        >
          {loading ? (
            <div className="space-y-3" aria-live="polite" aria-busy="true">
              {[100, 92, 96, 70].map((w, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-zinc-800" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : result ? (
            <>
              <pre className="font-sans text-sm leading-relaxed whitespace-pre-wrap text-zinc-200">{result}</pre>
              <div className="mt-5 flex justify-end gap-2 border-t border-zinc-800/70 pt-4">
                <Button variant="ghost" onClick={() => setResult("")}>
                  Цэвэрлэх
                </Button>
                <Button variant="secondary" icon="check">
                  Контентод хадгалах
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-zinc-800 text-zinc-500">
                <Icon name="sparkles" />
              </span>
              <p className="mt-3 text-sm text-zinc-300">Үр дүн энд гарна</p>
              <p className="mt-1 text-xs text-zinc-500">Зүүн талд тохиргоогоо сонгоод &quot;Үүсгэх&quot; дарна уу</p>
            </div>
          )}
        </Card>
      </div>

      <Card title="Түүх" className="mt-4">
        {history.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">Одоогоор үүсгэсэн зүйл алга</p>
        ) : (
          <ul className="divide-y divide-zinc-800/70">
            {history.map((h) => (
              <li key={h.id} className="flex items-center gap-3 py-3">
                <Icon name={tools.find((t) => t.key === h.tool)!.icon} className="size-4 text-zinc-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-200">
                    {tools.find((t) => t.key === h.tool)!.label} · <span className="text-zinc-400">{h.title}</span>
                  </p>
                  <p className="truncate text-xs text-zinc-500">{h.result}</p>
                </div>
                <span className="text-xs text-zinc-500">{h.time}</span>
                <IconButton icon="eye" label="Харах" onClick={() => setResult(h.result)} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}
