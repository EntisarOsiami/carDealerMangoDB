import mongoose, { Mongoose,Schema } from "mongoose";
export interface Car {
  dealerId: string;
  carMakerId: string;
  name: string;
  price: string;
  year: Date;
  color: string;
  wheelsCount: number;

}

export const carSchema = new Schema<Car>({
  dealerId: { type: String, required: true },
  carMakerId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  year: { type: Date, required: true },
  color: { type: String, required: true },
  wheelsCount: { type: Number},

}, {
  timestamps: true,
  versionKey: false
});

const carCollection =mongoose.model<Car>('Car', carSchema);
export default carCollection;