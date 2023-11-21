const { addNewIncomeService, getIncomeservice } = require('../services/income.service');

const addNewIncomeController = async (req, res) => {
  console.log(req?.body);
  const user = req?.user;
  console.log(user);

  const amount = req?.body?.income?.amount;
  console.log(amount);

  // const paymentOptionId = req?.body?.expense?.paymentOptionId;
  // const timestamp = req?.body?.income?.timestamp;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something huh went wrong' });
  }

  if (!amount || amount === '' || amount === undefined) {
    return res.status(400).json({ message: 'Amount is missing' });
  }

  // if (!timestamp || timestamp === '' || timestamp === undefined) {
  //   return res.status(400).json({ message: 'Timestamp is missing' });
  // }

  try {
    const income = await addNewIncomeService(user, amount);

    if (!income) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ income: income });
  } catch (err) {
    console.log(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getIncomeController = async (req, res) => {
  const user = req?.user;

  if (!user || user === '' || user === undefined) {
    return res.status(500).json({ message: 'Something huh went wrong' });
  }

  try {
    const income = await getIncomeservice(user);

    if (!income) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ income: income });
  } catch (err) {
    console.log(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
module.exports = {
  addNewIncomeController,
  getIncomeController
};
