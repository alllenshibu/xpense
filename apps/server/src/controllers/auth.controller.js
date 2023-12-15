const { signupService, loginService } = require('../services/auth.service');
const {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  WrongPasswordError,
} = require('../utils/errors');

const signupController = async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const firstName = req?.body?.firstName;
  const lastName = req?.body?.lastName;

  if (!email || email === undefined || email === null || email === '' || email == 'undefined') {
    return res.status(400).json({ message: 'Email is missing' });
  }
  if (
    !password ||
    password === undefined ||
    password === null ||
    password === '' ||
    password == 'undefined'
  ) {
    return res.status(400).json({ message: 'Password is missing' });
  }
  if (
    !firstName ||
    firstName === undefined ||
    firstName === null ||
    firstName === '' ||
    firstName == 'undefined'
  ) {
    return res.status(400).json({ message: 'First name is missing' });
  }
  if (
    !lastName ||
    lastName === undefined ||
    lastName === null ||
    lastName === '' ||
    lastName == 'undefined'
  ) {
    return res.status(400).json({ message: 'Last name is missing' });
  }

  try {
    let token = await signupService(email, password, firstName, lastName);

    if (!token) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ token: token });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return res.status(409).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const loginController = async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email || email === undefined || email === null || email === '' || email == 'undefined') {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (
    !password ||
    password === undefined ||
    password === null ||
    password === '' ||
    password == 'undefined'
  ) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    let token = await loginService(email, password);

    if (!token) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ token: token });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    if (err instanceof WrongPasswordError) return res.status(401).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  signupController,
  loginController,
};
