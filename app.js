//! Requiring Imp packages & files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

//! Setting View Engine
app.set("view engine", "ejs"); //? Setting the view engine to EJS
app.set("views", path.join(__dirname, "views")); //? Setting the views directory

//! Setting EJS-Mate
app.engine("ejs", ejsMate); //? Setting the ejs-mate as the engine for EJS

//! Parseing the data present in request
app.use(express.urlencoded({ extended: true })); //? This is used to parse the data present in the request body and convert it into an object.

//! Setting method-override
app.use(methodOverride("_method")); //? This is used to override the method of the form. We are using this to override the POST method to PUT and DELETE.

//! Serving Static Files
app.use(express.static(path.join(__dirname, "public"))); //? This is used to serve the static files present in the public directory.

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Exprie is set for next 7 days from now
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Used to prevent cross scripting attack
  },
};

//! Root API
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // Success is a array
  next();
});

//! Routes all requests to '/listings' to the 'listings' router
app.use("/listings", listings);

//! Routes all requests to '/listings/:id/reviews' to the 'reviews' router
app.use("/listings/:id/reviews", reviews);

//! Custom Error for Invaild Request
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!")); // 404 is for "Page not found"
});

//! Error handeling middelware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message }); // We generally prefer to show only the message to the user, rather than indicating where the error occurred
});

//! Creating a port for listening requests
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
