// bargainRoutes.js
import express from 'express';
import { getAllBargainRequests, handleBargainRequest, respondToBargain } from '../controllers/bargainController.js';

const bargainRouter = express.Router();

// Endpoint for handling bargain requests
bargainRouter.route('/:productId').post(handleBargainRequest);

// Endpoint for handling the farmer's response to a bargain request
bargainRouter.route('/respond/:bargainId').post(respondToBargain);
bargainRouter.route('/all').get(getAllBargainRequests);


export default bargainRouter;
