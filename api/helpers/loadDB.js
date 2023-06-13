import Publisher from "../models/publisherModel.js";
import data from "../../data.json" assert { type: "json" };

export const loadDB = async () => {
  try {
    const acevedo = await Publisher.findOne({ lastName: "Acevedo" });
    if (!acevedo) {
      await Publisher.insertMany(data);
      console.log("Exito");
    } else {
      console.log("Los datos ya estaban cargados!");
    }
  } catch (error) {
    console.error(error.message);
  }
};
