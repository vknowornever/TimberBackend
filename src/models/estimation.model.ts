import mongoose, { Schema, Document, Types } from "mongoose";

interface IComponent {
  name: string;
  length: number;
  breadth: number;
  thickness: number;
  quantity: number;
}

interface IProduct {
  productName: string;
  quantity: number;
  length: number;
  breadth: number;
  thickness: number;
  laborCharge: number;
  polishingCharge: number;
  components: IComponent[];
  totalCFT: number;
}

export interface IEstimation extends Document {
  project: Types.ObjectId;
  description: string;
  status: string;
  products: IProduct[];
  transportCharge: number;
  discount: number;
  tax: number;
  attachments: string[];
  additionalNotes: string;
  totalAmount: number; // sent from UI
  overAllTotalCFT : number;
}

const componentSchema = new Schema<IComponent>({
  name: String,
  length: Number,
  breadth: Number,
  thickness: Number,
  quantity: Number
});

const productSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  length: Number,
  breadth: Number,
  thickness: Number,
  laborCharge: Number,
  polishingCharge: Number,
  totalCFT: Number,
  components: [componentSchema]
});

const estimationSchema = new Schema<IEstimation>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },

    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Approved", "Rejected"],
      default: "Draft",
      index: true
    },

    products: [productSchema],

    transportCharge: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },

    attachments: [String],

    additionalNotes: String,

    totalAmount: {
      type: Number,
      required: true // 🔥 now mandatory from UI
    },
    overAllTotalCFT: { type: Number, required: true }
  },
  { timestamps: true }
);

import { Request, Response, NextFunction } from "express";
import Estimation from "../models/estimation.model";

export const getEstimationsByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;

    const estimations = await Estimation.find({
      project: projectId
    })
      .sort({ createdAt: -1 }) // latest first
      .lean();

    res.json({
      success: true,
      count: estimations.length,
      data: estimations
    });
  } catch (error) {
    next(error);
  }
};

export default mongoose.model<IEstimation>(
  "Estimation",
  estimationSchema
);