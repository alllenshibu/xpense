const { createNewSplitService } = require('../services/split.service');
const { getStatsService } = require('../services/stats.service');

// TODO: createNewSplitWithExpenseController

const createNewSplitController = async (req, res) => {
    const username = req?.user;
    const expenseId = req?.body?.expenseId;
    const split = req?.body?.split;

    if (!username || username === '' || username === undefined) {
        return res.status(400).send('Username is required');
    }

    if (!expenseId || expenseId === '' || expenseId === undefined) {
        return res.status(400).send('ExpenseId is required');
    }

    if (!split || split === '' || split === undefined) {
        return res.status(400).send('Split is required');
    }


    try {
        result = await createNewSplitService(expenseId, split);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    createNewSplitController
}