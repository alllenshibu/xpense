const { getStatsService } = require('../services/stats.service');

const getStatsController = async (req, res) => {
  const user = req?.user;

  if (!user || user === '' || user === undefined) {
    return res.status(400).send('User is required');
  }

  try {
    const stats = await getStatsService(user);
    if (stats) {
      return res.status(200).json({ stats: stats });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  getStatsController,
};
