import express from "express"
import { getContests } from "../controllers/code.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getAllData } from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/getcontests",getContests);
router.get("/platformData/:id",verifyToken,getAllData);

export default router;