import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Todo fue ok");
    })
    .catch((err) => {
      console.log("Hubo un error al conectarnos a la BBDD", { err });
    });
};

export default connectDB;
