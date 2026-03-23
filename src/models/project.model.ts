import mongoose, { Schema, Document, Types } from "mongoose";
export interface IProject extends Document {
  customer: Types.ObjectId;
  projectName: string;
  description: string;
}
const projectSchema = new Schema<IProject>({
  customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
  projectName: { type: String, required: true },
  description: String
}, { timestamps: true });
export default mongoose.model<IProject>("Project", projectSchema);
