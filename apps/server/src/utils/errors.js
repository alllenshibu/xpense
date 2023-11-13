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

class CategoryNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CategoryNotFoundError';
  }
}

// Payment option errors
class PaymentOptionNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaymentOptionNotFoundError';
  }
}

module.exports = {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  WrongPasswordError,
  ExpenseNotFoundError,
  CategoryNotFoundError,
  PaymentOptionNotFoundError,
};
