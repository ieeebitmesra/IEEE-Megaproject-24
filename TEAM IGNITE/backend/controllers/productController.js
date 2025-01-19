import { response } from "express";
import productmodel from "../models/productmodel.js";
import fs from "fs";
import slugify from "slugify";
import orderModel from "../models/orderModel.js";
import braintree  from "braintree";



var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "xh46vkzbjc9gtwsy ",
  publicKey: "q8zsm5yzvpd7r38z",
  privateKey: "825bdfbd4cb2d19d94314c698dbe8822",
});

export const createProductController = async (req, res) => {
  try {
    const {
      category,
      userID,
      title,
      price,
      quantity,
      date,
      discription,
      address,
      state,
      district,
    } = req.fields;
    const { image } = req.files;

    //alidation
    switch (true) {
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !date:
        return res.status(500).send({ error: "date is Required" });
      case image && image.size > 10000000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      case !discription:
        return res.status(500).send({ error: "discription is Required" });

      case !address:
        return res.status(500).send({ error: "address is Required" });

      case !state:
        return res.status(500).send({ error: "state is Required" });

      case !district:
        return res.status(500).send({ error: "district is Required" });
    }

    // const product = await productmodel.findById(req.params.pid);
    // const userID = product.userID;
    // userID: req.body.userID

    const products = new productmodel({ ...req.fields, slug: slugify(title) });
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productmodel
      .find({})
      // .populate("userID")
      .populate("category")
      .select("-image")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All products",
      products,
    });
    res.status();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product",
    });
  }
};

export const getsingleProductController = async (req, res) => {
  try {
    const product = await productmodel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single producted fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.pid);

    if (product) {
      // Check if the product has an image
      if (product.image && product.image.data) {
        // Set the content type and send the image data
        res.set("content-type", product.image.contentType);
        return res.status(200).send(product.image.data);
      } else {
        // The product does not have an image, so send a default image
        res.set("content-type", "image/png");
        return res.status(200).send(defaultImageData);
      }
    } else {
      // The product does not exist, so send a 404 error
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in getting product photo" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productmodel.findByIdAndDelete(req.params.pid).select("-image");
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting photo",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const {
      category,
      userID,
      title,
      slug,
      price,
      quantity,
      date,
      discription,
      address,
      state,
      district,
    } = req.fields;
    const { image } = req.files;
    //alidation
    switch (true) {
      case !category:
        return res.status(500).send({ error: "category is Required" });
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !date:
        return res.status(500).send({ error: "date is Required" });
      case image && image.size > 10000000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
      case !discription:
        return res.status(500).send({ error: "discription is Required" });

      case !address:
        return res.status(500).send({ error: "address is Required" });

      case !state:
        return res.status(500).send({ error: "state is Required" });

      case !district:
        return res.status(500).send({ error: "district is Required" });
    }

    const products = await productmodel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (image) {
      products.image.data = fs.readFileSync(image.path);
      products.image.contentType = image.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update product",
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    const products = await productmodel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while filtering products",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productmodel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { discription: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");
    res.json(result);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error in finding the product",
    });
  }
};

//payment gateway API
//token
export const braintreeTokenController = async(req,res) =>{
  try {
    gateway.clientToken.generate({}, function(err, response){
        if(err){
          res.status(500).send(err);

        }else{
          res.send(response);
        }
    })
  } catch (error) {
    console.log(error);
  }
}

//payment
export const braintreePaymentController = async(req,res) => {
    try {
      const {cart, nonce}=req.body
      let total = 0
      cart.map((i)=> {total += i.price});

      let newTransaction = gateway.transaction.sale({
        amount:total,
        paymentMethodNonce:nonce,
        options:{
          submitForSettlement:true
        }
      },
        function(error,result){
          if(result){
            const order = new orderModel({
              products:cart,
              payment:result,
              buyer: req.user._id
            }).save()
            res.json({ok:true})
          } else{
            res.status(500).send(error)
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
}