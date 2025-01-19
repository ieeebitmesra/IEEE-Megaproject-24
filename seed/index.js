const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const initReviews = require("./sampleReviews.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//! Making a connection with MongoDB database
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//! Initializing Sample Data
// const initDB = async () => {
//   await Listing.deleteMany({}); //* Deleting existing data
//   await Listing.insertMany(initData.data); //* Initializing new data
//   console.log("data was initialized");
// };

// initDB();

//! Initializing Sample Reviews
const initDBR = async () => {
  try {
    // Find the listing document by ID
    let listing = await Listing.findById("677e65511fa0832120dc928c");

    if (!listing) {
      console.log("Listing not found");
      return;
    }

    // Clear the existing reviews array
    listing.reviews = [];
    await listing.save();

    // Loop through the new reviews and add them
    for (const review of initReviews.reviews) {
      let newReview = new Review(review); // Create a new review document
      listing.reviews.push(newReview); // Add the new review to the listing's reviews array
      await newReview.save(); // Save the review to the database
    }

    // Save the updated listing with the new reviews
    await listing.save();

    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDBR(); // Rviews
