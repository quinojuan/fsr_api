import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import publisherRoutes from "./routes/publisherRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import queryStrings from "./routes/queryStrings.js";
import { loadDB } from "./helpers/loadDB.js";

const port = 3001;
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/publisher", publisherRoutes);
app.use("/queryroutes", queryRoutes);
app.use("/querystrings", queryStrings);

app.get("/", (req, res) => {
  res.send("Hola desde el backend!");
});

app.listen(port, () => {
  connectDB();
  loadDB();
  console.log("App is listening on port 3001!");
});
