const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://lovelymeregis.co.uk/images/gallery/marineparade-sunrise-lyme.jpg",
    set: (v) =>
      v === ""
        ? "https://lovelymeregis.co.uk/images/gallery/marineparade-sunrise-lyme.jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  // Establishing a one-to-many relationship with the "Review" model
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//! Middleware to delete reviews when a listing is deleted.
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
