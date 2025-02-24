import { Schema, model } from "mongoose";

const homeSchema = new Schema({
  brand: { type: String, required: true },
  image: { type: String, required: true },
});
export const HomeModel = model("Home", homeSchema);
