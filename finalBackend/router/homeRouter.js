import express from "express";
import {
  addHome,
  getAllHome,
  getByid,
  updateHome,
} from "../controller/homeController.js";
// conreollerden evvel bu yazilir

export const homeRoutes = express.Router();
homeRoutes.get("/", getAllHome);
homeRoutes.get("/:id", getByid);
homeRoutes.post("/add", addHome);
homeRoutes.put("/update/:id", updateHome);
