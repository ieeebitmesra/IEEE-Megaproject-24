import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.ObjectId,
      ref: 'Category',
      required: true,
    },

    userID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],

    title: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
    },

    price: {
      type: Number,
    },

    quantity: {
      type: Number,
    },
    date: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },

    description: {
      type: String,
    },

    address: {
      type: String,
    },
    state: {
      type: String,
    },
    district: {
      type: String,
    },
    // Add a reference to the Bargain model
    bargains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bargain' }],
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);