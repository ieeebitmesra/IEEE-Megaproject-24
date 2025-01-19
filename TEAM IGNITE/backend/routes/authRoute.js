import express from "express";
import {
  getOrdersController,
  updateProfileController,
} from "../controllers/authController.js";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import {
  requireSignIn,
  isWholeseller,
  isFarmer,
} from "../middlewares/authMiddleware.js";
import { addproductcontroller } from "../controllers/addproductcontroller.js";

const router = express.Router();
//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

router.get("/FarmerDashboard", requireSignIn, isWholeseller);

router.post("/addProduct", addproductcontroller);

router.get("/user-auth", requireSignIn, isWholeseller, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/wholeseller-auth", requireSignIn, isFarmer, (req, res) => {
  res.status(200).send({ ok: true });
});
router.put("/profile", updateProfileController, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/orders", requireSignIn, getOrdersController);

export default router;
