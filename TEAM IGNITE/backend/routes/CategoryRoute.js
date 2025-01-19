import express from "express";
import {isFarmer, isWholeseller,requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/CategoryController.js";

 const router = express.Router()

router.post('/create-category',  createCategoryController) 


router.put('/update-category/:id', isWholeseller,updateCategoryController)

router.get('/get-category',categoryController)

router.get('/single-category/:slug',singleCategoryController)

router.delete('/delete-category/:id', isWholeseller,deleteCategoryController)

export default router