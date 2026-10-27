import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const auditLogSchema = new Schema(
  {
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
    adminName: { type: String, required: true },
    action: { type: String, required: true },
    target: { type: String, default: "" },
    ip: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

auditLogSchema.index({ createdAt: -1 });

export type AuditLogDoc = InferSchemaType<typeof auditLogSchema>;

export const AuditLog: Model<AuditLogDoc> = models.AuditLog ?? model("AuditLog", auditLogSchema);
