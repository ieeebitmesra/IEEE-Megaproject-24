import express from "express"
import { isWholeseller, requireSignIn } from "../middlewares/authMiddleware.js"
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getsingleProductController, productFilterController, productPhotoController, searchProductController, updateProductController } from "../controllers/productController.js"
import formidable from "express-formidable"
import braintree from "braintree"
 
const router = express.Router()

router.post('/create-Product', formidable(), createProductController)
router.put('/update-Product/:pid', isWholeseller, formidable(), updateProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getsingleProductController)

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFilterController)

router.get("/search/:keyword", searchProductController)

//payments routes
//token
router.get('/braintree/token', braintreeTokenController)

//payments
router.post('/braintree/payments',requireSignIn,braintreePaymentController)
router.post('/orders',braintreePaymentController)

export default router