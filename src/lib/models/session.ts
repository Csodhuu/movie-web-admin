import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

// Cookie-д санамсаргүй token хадгалж, өгөгдлийн санд зөвхөн түүний SHA-256 hash-ийг хадгална.
// Ингэснээр сессийг серверээс цуцлах ("Бүгдээс гарах") боломжтой.
const sessionSchema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true, index: true },
    userAgent: { type: String },
    ip: { type: String },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

// Хугацаа дууссан сессийг MongoDB автоматаар устгана
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type SessionDoc = InferSchemaType<typeof sessionSchema>;

export const Session: Model<SessionDoc> = models.Session ?? model("Session", sessionSchema);
