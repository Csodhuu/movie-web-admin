"use client";

import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  IconButton,
  PageHeader,
  Table,
  Td,
  inputClass,
  type BadgeTone,
} from "@/components/admin";
import { Icon } from "@/components/icons";
import { admins as initialAdmins, roles } from "@/lib/mock-data";

const roleTone: Record<string, BadgeTone> = {
  "Super Admin": "red",
  "Контент менежер": "purple",
  Модератор: "blue",
  Санхүү: "green",
  Дэмжлэг: "gray",
};

export function AdminsManager() {
  const [items, setItems] = useState(initialAdmins);
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Админууд"
        description="Удирдлагын эрхтэй ажилтнууд болон тэдний үүрэг"
        actions={
          <Button icon="plus" onClick={() => setInviteOpen(true)}>
            Админ урих
          </Button>
        }
      />

      <Card title={`Ажилтнууд (${items.length})`}>
        <Table head={["Нэр", "Үүрэг", "2FA", "Сүүлд идэвхтэй", ""]}>
          {items.map((a) => (
            <tr key={a.id} className="hover:bg-zinc-900/60">
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} />
                  <div>
                    <p className="font-medium text-zinc-100">{a.name}</p>
                    <p className="text-xs text-zinc-500">{a.email}</p>
                  </div>
                </div>
              </Td>
              <Td>
                <Badge tone={roleTone[a.role] ?? "gray"}>{a.role}</Badge>
              </Td>
              <Td>
                {a.twoFA ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Icon name="shield" className="size-4" /> Идэвхтэй
                  </span>
                ) : (
                  <span className="text-amber-400">Идэвхгүй</span>
                )}
              </Td>
              <Td className="text-zinc-500">{a.lastActive}</Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="edit" label="Засах" />
                  {a.role !== "Super Admin" && (
                    <IconButton
                      icon="trash"
                      label="Хасах"
                      className="hover:text-red-400"
                      onClick={() => setItems((prev) => prev.filter((x) => x.id !== a.id))}
                    />
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>

      {inviteOpen && (
        <InviteModal
          onClose={() => setInviteOpen(false)}
          onInvite={(name, email, role) => {
            setItems((prev) => [
              ...prev,
              { id: Date.now(), name, email, role, lastActive: "Урилга илгээсэн", twoFA: false },
            ]);
            setInviteOpen(false);
          }}
        />
      )}
    </>
  );
}

function InviteModal({
  onClose,
  onInvite,
}: {
  onClose: () => void;
  onInvite: (name: string, email: string, role: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[1].name);
  const valid = name.trim() && email.includes("@");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="invite-title" className="text-lg font-semibold text-white">
            Админ урих
          </h2>
          <IconButton icon="x" label="Хаах" onClick={onClose} />
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) onInvite(name.trim(), email.trim(), role);
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-zinc-300">Нэр</span>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-zinc-300">Имэйл</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={inputClass}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-zinc-300">Үүрэг</span>
            <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
              {roles.map((r) => (
                <option key={r.name}>{r.name}</option>
              ))}
            </select>
          </label>
          <p className="text-xs text-zinc-500">Урилгын холбоос имэйлээр очих бөгөөд 48 цагийн дотор хүчинтэй.</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose}>
              Болих
            </Button>
            <Button type="submit" disabled={!valid}>
              Урилга илгээх
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
