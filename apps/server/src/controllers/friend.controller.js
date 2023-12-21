const {
  getAllFriendRequestsService,
  sendNewFriendRequestService,
  getAllFriendsService,
  acceptFriendRequestService,
} = require('../services/friend.service');
const {
  UserDoesNotExistError,
  RequestedUserDoesNotExistError,
  DuplicateFriendRequestError,
  FriendRequestDoesNotExistError,
} = require('../utils/errors');

const getAllFriendRequestsController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const friendRequests = await getAllFriendRequestsService(user);

    if (!friendRequests) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ friendRequests: friendRequests });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

const sendNewFriendRequestController = async (req, res) => {
  const user = req?.user;
  const requestedUser = req?.body?.email;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !requestedUser ||
    requestedUser === '' ||
    requestedUser === undefined ||
    requestedUser === 'undefined' ||
    requestedUser === null
  ) {
    return res.status(400).json({ message: 'Requested user is missing' });
  }

  try {
    const friendRequest = await sendNewFriendRequestService(user, requestedUser);

    if (!friendRequest) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ friendRequest: friendRequest });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else if (err instanceof RequestedUserDoesNotExistError)
      return res.status(404).json({ message: err.message });
    else if (err instanceof DuplicateFriendRequestError)
      return res.status(409).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getAllFriendsController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const friends = await getAllFriendsService({ user });

    if (!friends) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ friends: friends });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

const acceptFriendRequestController = async (req, res) => {
  const user = req?.user;
  const requestedUser = req?.body?.friendId;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!requestedUser || requestedUser === '' || requestedUser === undefined) {
    return res.status(400).json({ message: 'Friend email is missing' });
  }

  try {
    const friend = await acceptFriendRequestService(user, requestedUser);

    if (!friend) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ friend: friend });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else if (err instanceof RequestedUserDoesNotExistError)
      return res.status(404).json({ message: err.message });
    else if (err instanceof FriendRequestDoesNotExistError)
      return res.status(404).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAllFriendRequestsController,
  sendNewFriendRequestController,
  getAllFriendsController,
  acceptFriendRequestController,
};
