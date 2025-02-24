import { AllCarsModel } from "../modules/allCarsModule.js";

export const getAllCars = async (req, res) => {
  try {
    const cars = await AllCarsModel.find();
    res.json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const searchCars = async (req, res) => {
  try {
    const { brand } = req.query;
    let filter = {};

    if (brand) {
      filter.brand = { $regex: brand, $options: "i" }; // Büyük/küçük harf duyarsız arama
    }

    const cars = await AllCarsModel.find(filter);
    if (cars.length === 0) {
      return res
        .status(404)
        .json({ error: "No cars found with the specified criteria" });
    }
    res.json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const getByid = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await AllCarsModel.findById(id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const deleteByid = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await AllCarsModel.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const addCars = async (req, res) => {
  try {
    const carsArray = req.body;

    if (!Array.isArray(carsArray)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Expected an array of objects." });
    }

    // Her bir elemanın geçerli bir araba objesi olup olmadığını kontrol et
    // for (const car of carsArray) {
    //   if (!car.brand || !car.model || !car.year) {
    //     return res
    //       .status(400)
    //       .json({ error: "Invalid car object in the array" });
    //   }
    // }

    const insertedCars = await AllCarsModel.insertMany(carsArray);
    res
      .status(201)
      .json({ message: "Cars added successfully", data: insertedCars });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
