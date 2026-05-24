import { Schema, model, models, Document } from "mongoose";

export enum ManuscriptStatus {
  NEW = "NEW",
  IN_REVIEW = "IN_REVIEW",
  CONTACTED = "CONTACTED",
  CLOSED = "CLOSED",
}

export interface IManuscript extends Document {
  id: string;
  customerId?: string;
  fullName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  projectTitle: string;
  genre: string;
  message?: string;
  status: ManuscriptStatus;
  createdAt: Date;
}

const manuscriptSchema = new Schema<IManuscript>(
  {
    customerId: { type: String, index: true },
    fullName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    projectTitle: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: Object.values(ManuscriptStatus),
      default: ManuscriptStatus.NEW,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

const ManuscriptModel =
  models.Manuscript || model<IManuscript>("Manuscript", manuscriptSchema);

export { ManuscriptModel };
