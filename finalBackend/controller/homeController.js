import { HomeModel } from "../modules/homeModule.js";

// burada getAll getbyid and etc olmalidi
export const getAllHome = async (req, res) => {
  try {
    const cars = await HomeModel.find();
    res.send(cars);
  } catch (error) {
    res.send(error);
  }
};
export const getByid = async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await HomeModel.findById(id);
    res.send(cars);
  } catch (error) {
    res.send(error);
  }
};
export const addHome = async (req, res) => {
  try {
    const { brand, image } = req.body;
    await HomeModel.create({
      brand: brand,
      image: image,
    });
    res.send("Created");
  } catch (error) {
    res.send(error);
  }
};
export const updateHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand, image, description } = req.body;
    await HomeModel.findByIdAndUpdate(id, {
      brand: brand,
      image: image,
      description: description,
    });
    res.send("Update");
  } catch (error) {
    res.send(error);
  }
};
