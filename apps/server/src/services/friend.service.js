const pool = require('../utils/pg');

const addNewFriendRequestService = async (user, friend) => {
    try {
        console.log('Adding new friend requests');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const friendId = await pool.query('SELECT id FROM "user" WHERE username = $1', [friend]);

        if (friendId?.rows?.length === 0) {
            throw new Error('Friend not found');
        }


        const result = await pool.query('INSERT INTO friend_request (user_id, friend_id) VALUES ($1, $2)', [userId?.rows[0]?.id, friendId?.rows[0]?.id]);

        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


const acceptFriendRequestService = async (user, friend) => {
    try {
        console.log('Adding new friend');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const friendId = await pool.query('SELECT id FROM "user" WHERE username = $1', [friend]);

        if (friendId?.rows?.length === 0) {
            throw new Error('Friend not found');
        }

        // Check whether the friend has actually sent a friend request
        const friendRequests = await pool.query('SELECT username FROM "user" INNER JOIN friend_request  ON id = friend_id WHERE user_id = $1', [userId?.rows[0]?.id]);

        if (friendRequests?.rows?.length === 0) {
            throw new Error('Friend request not found');
        }

        for (let friendRequest of friendRequests?.rows) {
            if (friendRequest?.username === friend) {
                const result = await pool.query('INSERT INTO friend (user_id, friend_id) VALUES ($1, $2), ($2, $1)', [userId?.rows[0]?.id, friendId?.rows[0]?.id]);
                // Deleting friend request
                await pool.query("DELETE FROM friend_request WHERE user_id = $1 AND friend_id = $2", [userId?.rows[0]?.id, friendId?.rows[0]?.id]);
                console.log(r2);
                return result?.rows;
            }
        }

        throw new Error('Friend request creation went wrong');

    } catch (err) {
        throw new Error(err.message);
    }
}


const getAllFriendRequestsService = async (user) => {
    try {
        console.log('Getting all friends');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT username FROM "user" INNER JOIN friend_request  ON id = friend_id WHERE user_id = $1', [userId?.rows[0]?.id]);

        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getAllFriendsService = async (user) => {
    try {
        console.log('Getting all friends');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT username FROM "user" INNER JOIN friend  ON id = friend_id WHERE user_id = $1', [userId?.rows[0]?.id]);

        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    addNewFriendRequestService,
    acceptFriendRequestService,
    getAllFriendRequestsService,
    getAllFriendsService
}