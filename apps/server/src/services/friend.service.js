const {
  UserDoesNotExistError,
  RequestedUserDoesNotExistError,
  DuplicateFriendRequestError,
  FriendRequestDoesNotExistError,
} = require('../utils/errors');
const pool = require('../utils/pg');

const getAllFriendRequestsService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM friend_request WHERE friend_id = $1', [
      userId?.rows[0]?.id,
    ]);

    const friendRequests = result?.rows;

    return friendRequests;
  } catch (err) {
    throw err;
  }
};

const sendNewFriendRequestService = async (user, requestedUser) => {
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

const getAllFriendsService = async ({ user }) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query(
      `SELECT 
                friend_id as "friendId", 
                first_name as "firstName", 
                last_name as "lastName", 
                email 
             FROM 
                friend JOIN "user" 
             ON friend.friend_id = "user".id 
                WHERE user_id = $1  `,
      [userId?.rows[0]?.id],
    );

    const friends = result?.rows;

    return friends;
  } catch (err) {
    throw err;
  }
};

const acceptFriendRequestService = async (user, requestedUser) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const requestedUserId = await pool.query('SELECT id FROM "user" WHERE id = $1', [
      requestedUser,
    ]);

    if (requestedUserId?.rows?.length === 0) {
      throw new RequestedUserDoesNotExistError('Requested user does not exist');
    }

    let result = await pool.query(
      'SELECT * FROM friend_request WHERE friend_id = $1 AND user_id = $2',
      [userId?.rows[0]?.id, requestedUserId?.rows[0]?.id],
    );

    if (result?.rows?.length === 0) {
      throw new FriendRequestDoesNotExistError('Friend request does not exist');
    }

    await pool.query('BEGIN');

    result = await pool.query('DELETE FROM friend_request WHERE friend_id = $1 AND user_id = $2', [
      userId?.rows[0]?.id,
      requestedUserId?.rows[0]?.id,
    ]);

    if (result?.rowCount === 0) {
      throw new Error('Cannot delete friend request');
    }

    // One way
    result = await pool.query('INSERT INTO friend(user_id, friend_id) VALUES($1, $2) RETURNING *', [
      userId?.rows[0]?.id,
      requestedUserId?.rows[0]?.id,
    ]);

    if (result?.rows?.length === 0) {
      throw new Error('Cannot insert friend');
    }

    // The other way
    result = await pool.query('INSERT INTO friend(friend_id, user_id) VALUES($1, $2) RETURNING *', [
      userId?.rows[0]?.id,
      requestedUserId?.rows[0]?.id,
    ]);

    if (result?.rows?.length === 0) {
      throw new Error('Cannot insert friend');
    }
    await pool.query('COMMIT');

    const friend = result?.rows;

    return friend;
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

module.exports = {
  getAllFriendRequestsService,
  sendNewFriendRequestService,
  getAllFriendsService,
  acceptFriendRequestService,
};
