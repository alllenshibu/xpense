const { createNewSplitService } = require('../services/split.service');
const { getStatsService } = require('../services/stats.service');

// TODO: createNewSplitWithExpenseController

const createNewSplitController = async (req, res) => {
    const email = req?.user;
    const expenseId = req?.body?.expenseId;
    const split = req?.body?.split;

    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
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