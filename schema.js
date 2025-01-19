const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  // Joi ke under ek object aani chahiye jis ka naam hoga "listing"
  listing: Joi.object({
    // joi ke according ek object honi chahiye
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
