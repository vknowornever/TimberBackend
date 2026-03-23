import mongoose, { Schema, Document } from "mongoose";
export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdDate: Date;
}
const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }
});
export default mongoose.model<ICustomer>("Customer", customerSchema);
