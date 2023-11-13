const {
  getAllFriendRequestsService,
  sendNewFriendRequestService,
} = require('../services/friend.service');
const {
  UserDoesNotExistError,
  RequestedUserDoesNotExistError,
  DuplicateFriendRequestError,
} = require('../utils/errors');

const getAllFriendRequestsController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const friendRequests = await getAllFriendRequestsService({ user });

    if (!friendRequests) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ friendRequests: friendRequests });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

const sendNewFriendRequestController = async (req, res) => {
  const user = req?.user;
  const requestedUser = req?.body?.friend?.email;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
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
    const friendRequest = await sendNewFriendRequestService({ user, requestedUser });

    if (!friendRequest) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ friendRequest: friendRequest });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    else if (err instanceof RequestedUserDoesNotExistError)
      return res.status(404).json({ message: err.message });
    else if (err instanceof DuplicateFriendRequestError)
      return res.status(409).json({ message: err.message });
    else return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAllFriendRequestsController,
  sendNewFriendRequestController,
};
