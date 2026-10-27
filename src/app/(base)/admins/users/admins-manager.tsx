"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Field,
  IconButton,
  PageHeader,
  Table,
  Td,
  cn,
  inputClass,
  type BadgeTone,
} from "@/components/admin";
import { Modal } from "@/components/admin-client";
import { Icon } from "@/components/icons";
import type { AdminDTO } from "@/lib/data/admins";
import { ROLE_INFO as roles } from "@/lib/permissions";
import { createAdmin, deleteAdmin, setAdminDisabled, updateAdmin, type ActionResult } from "./actions";

const roleTone: Record<string, BadgeTone> = {
  "Super Admin": "red",
  "Контент менежер": "purple",
  Модератор: "blue",
  Санхүү: "green",
  Дэмжлэг: "gray",
};

export function AdminsManager({ admins }: { admins: AdminDTO[] }) {
  // null = хаалттай, "new" = шинэ, AdminDTO = засах
  const [editing, setEditing] = useState<AdminDTO | "new" | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function run(id: string, fn: () => Promise<ActionResult>) {
    setPendingId(id);
    setError(null);
    startTransition(async () => {
      try {
        const res = await fn();
        if (res.error) setError(res.error);
      } catch {
        setError("Алдаа гарлаа. Дахин оролдоно уу.");
      } finally {
        setPendingId(null);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Админ хэрэглэгчид"
        description="Удирдлагын эрхтэй ажилтнууд болон тэдний үүрэг"
        actions={
          <Button icon="plus" onClick={() => setEditing("new")}>
            Админ нэмэх
          </Button>
        }
      />

      {error && (
        <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <Card title={`Ажилтнууд (${admins.length})`}>
        <Table head={["Нэр", "Үүрэг", "Төлөв", "2FA", "Сүүлд нэвтэрсэн", ""]}>
          {admins.map((a) => (
            <tr key={a.id} className={cn("hover:bg-zinc-900/60", pendingId === a.id && "opacity-50")}>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} />
                  <div>
                    <p className="font-medium text-zinc-100">
                      {a.name}
                      {a.isSelf && <span className="ml-2 text-xs font-normal text-zinc-500">(та)</span>}
                    </p>
                    <p className="text-xs text-zinc-500">{a.email}</p>
                  </div>
                </div>
              </Td>
              <Td>
                <Badge tone={roleTone[a.role] ?? "gray"}>{a.role}</Badge>
              </Td>
              <Td>{a.disabled ? <Badge>Идэвхгүй</Badge> : <Badge tone="green">Идэвхтэй</Badge>}</Td>
              <Td>
                {a.twoFA ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Icon name="shield" className="size-4" /> Идэвхтэй
                  </span>
                ) : (
                  <span className="text-zinc-500">Идэвхгүй</span>
                )}
              </Td>
              <Td className="whitespace-nowrap text-zinc-500">{a.lastActive}</Td>
              <Td>
                <div className="flex justify-end gap-0.5">
                  <IconButton icon="edit" label="Засах" onClick={() => setEditing(a)} />
                  {!a.isSelf && (
                    <>
                      <IconButton
                        icon={a.disabled ? "check" : "ban"}
                        label={a.disabled ? "Идэвхжүүлэх" : "Идэвхгүй болгох"}
                        disabled={pendingId === a.id}
                        onClick={() => run(a.id, () => setAdminDisabled(a.id, !a.disabled))}
                      />
                      <IconButton
                        icon="trash"
                        label="Устгах"
                        className="hover:text-red-400"
                        disabled={pendingId === a.id}
                        onClick={() => {
                          if (confirm(`"${a.name}" админыг устгах уу? Энэ үйлдлийг буцаах боломжгүй.`)) {
                            run(a.id, () => deleteAdmin(a.id));
                          }
                        }}
                      />
                    </>
                  )}
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>

      {editing && (
        <AdminFormModal
          key={editing === "new" ? "new" : editing.id}
          admin={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}

function AdminFormModal({ admin, onClose }: { admin: AdminDTO | null; onClose: () => void }) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(admin ? updateAdmin : createAdmin, {});

  useEffect(() => {
    if (state.ok) onClose();
  }, [state.ok, onClose]);

  return (
    <Modal title={admin ? "Админ засах" : "Админ нэмэх"} onClose={onClose}>
      <form action={formAction} className="space-y-4">
        {admin && <input type="hidden" name="id" value={admin.id} />}
        {state.error && (
          <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {state.error}
          </div>
        )}
        <Field label="Нэр">
          <input name="name" required autoFocus defaultValue={admin?.name} className={inputClass} />
        </Field>
        <Field label="Имэйл">
          {admin ? (
            <input value={admin.email} disabled className={cn(inputClass, "opacity-60")} />
          ) : (
            <input name="email" type="email" required placeholder="name@example.com" className={inputClass} />
          )}
        </Field>
        <Field label="Үүрэг">
          <select name="role" defaultValue={admin?.role ?? roles[1].name} className={inputClass}>
            {roles.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name} — {r.description}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label={admin ? "Шинэ нууц үг (заавал биш)" : "Эхний нууц үг"}
          hint={admin ? "Хоосон орхивол нууц үг өөрчлөгдөхгүй" : "8-аас дээш тэмдэгт. Шинэ админд өөрөө дамжуулна уу."}
        >
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required={!admin}
            minLength={8}
            className={inputClass}
          />
        </Field>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Болих
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Хадгалж байна..." : admin ? "Хадгалах" : "Нэмэх"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
