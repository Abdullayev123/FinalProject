import express from "express";
import {
  addCars,
  getAllCars,
  getByid,
  searchCars,
} from "../controller/allcarsController.js";

// conreollerden evvel bu yazilir

export const allcarsRoute = express.Router();
allcarsRoute.get("/", getAllCars);
allcarsRoute.get("/search", searchCars);
allcarsRoute.get("/:id", getByid);
allcarsRoute.post("/add", addCars);
