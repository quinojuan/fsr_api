import express from "express";
import Publisher from "../models/publisherModel.js";
import {
  getAllPublishers,
  getResume,
  postPublisher,
  updatePublisher,
  updateServiceReport,
} from "../controllers/index.js";

const router = express.Router();

router.post("/", postPublisher);
router.get("/allpublishers", getAllPublishers);
router.put("/update/:id", updatePublisher);
router.put("/servicereport/:id", updateServiceReport);
router.get("/resume", getResume);

export default router;
