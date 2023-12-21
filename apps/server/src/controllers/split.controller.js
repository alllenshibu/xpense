const {
  createNewSplitService,
  getSplitByExpenseService,
  getAllSplitsService,
} = require('../services/split.service');

const getAllSplitsController = async (req, res) => {
  const email = req?.user;

  if (!email || email === '' || email === undefined) {
    return res.status(400).send('Email is required');
  }

  try {
    result = await getAllSplitsService(email);
    if (result) {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

const getSplitByExpenseController = async (req, res) => {
  const email = req?.user;
  const expenseId = req?.params?.expenseId;

  if (!email || email === '' || email === undefined) {
    return res.status(400).send('Email is required');
  }

  if (!expenseId || expenseId === '' || expenseId === undefined) {
    return res.status(400).send('ExpenseId is required');
  }

  try {
    result = await getSplitByExpenseService(email, expenseId);
    if (result) {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

const createNewSplitController = async (req, res) => {
  const email = req?.user;
  const expenseId = req?.params?.expenseId;
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
    console.error(err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  getAllSplitsController,
  getSplitByExpenseController,
  createNewSplitController,
};
