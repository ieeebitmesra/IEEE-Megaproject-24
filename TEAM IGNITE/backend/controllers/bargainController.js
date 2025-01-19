// bargainController.js
import express from 'express';
import bodyParser from 'body-parser';
import Bargain from '../models/bargain.model.js'; // Adjust the path as needed
import Product from '../models/productmodel.js';


const bargainRouter = express.Router();
bargainRouter.use(bodyParser.json());

// Function to handle bargain requests
// Function to handle bargain requests
export const handleBargainRequest = async (req, res) => {
    const { price } = req.body;
    const { productId } = req.params;

    try {
        // Fetch the product title from the database using productId
        const product = await Product.findById(productId);
        const title = product.title;

        // Save the bargain request to the database
        const bargain = new Bargain({
            productId,
            price,
            title,
            status: 'pending', // 'pending', 'accepted', or 'rejected'
        });

        await bargain.save();

        // Notify the farmer or perform other necessary actions

        const notificationMessage = 'Bargain request sent successfully.';

        return res.status(200).json({ message: notificationMessage, bargain });
    } catch (error) {
        console.error('Error sending bargain request:', error);
        return res.status(500).send(error.message);
    }
};



// Function to handle farmer's response to a bargain request
export const respondToBargain = async (req, res) => {
    const { status } = req.body;
    const { bargainId } = req.params;

    try {
        // Update the status of the bargain request in the database
        const updatedBargain = await Bargain.findByIdAndUpdate(bargainId, { status }, { new: true });
       
        // Notify the wholesaler or perform other necessary actions
        // (You might want to implement web sockets for real-time notifications)

        let notificationMessage = '';

        if (status === 'accepted') {
            notificationMessage = 'Bargain accepted! You can proceed with the purchase.';
        } else if (status === 'rejected') {
            notificationMessage = 'Bargain rejected. The original price remains.';
        }

        return res.status(200).json({ message: notificationMessage, updatedBargain });
    } catch (error) {
        console.error('Error responding to bargain request:', error);
        return res.status(500).send(error.message);
    }
};




// Controller function to    all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Map over products to include the ID in each item
    const productsWithId = products.map(product => ({
      ...product.toObject(),
      productId: product._id, // Include the product ID in the response
    }));

    // Return the list of products with IDs as JSON
    res.status(200).json({ products: productsWithId });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getAllBargainRequests = async (req, res) => {
    try {
      // Fetch all bargain requests from the database
      const allBargainRequests = await Bargain.find();
  
      res.status(200).json({ bargainRequests: allBargainRequests });
    } catch (error) {
      console.error('Error fetching bargain requests:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  




bargainRouter.route('/:productId').post(handleBargainRequest);
bargainRouter.route('/respond/:bargainId').post(respondToBargain);

export default bargainRouter;
