"use server";

import { isValidObjectId } from "mongoose";
import { refresh } from "next/cache";
import { FORBIDDEN_MESSAGE, authorize, logAudit } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { CONTENT_STATUSES, CONTENT_TYPES, Movie } from "@/lib/models/movie";

export type ActionResult = { error?: string; ok?: boolean };
export type MovieFormState = ActionResult;

function parseMovie(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const type = String(formData.get("type") ?? "Кино") as (typeof CONTENT_TYPES)[number];
  const genre = String(formData.get("genre") ?? "").trim();
  const yearRaw = String(formData.get("year") ?? "").trim();
  const year = yearRaw ? Number(yearRaw) : undefined;
  const duration = String(formData.get("duration") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title) return { error: "Нэр оруулна уу" } as const;
  if (title.length > 200) return { error: "Нэр хэт урт байна" } as const;
  if (!CONTENT_TYPES.includes(type)) return { error: "Төрөл буруу байна" } as const;
  if (year !== undefined && (!Number.isInteger(year) || year < 1900 || year > 2100))
    return { error: "Он 1900–2100 хооронд байна" } as const;

  return { data: { title, type, genre, year, duration, description } } as const;
}

export async function saveMovie(_prev: MovieFormState, formData: FormData): Promise<MovieFormState> {
  const admin = await authorize("content.edit");
  if (!admin) return { error: FORBIDDEN_MESSAGE };

  const id = String(formData.get("id") ?? "");
  const parsed = parseMovie(formData);
  if ("error" in parsed) return { error: parsed.error };

  await connectDB();
  if (id) {
    if (!isValidObjectId(id)) return { error: "Контент олдсонгүй" };
    const updated = await Movie.findByIdAndUpdate(id, parsed.data, { runValidators: true });
    if (!updated) return { error: "Контент олдсонгүй" };
    await logAudit(admin, "Контент засварласан", parsed.data.title);
  } else {
    await Movie.create({ ...parsed.data, status: "draft" });
    await logAudit(admin, "Контент нэмсэн", parsed.data.title);
  }

  refresh();
  return { ok: true };
}

export async function setMovieStatus(id: string, status: string): Promise<ActionResult> {
  const admin = await authorize(status === "published" ? "content.publish" : "content.edit");
  if (!admin) return { error: FORBIDDEN_MESSAGE };
  if (!isValidObjectId(id) || !CONTENT_STATUSES.includes(status as (typeof CONTENT_STATUSES)[number])) {
    return { error: "Буруу хүсэлт" };
  }

  await connectDB();
  const movie = await Movie.findByIdAndUpdate(id, { status });
  if (!movie) return { error: "Контент олдсонгүй" };
  await logAudit(admin, "Контентын төлөв өөрчилсөн", `${movie.title} → ${status}`);
  refresh();
  return { ok: true };
}

export async function deleteMovie(id: string): Promise<ActionResult> {
  const admin = await authorize("content.delete");
  if (!admin) return { error: FORBIDDEN_MESSAGE };
  if (!isValidObjectId(id)) return { error: "Буруу хүсэлт" };

  await connectDB();
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) return { error: "Контент олдсонгүй" };
  await logAudit(admin, "Контент устгасан", movie.title);
  refresh();
  return { ok: true };
}
