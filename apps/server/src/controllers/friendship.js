import prisma from '../utils/database.js';

export const getFriendRequestsReceived = async (req, res) => {
  try {
    const { user } = req;

    const friendRequests = await prisma.friendRequest.findMany({
      where: {
        receiverId: user.id,
      },
    });

    return res.status(200).json({ friendRequests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFriendRequestsSent = async (req, res) => {
  try {
    const { user } = req;

    const friendRequests = await prisma.friendRequest.findMany({
      where: {
        senderId: user.id,
      },
    });

    return res.status(200).json({ friendRequests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { user } = req;

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const friendRequestExists = await prisma.friendRequest.findFirst({
      where: {
        senderId: user.id,
        receiverId: userId,
      },
    });

    if (friendRequestExists) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id,
        receiverId: userId,
      },
    });

    if (!friendRequest) {
      return res.status(400).json({ error: 'Failed to send friend request' });
    }

    return res.status(200).json({ message: 'Friend request sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { user } = req;

    const { requestId } = req.body;

    if (!requestId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        id: requestId,
        receiverId: user.id,
      },
    });

    if (!friendRequest) {
      return res.status(400).json({ error: 'Friend request not found' });
    }

    await prisma.$transaction(async (tx) => {
      const friendTo = await tx.friend.create({
        data: {
          userId: user.id,
          friendId: friendRequest.senderId,
        },
      });

      const friendFrom = await tx.friend.create({
        data: {
          userId: friendRequest.senderId,
          friendId: user.id,
        },
      });

      await prisma.friendRequest.delete({
        where: {
          id: requestId,
        },
      });

      if (!friendTo || !friendFrom) {
        throw new Error('Failed to accept friend request');
      }
    });

    return res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const { user } = req;

    const friends = await prisma.friend.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({ friends });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
