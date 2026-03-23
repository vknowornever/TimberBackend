import mongoose, { Schema, Document, Types } from "mongoose";

interface IWorker {
  name: string;
  phone: string;
  isCarpenter: boolean;
}

interface IMeasurement {
  name: string;
  length: number;
  breadth: number;
  thickness: number;
}

export interface IJobCard extends Document {
  project: Types.ObjectId;
  productName: string;
  description: string;
  quantity: number;
  woodType: string;
  status: string;
  siteLocation: string;
  workers: IWorker[];
  onsiteMeasurement: IMeasurement[];
  carpenterCharges: number;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  referenceImages: string[];
}

const jobCardSchema = new Schema<IJobCard>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },

    productName: { type: String, required: true },
    description: String,
    quantity: Number,
    woodType: String,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
      index: true
    },

    siteLocation: String,

    workers: [
      {
        name: String,
        phone: String,
        isCarpenter: Boolean
      }
    ],

    onsiteMeasurement: [
      {
        name: String,
        length: Number,
        breadth: Number,
        thickness: Number
      }
    ],

    carpenterCharges: Number,

    startDate: Date,
    endDate: Date,
    dueDate: Date,

    referenceImages: [String]
  },
  { timestamps: true }
);

export default mongoose.model<IJobCard>("JobCard", jobCardSchema);