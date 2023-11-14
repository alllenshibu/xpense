const {
  UserDoesNotExistError,
  RequestedUserDoesNotExistError,
  DuplicateFriendRequestError,
} = require('../utils/errors');
const pool = require('../utils/pg');

const getAllFriendRequestsService = async ({ user }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM friend_request WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

    const friendRequests = result?.rows;

    return friendRequests;
  } catch (err) {
    throw err;
  }
};

const sendNewFriendRequestService = async ({ user, requestedUser }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const requestedUserId = await pool.query('SELECT id FROM "user" WHERE email = $1', [
      requestedUser,
    ]);

    if (requestedUserId?.rows?.length === 0) {
      throw new RequestedUserDoesNotExistError('Requested user does not exist');
    }

    let result = await pool.query(
      'SELECT * FROM friend_request WHERE user_id = $1 AND friend_id = $2',
      [userId?.rows[0]?.id, requestedUserId?.rows[0]?.id],
    );

    if (result?.rows?.length > 0) {
      throw new DuplicateFriendRequestError('Friend request already exists');
    }

    result = await pool.query(
      'INSERT INTO friend_request(user_id, friend_id) VALUES($1, $2) RETURNING *',
      [userId?.rows[0]?.id, requestedUserId?.rows[0]?.id],
    );

    const friendRequest = result?.rows;

    return friendRequest;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllFriendRequestsService,
  sendNewFriendRequestService,
};
