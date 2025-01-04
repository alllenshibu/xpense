import prisma from '../utils/database.js';

export const getFriendRequestsReceived = async (req, res) => {
  try {
    const {user} = req;

    let friendRequests = await prisma.friendRequest.findMany({
      where: {
        receiverId: user.id,
      },
    });

    friendRequests = await Promise.all(
      friendRequests.map(async (request) => {
        return {
          id: request.id,
          firstName: (await prisma.user.findFirst({
            where: {
              id: request.senderId,
            },
            select: {
              firstName: true,
            },
          })).firstName,
          lastName: (await prisma.user.findFirst({
            where: {
              id: request.senderId,
            },
            select: {
              lastName: true,
            },
          })).lastName,
          email: (await prisma.user.findFirst({
            where: {
              id: request.senderId,
            },
            select: {
              email: true,
            },
          })).email,
        };
      })
    );

    return res.status(200).json({friendRequests});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
  }
};

export const getFriendRequestsSent = async (req, res) => {
  try {
    const {user} = req;

    let friendRequests = await prisma.friendRequest.findMany({
      where: {
        senderId: user.id,
      },
      include: {
        receiver: true,
      },
    });

    friendRequests = friendRequests.map((request) => {
      return {
        id: request.id,
        firstName: request.receiver.firstName,
        lastName: request.receiver.lastName,
        email: request.receiver.email,
      };
    });

    return res.status(200).json({friendRequests});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const {user} = req;

    let {userId, email} = req.body;

    let userExists = null;

    if (userId) {
      userExists = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
    } else if (email) {
      userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });
    } else {
      return res.status(400).json({error: 'Missing required fields'});
    }

    if (!userExists) {
      return res.status(400).json({error: 'User not found'});
    }

    userId = userExists.id;

    const friendRequestExists = await prisma.friendRequest.findFirst({
      where: {
        senderId: user.id,
        receiverId: userId,
      },
    });

    if (friendRequestExists) {
      return res.status(400).json({error: 'Friend request already sent'});
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: user.id,
        receiverId: userId,
      },
    });

    if (!friendRequest) {
      return res.status(400).json({error: 'Failed to send friend request'});
    }

    return res.status(200).json({message: 'Friend request sent'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const {user} = req;

    const {requestId} = req.body;

    if (!requestId) {
      return res.status(400).json({error: 'Missing required fields'});
    }

    const friendRequest = await prisma.friendRequest.findFirst({
      where: {
        id: requestId,
        receiverId: user.id,
      },
    });

    if (!friendRequest) {
      return res.status(400).json({error: 'Friend request not found'});
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

    return res.status(200).json({message: 'Friend request accepted'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const {user} = req;

    let friends = await prisma.friend.findMany({
      where: {
        userId: user.id,
      },
    });


    friends = await Promise.all(
      friends.map(async (f) => {
        let friend = await prisma.user.findFirst({
          where: {
            id: f.friendId,
          }
        })
        return {
          id: friend.id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          email: friend.email,
        };
      })
    )

    return res.status(200).json({friends});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'Internal server error'});
  }
};
