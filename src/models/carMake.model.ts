import mongoose, { Schema } from "mongoose";


export interface carMaker {
  name: string;
  brand: string;

}

const carMakerSchema = new Schema<carMaker>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const carMakerCollection = mongoose.model<carMaker>('CarMaker', carMakerSchema);
export default carMakerCollection;

