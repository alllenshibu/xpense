const { addNewFriendRequestService, acceptFriendRequestService, getAllFriendRequestsService, getAllFriendsService } = require('../services/friend.service');

const addNewFriendRequestController = async (req, res) => {
    const user = req?.user;
    const friend = req?.body?.friend;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!friend || friend === '' || friend === undefined) {
        return res.status(400).send('Friend is required');
    }

    try {
        result = await addNewFriendRequestService(user, friend);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const acceptFriendRequestConroller = async (req, res) => {
    const user = req?.user;
    const friend = req?.body?.friend;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!friend || friend === '' || friend === undefined) {
        return res.status(400).send('Friend is required');
    }

    try {
        result = await acceptFriendRequestService(user, friend);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}



const getAllFriendRequestsController = async (req, res) => {
    const user = req?.user;


    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }


    try {
        result = await getAllFriendRequestsService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllFriendsController = async (req, res) => {
    const user = req?.user;


    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }


    try {
        result = await getAllFriendsService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}



module.exports = {
    addNewFriendRequestController,
    acceptFriendRequestConroller,
    getAllFriendRequestsController,
    getAllFriendsController
}