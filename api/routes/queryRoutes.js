import express from "express";
import { queryData } from "../controllers/index.js";

const router = express.Router();

router.get("/:type", queryData);

export default router;
