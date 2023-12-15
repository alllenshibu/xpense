const {
  getAllPaymentOptionsService,
  getPaymentOptionByIdService,
  addNewPaymentOptionService,
  editPaymentOptionService,
  deletePaymentOptionService,
} = require('../services/paymentOption.service');
const { UserDoesNotExistError, PaymentOptionNotFoundError } = require('../utils/errors');

const getAllPaymentOptionsController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const paymentOptions = await getAllPaymentOptionsService({ user });

    if (!paymentOptions) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ paymentOptions: paymentOptions });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getPaymentOptionByIdController = async (req, res) => {
  const user = req?.user;
  const paymentOptionId = req?.params?.id;
  let getExpenses = req?.query?.getExpenses;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !paymentOptionId ||
    paymentOptionId === undefined ||
    paymentOptionId === null ||
    paymentOptionId === '' ||
    paymentOptionId === 'undefined'
  ) {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  if (getExpenses == 'true') {
    getExpenses = true;
  } else {
    getExpenses = false;
  }

  try {
    const paymentOption = await getPaymentOptionByIdService({ user, paymentOptionId, getExpenses });

    if (!paymentOption) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ paymentOption: paymentOption });
  } catch (err) {
    if (err instanceof PaymentOptionNotFoundError)
      return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const addNewPaymentOptionController = async (req, res) => {
  const user = req?.user;
  const name = req?.body?.paymentOption?.name;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!name || name === undefined || name === null || name === '' || name === 'undefined') {
    return res.status(400).json({ message: 'Payment option name is missing' });
  }

  try {
    const paymentOption = await addNewPaymentOptionService({ user, name });

    if (!paymentOption) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ paymentOption: paymentOption });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const editPaymentOptionController = async (req, res) => {
  const user = req?.user;
  const id = req?.params?.id;
  const name = req?.body?.paymentOption?.name;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!id || id === undefined || id === null || id === '' || id === 'undefined') {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  if (!name || name === undefined || name === null || name === '' || name === 'undefined') {
    return res.status(400).json({ message: 'Payment option name is missing' });
  }

  try {
    const paymentOption = await editPaymentOptionService({ user, id, name });

    if (!paymentOption) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ paymentOption: paymentOption });
  } catch (err) {
    console.error(err);
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const deletePaymentOptionController = async (req, res) => {
  const user = req?.user;
  const id = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === undefined || user === null || user === '' || user === 'undefined') {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!id || id === undefined || id === null || id === '' || id === 'undefined') {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  try {
    const deleted = await deletePaymentOptionService({ user, id });

    if (!deleted) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ message: 'Successfully deleted payment option' });
  } catch (err) {
    console.error(err);
    if (err instanceof PaymentOptionNotFoundError)
      return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

module.exports = {
  getAllPaymentOptionsController,
  getPaymentOptionByIdController,
  addNewPaymentOptionController,
  editPaymentOptionController,
  deletePaymentOptionController,
};
