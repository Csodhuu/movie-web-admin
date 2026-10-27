import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const CONTENT_TYPES = ["Кино", "Цуврал", "Баримтат", "Шоу"] as const;
export const CONTENT_STATUSES = ["published", "draft", "scheduled", "archived"] as const;

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: CONTENT_TYPES, default: "Кино" },
    genre: { type: String, default: "" },
    year: { type: Number },
    duration: { type: String, default: "" },
    description: { type: String, default: "" },
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    status: { type: String, enum: CONTENT_STATUSES, default: "draft" },
  },
  { timestamps: true },
);

movieSchema.index({ title: "text" });
movieSchema.index({ status: 1, createdAt: -1 });

export type MovieDoc = InferSchemaType<typeof movieSchema>;

export const Movie: Model<MovieDoc> = models.Movie ?? model("Movie", movieSchema);
