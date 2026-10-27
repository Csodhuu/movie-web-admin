import "server-only";
import { authorize } from "../auth";
import { connectDB } from "../db";
import { Movie } from "../models/movie";

export type MovieDTO = {
  id: string;
  title: string;
  type: string;
  genre: string;
  year: number | null;
  duration: string;
  description: string;
  views: number;
  rating: number;
  status: "published" | "draft" | "scheduled" | "archived";
};

/** Client руу дамжуулахад аюулгүй, зөвхөн хэрэгтэй талбаруудтай объект */
function toDTO(m: InstanceType<typeof Movie> | Record<string, unknown>): MovieDTO {
  const d = m as Record<string, unknown>;
  return {
    id: String(d._id),
    title: String(d.title),
    type: String(d.type ?? "Кино"),
    genre: String(d.genre ?? ""),
    year: typeof d.year === "number" ? d.year : null,
    duration: String(d.duration ?? ""),
    description: String(d.description ?? ""),
    views: Number(d.views ?? 0),
    rating: Number(d.rating ?? 0),
    status: (d.status as MovieDTO["status"]) ?? "draft",
  };
}

/** Эрхгүй бол null буцаана */
export async function listMovies(): Promise<MovieDTO[] | null> {
  if (!(await authorize("content.view"))) return null;
  await connectDB();
  const docs = await Movie.find().sort({ createdAt: -1 }).limit(500).lean();
  return docs.map(toDTO);
}
