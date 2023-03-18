const express = require('express');
const router = express.Router();

const {
  getStatusController,
  sendFriendRequestController,
  canelFriendRequestController,
  unfriendController,
  getFriendsController,
} = require('../controller/friendship.controller.js');

router.post('/getStatus', getStatusController);

router.post('/send', sendFriendRequestController);

router.post('/cancel', canelFriendRequestController);

router.post('/unfriend', unfriendController);

router.post('/getFriends', getFriendsController);

module.exports = router;
