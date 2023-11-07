const { findUserByEmailService, deleteUserService } = require('../services/user.service');

const findUserByEmailController = async (req, res) => {
  const email = req?.params?.email;

  if (!email || email === '' || email === undefined) {
    return res.status(400).send('Email is required');
  }

  try {
    const userId = await findUserByEmailService(email);
    if (userId) {
      const message = {
        userId: userId,
      };
      res.status(200).send(message);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUserController = async (req, res) => {
  const userId = req?.body?.userId;

  if (!userId || userId === '' || userId === undefined) {
    return res.status(400).send('User ID is required');
  }

  try {
    const result = await deleteUserService(userId);
    if (result) {
      return res.status(200);
    } else {
      return res.status(400).send('Something went wrong');
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  findUserByEmailController,
  deleteUserController,
};
