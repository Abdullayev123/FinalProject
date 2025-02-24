import { Schema, model } from "mongoose";

const allCarsSchema = new Schema({
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  modelLogo: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  modelImage: [{ type: String, required: true }],
  modelInterior: [{ type: String, required: true }],
  bodyType: { type: String, required: true },
  power: { type: String, required: true },
});
export const AllCarsModel = model("AllCars", allCarsSchema);
