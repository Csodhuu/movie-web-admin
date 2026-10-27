"use client";

import { useState, type ReactNode } from "react";
import { Avatar, Button, Card, PageHeader, Toggle, cn, inputClass } from "@/components/admin";
import { Icon, type IconName } from "@/components/icons";

type Section = "profile" | "platform" | "notifications" | "security";

const sections: { key: Section; label: string; icon: IconName }[] = [
  { key: "profile", label: "Миний профайл", icon: "users" },
  { key: "platform", label: "Платформ", icon: "globe" },
  { key: "notifications", label: "Мэдэгдэл", icon: "bell" },
  { key: "security", label: "Аюулгүй байдал", icon: "lock" },
];

export function SettingsForm() {
  const [section, setSection] = useState<Section>("profile");
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({
    maintenance: false,
    registration: true,
    emailNewUser: true,
    emailPayment: true,
    emailReport: false,
    pushFlagged: true,
    twoFA: true,
    sessionLock: false,
  });

  const set = (key: keyof typeof toggles) => (v: boolean) => setToggles((t) => ({ ...t, [key]: v }));

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <PageHeader
        title="Ерөнхий тохиргоо"
        description="Профайл болон платформын тохиргоо"
        actions={
          <Button icon={saved ? "check" : undefined} onClick={save}>
            {saved ? "Хадгалагдлаа" : "Өөрчлөлт хадгалах"}
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition",
                section === s.key
                  ? "bg-zinc-800 font-medium text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
              )}
            >
              <Icon name={s.icon} className="size-4" />
              {s.label}
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          {section === "profile" && (
            <>
              <Card title="Хувийн мэдээлэл">
                <div className="mb-5 flex items-center gap-4">
                  <Avatar name="Админ" className="size-16 text-lg" />
                  <div className="flex gap-2">
                    <Button variant="secondary" icon="upload">
                      Зураг солих
                    </Button>
                    <Button variant="ghost">Устгах</Button>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Нэр">
                    <input defaultValue="Админ" className={inputClass} />
                  </Field>
                  <Field label="Имэйл">
                    <input type="email" defaultValue="admin@example.com" className={inputClass} />
                  </Field>
                  <Field label="Утас">
                    <input defaultValue="+976 9911 2233" className={inputClass} />
                  </Field>
                  <Field label="Хэл">
                    <select className={inputClass} defaultValue="mn">
                      <option value="mn">Монгол</option>
                      <option value="en">English</option>
                    </select>
                  </Field>
                </div>
              </Card>
              <Card title="Нууц үг солих">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Одоогийн нууц үг">
                    <input type="password" className={inputClass} />
                  </Field>
                  <Field label="Шинэ нууц үг">
                    <input type="password" className={inputClass} />
                  </Field>
                  <Field label="Давтах">
                    <input type="password" className={inputClass} />
                  </Field>
                </div>
              </Card>
            </>
          )}

          {section === "platform" && (
            <>
              <Card title="Ерөнхий">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Платформын нэр">
                    <input defaultValue="Movie" className={inputClass} />
                  </Field>
                  <Field label="Дэмжлэгийн имэйл">
                    <input defaultValue="support@example.com" className={inputClass} />
                  </Field>
                  <Field label="Үндсэн валют">
                    <select className={inputClass}>
                      <option>MNT (₮)</option>
                      <option>USD ($)</option>
                    </select>
                  </Field>
                  <Field label="Цагийн бүс">
                    <select className={inputClass}>
                      <option>Asia/Ulaanbaatar (UTC+8)</option>
                    </select>
                  </Field>
                </div>
              </Card>
              <Card title="Горим">
                <ToggleRow
                  title="Засварын горим"
                  desc="Хэрэглэгчдэд түр хаалттай гэсэн хуудас харуулна"
                  checked={toggles.maintenance}
                  onChange={set("maintenance")}
                />
                <ToggleRow
                  title="Шинэ бүртгэл нээх"
                  desc="Шинэ хэрэглэгч бүртгүүлэхийг зөвшөөрөх"
                  checked={toggles.registration}
                  onChange={set("registration")}
                />
              </Card>
            </>
          )}

          {section === "notifications" && (
            <Card title="Имэйл мэдэгдэл">
              <ToggleRow title="Шинэ хэрэглэгч бүртгүүлэхэд" checked={toggles.emailNewUser} onChange={set("emailNewUser")} />
              <ToggleRow title="Төлбөр амжилтгүй болоход" checked={toggles.emailPayment} onChange={set("emailPayment")} />
              <ToggleRow title="Долоо хоногийн тайлан" checked={toggles.emailReport} onChange={set("emailReport")} />
              <ToggleRow
                title="Мэдэгдэгдсэн сэтгэгдэл (push)"
                desc="Хэрэглэгч сэтгэгдэл мэдэгдэхэд шууд мэдэгдэл авах"
                checked={toggles.pushFlagged}
                onChange={set("pushFlagged")}
              />
            </Card>
          )}

          {section === "security" && (
            <>
              <Card title="Нэвтрэлт">
                <ToggleRow
                  title="Хоёр шатлалт баталгаажуулалт (2FA)"
                  desc="Нэвтрэх бүрт нэг удаагийн код шаардана"
                  checked={toggles.twoFA}
                  onChange={set("twoFA")}
                />
                <ToggleRow
                  title="15 минут идэвхгүй бол түгжих"
                  checked={toggles.sessionLock}
                  onChange={set("sessionLock")}
                />
              </Card>
              <Card title="Идэвхтэй сессүүд">
                <ul className="divide-y divide-zinc-800/70">
                  {[
                    { device: "Chrome · Windows", place: "Улаанбаатар", when: "Одоо", current: true },
                    { device: "Safari · iPhone", place: "Улаанбаатар", when: "2 цаг өмнө", current: false },
                  ].map((s) => (
                    <li key={s.device} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="text-sm text-zinc-200">
                          {s.device}
                          {s.current && <span className="ml-2 text-xs text-emerald-400">Энэ төхөөрөмж</span>}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {s.place} · {s.when}
                        </p>
                      </div>
                      {!s.current && <Button variant="ghost">Гаргах</Button>}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="border-red-500/30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-red-400">Аюултай бүс</p>
                    <p className="text-sm text-zinc-400">Бүх төхөөрөмжөөс нэг дор гарах</p>
                  </div>
                  <Button variant="secondary" icon="logout" className="text-red-400">
                    Бүгдээс гарах
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-zinc-300">{label}</span>
      {children}
    </label>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-800/70 py-3.5 last:border-0">
      <div>
        <p className="text-sm text-zinc-200">{title}</p>
        {desc && <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
