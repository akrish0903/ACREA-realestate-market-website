const express = require('express');
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const PropertyBidController = require('../controller/PropertyBidController');

// Start a new bidding
router.post('/start-bidding', jwt_verify_token, PropertyBidController.startBidding);

// Place a bid
router.post('/place-bid', jwt_verify_token, PropertyBidController.placeBid);

// Get bidding details for a property
router.get('/property-bids/:propertyId', jwt_verify_token, PropertyBidController.getPropertyBids);

// End bidding (can be called manually or by a scheduler)
router.post('/end-bidding/:propertyId', jwt_verify_token, PropertyBidController.endBidding);

module.exports = router; 