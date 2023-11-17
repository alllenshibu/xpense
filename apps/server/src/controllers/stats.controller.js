const { getStatsService } = require('../services/stats.service');

const getStatsController = async (req, res) => {
    const user = req?.user;


    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        const result = await getStatsService(user);
        if (result) {
            return res.status(200).json(result);
            
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

module.exports = {
    getStatsController
}