import mongoose from 'mongoose';

const bargainSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  title: {
    type: String, // Corrected to use String directly
    ref: 'Product', // Reference to the Product model
  },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

const Bargain = mongoose.model('Bargain', bargainSchema);

export default Bargain;
