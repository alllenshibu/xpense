const {
  getAllIncomesService,
  getIncomeByIdService,
  addNewIncomeService,
  editIncomeService,
  deleteIncomeService,
} = require('../services/income.service');

const { UserDoesNotExistError, IncomeNotFoundError } = require('../utils/errors');

const getAllIncomesController = async (req, res) => {
  const user = req?.user;
  const limit = req?.query?.limit;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const incomes = await getAllIncomesService(user, limit);

    if (!incomes) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ incomes: incomes });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getIncomeByIdController = async (req, res) => {
  const user = req?.user;
  const incomeId = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!incomeId || incomeId === '' || incomeId === undefined) {
    return res.status(400).json({ message: 'Income ID is missing' });
  }

  try {
    const income = await getIncomeByIdService(user, incomeId);

    if (!income) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ income: income });
  } catch (err) {
    console.error(err);
    if (err instanceof IncomeNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const addNewIncomeController = async (req, res) => {
  const user = req?.user;
  const title = req?.body?.expense?.title;
  const amount = req?.body?.expense?.amount;
  const timestamp = req?.body?.expense?.timestamp;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!title || title === undefined || title === null || title === '' || title === 'undefined') {
    return res.status(400).json({ message: 'Title is missing' });
  }

  if (
    !amount ||
    amount === undefined ||
    amount === null ||
    amount === '' ||
    amount === 'undefined'
  ) {
    return res.status(400).json({ message: 'Amount is missing' });
  }

  if (
    !timestamp ||
    timestamp === undefined ||
    timestamp === null ||
    timestamp === '' ||
    timestamp === 'undefined'
  ) {
    return res.status(400).json({ message: 'Timestamp is missing' });
  }

  try {
    const income = await addNewIncomeService(user, title, amount, timestamp);

    if (!income) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ income: income });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const editIncomeController = async (req, res) => {
  const user = req?.user;
  const id = req?.params?.id;
  const title = req?.body?.expense?.title;
  const amount = req?.body?.expense?.amount;
  const timestamp = req?.body?.expense?.timestamp;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!title || title === undefined || title === null || title === '' || title === 'undefined') {
    return res.status(400).json({ message: 'Title is missing' });
  }

  if (
    !amount ||
    amount === undefined ||
    amount === null ||
    amount === '' ||
    amount === 'undefined'
  ) {
    return res.status(400).json({ message: 'Amount is missing' });
  }

  if (
    !timestamp ||
    timestamp === undefined ||
    timestamp === null ||
    timestamp === '' ||
    timestamp === 'undefined'
  ) {
    return res.status(400).json({ message: 'Timestamp is missing' });
  }

  try {
    const income = await editIncomeService(user, id, title, amount, timestamp);

    if (!income) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ income: income });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const deleteIncomeController = async (req, res) => {
  const user = req?.user;
  const incomeId = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!incomeId || incomeId === '' || incomeId === undefined) {
    return res.status(400).json({ message: 'Income ID is missing' });
  }

  try {
    const deleted = await deleteIncomeService(user, incomeId);

    if (!deleted) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ message: 'Successfully deleted income' });
  } catch (err) {
    console.error(err);
    if (err instanceof ExpenseNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAllIncomesController,
  getIncomeByIdController,
  addNewIncomeController,
  editIncomeController,
  deleteIncomeController,
};
