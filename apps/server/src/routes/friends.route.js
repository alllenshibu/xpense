const express = require('express');
const router = express.Router();

const {
  getStatusController,
  sendFriendRequestController,
  canelFriendRequestController,
  unfriendController,
  getFriendsController,
  getRequestsController,
} = require('../controller/friendship.controller.js');

router.post('/getStatus', getStatusController);

router.post('/send', sendFriendRequestController);

router.post('/cancel', canelFriendRequestController);

router.post('/unfriend', unfriendController);

router.get('/getFriends/:username', getFriendsController);

router.get('/getRequests/:username', getRequestsController);


module.exports = router;
