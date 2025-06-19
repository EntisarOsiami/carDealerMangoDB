import mongoose, { Schema } from "mongoose";

export interface carDealer {
  name: string;
  email: string;
  city: String;
}

const carDealerSchema = new Schema<carDealer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const carDealerCollection = mongoose.model<carDealer>('CarDealer', carDealerSchema);
export default carDealerCollection;