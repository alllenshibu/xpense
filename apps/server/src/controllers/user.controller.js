const { deleteUserService } = require('../services/user.service');

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
  deleteUserController,
};
