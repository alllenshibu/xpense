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

// Income management errors
class IncomeNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncomeNotFoundError';
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

// Friend errors
class RequestedUserDoesNotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestedUserDoesNotExistError';
  }
}

class DuplicateFriendRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateFriendRequestError';
  }
}

class FriendRequestDoesNotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FriendRequestDoesNotExistError';
  }
}

module.exports = {
  UserAlreadyExistsError,
  UserDoesNotExistError,
  WrongPasswordError,
  ExpenseNotFoundError,
  IncomeNotFoundError,
  CategoryNotFoundError,
  PaymentOptionNotFoundError,
  RequestedUserDoesNotExistError,
  DuplicateFriendRequestError,
  FriendRequestDoesNotExistError,
};
