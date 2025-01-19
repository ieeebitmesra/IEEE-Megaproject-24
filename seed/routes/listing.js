const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

//! Validation for listingSchema (Joi) (Server Side Validation)
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//! Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//! New Route (Create - 1)
/**
 * This route renders a form to create a new listing.
 *
 * Note: If you place this route after the show route, it will give an error.
 * This is because the show route (`/listings/:id`) will match any route with the pattern `/listings/someId`,
 * including `/listings/new`. As a result, the show route will try to find a listing with the ID "new",
 * which will not exist, leading to an error.
 */
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//! Show Route (Read)
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params; //? This is used to get the id from the URL.
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

//! Create Route (Create - 2)
router.post(
  "/",
  // First, validateListing will be executed, followed by wrapAsync.
  validateListing, // This middleware is used for schema validation (server-side validation)
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//! Edit Route (Update - 1)
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//! Update Route (Update - 2)
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //? Here, we are using spread operator to get the updated data from the form.
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//! Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); //* Whenever findByIdAndDelete(id) is called, our post middleware will be executed.
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
