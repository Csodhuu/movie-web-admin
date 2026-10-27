import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, EmptyState } from "@/components/admin";
import { listMovies } from "@/lib/data/movies";
import { ContentManager } from "./content-manager";

export const metadata: Metadata = { title: "Кино" };

export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesSkeleton />}>
      <MoviesData />
    </Suspense>
  );
}

async function MoviesData() {
  const movies = await listMovies();
  if (!movies) {
    return (
      <Card>
        <EmptyState icon="lock" title="Энэ хуудсыг харах эрх хүрэлцэхгүй байна" desc="Super Admin-аас эрх хүсэнэ үү" />
      </Card>
    );
  }
  return <ContentManager movies={movies} />;
}

function MoviesSkeleton() {
  return (
    <>
      <div className="mb-6 h-12 w-64 animate-pulse rounded-lg bg-zinc-900" />
      <Card>
        <div className="space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-zinc-900" />
          ))}
        </div>
      </Card>
    </>
  );
}
