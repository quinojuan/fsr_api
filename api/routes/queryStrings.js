import express from "express"
import { queryStrings } from "../controllers/index.js"

const router = express.Router()

router.get("/:type", queryStrings)

export default router