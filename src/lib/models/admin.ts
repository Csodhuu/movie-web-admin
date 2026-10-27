import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { ROLES } from "../permissions";

const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, required: true, default: "Дэмжлэг" },
    twoFA: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    lastActiveAt: { type: Date },
  },
  { timestamps: true },
);

export type AdminDoc = InferSchemaType<typeof adminSchema>;

export const Admin: Model<AdminDoc> = models.Admin ?? model("Admin", adminSchema);
