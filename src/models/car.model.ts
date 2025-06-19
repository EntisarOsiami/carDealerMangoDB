import mongoose, { Schema, Types } from 'mongoose';

export interface Car {
  dealerId: Types.ObjectId;
  carMakerId: Types.ObjectId;
  name: string;
  price: number;
  year: Date;
  color: string;
  wheelsCount: number;
}

const carSchema = new Schema<Car>(
  {
    dealerId: {
      type: Schema.Types.ObjectId,
      ref: 'CarDealer',
      required: true,
    },
    carMakerId: {
      type: Schema.Types.ObjectId,
      ref: 'CarMaker',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Date, required: true },
    color: { type: String, required: true },
    wheelsCount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const carCollection = mongoose.model<Car>('Car', carSchema);
export default carCollection;
