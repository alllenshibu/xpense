// User management errors
class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExistsError';
  }
}

class UserDoesNotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserDoesNotExistErrors';
  }
}

class WrongPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongPasswordError';
  }
}

// Expense management errors
class ExpenseNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExpenseNotFoundError';
  }
}

module.exports = {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  WrongPasswordError,
  ExpenseNotFoundError,
};
