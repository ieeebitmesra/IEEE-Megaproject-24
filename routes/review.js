const express = require("express");
const router = express.Router({ mergeParams: true }); // It merges parent parameters with child parameters.
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//! Validation for reviewSchema (Joi) (Server Side Validation)
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//! Reviews Route (step - 2)
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview); // Pushing new reviews

    await newReview.save(); // Saving new array
    await listing.save(); // Updating an existing listing
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  })
);

//! Delete Review Route
//* $pull: The $pull operator removes all instances of a value or values from an existing array that match a specified condition.
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    /**
     * Find a listing document in the database by its unique ID (id)
     * and update it by removing a specific review ID (reviewId) from its "reviews" array.
     * The $pull operator is used to remove the reviewId from the "reviews" array field of the document.
     */
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
