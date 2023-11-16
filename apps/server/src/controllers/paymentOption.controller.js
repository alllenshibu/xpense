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
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const paymentOptions = await getAllPaymentOptionsService({ user });

    if (!paymentOptions) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ paymentOptions: paymentOptions });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getPaymentOptionByIdController = async (req, res) => {
  const user = req?.user;
  const paymentOptionId = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !paymentOptionId ||
    paymentOptionId === '' ||
    paymentOptionId === undefined ||
    paymentOptionId === 'undefined' ||
    paymentOptionId === null
  ) {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  try {
    const paymentOption = await getPaymentOptionByIdService({ user, paymentOptionId });

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
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!name || name === '' || name === undefined || name === 'undefined' || name === null) {
    return res.status(400).json({ message: 'Payment option name is missing' });
  }

  try {
    const paymentOption = await addNewPaymentOptionService({ user, name });

    if (!paymentOption) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ paymentOption: paymentOption });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const editPaymentOptionController = async (req, res) => {
  const user = req?.user;
  const id = req?.body?.paymentOption?.id;
  const name = req?.body?.paymentOption?.name;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!id || id === '' || id === undefined || id === 'undefined' || id === null) {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  if (!name || name === '' || name === undefined || name === 'undefined' || name === null) {
    return res.status(400).json({ message: 'Payment option name is missing' });
  }

  try {
    const paymentOption = await editPaymentOptionService({ user, id, name });

    if (!paymentOption) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ paymentOption: paymentOption });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const deletePaymentOptionController = async (req, res) => {
  const user = req?.user;
  const paymentOptionId = req?.body?.paymentOption?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !paymentOption ||
    paymentOption === '' ||
    paymentOption === undefined ||
    paymentOption === 'undefined' ||
    paymentOption === null
  ) {
    return res.status(400).json({ message: 'Payment option ID is missing' });
  }

  try {
    const deleted = await deletePaymentOptionService({ user, paymentOptionId });

    if (!deleted) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ message: 'Successfully deleted payment option' });
  } catch (err) {
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
