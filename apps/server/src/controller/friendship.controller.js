
const {sendFriendRequest , canelFriendRequest , unfriend , getStatus} = require("../services/users.service.js")

const sendFriendRequestController = async (req, res) => {
    const sender = req.body.sender
    const reciever = req.body.reciever

    await sendFriendRequest(sender , reciever)

    res.status(200).json("Friend request sent")
}

const canelFriendRequestController = async (req, res) => {
    const sender = req.body.sender
    const reciever = req.body.reciever

    await canelFriendRequest(sender , reciever)

    res.status(200).json("Friend request canceled")
}

const unfriendController = async (req, res) => {
    const sender = req.body.sender
    const reciever = req.body.reciever

    await unfriend(sender , reciever)

    res.status(200).json("undfriended successfully")
}

const getStatusController = async (req, res) => {
    const sender = req.body.sender
    const reciever = req.body.reciever

    const status = await getStatus(sender , reciever)
    
    res.status(200).json(status)
}

module.exports = {sendFriendRequestController , canelFriendRequestController , unfriendController , getStatusController}

