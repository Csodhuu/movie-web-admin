import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, EmptyState } from "@/components/admin";
import { listAdmins } from "@/lib/data/admins";
import { AdminsManager } from "./admins-manager";

export const metadata: Metadata = { title: "Админууд" };

export default function AdminsPage() {
  return (
    <Suspense fallback={<AdminsSkeleton />}>
      <AdminsData />
    </Suspense>
  );
}

async function AdminsData() {
  const admins = await listAdmins();
  if (!admins) {
    return (
      <Card>
        <EmptyState icon="lock" title="Энэ хуудсыг харах эрх хүрэлцэхгүй байна" desc="Зөвхөн Super Admin админуудыг удирдана" />
      </Card>
    );
  }
  return <AdminsManager admins={admins} />;
}

function AdminsSkeleton() {
  return (
    <>
      <div className="mb-6 h-12 w-64 animate-pulse rounded-lg bg-zinc-900" />
      <Card>
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-zinc-900" />
          ))}
        </div>
      </Card>
    </>
  );
}
