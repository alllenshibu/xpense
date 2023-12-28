import { useEffect } from 'react';

export default function ExpenseEditor({
  expense,
  setExpense,
  categories,
  paymentOptions,
  submitText,
  handleSubmit,
}) {
  useEffect(() => {
    if (!expense.categoryId)
      setExpense({
        ...expense,
        categoryId: categories[0]?.id,
      });
  }, [categories, expense]);

  useEffect(() => {
    if (!expense.paymentOptionId)
      setExpense({
        ...expense,
        paymentOptionId: paymentOptions[0]?.id,
      });
  }, [paymentOptions, expense]);

  return (
    <form className="w-full p-4 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label htmlFor="title" className="text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={expense?.title}
          placeholder="Groceries"
          className="input-field"
          onChange={(e) => setExpense({ ...expense, [e.target.name]: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="text-sm font-medium text-gray-600">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={expense?.amount}
          placeholder="499.49"
          className="input-field"
          onChange={(e) => setExpense({ ...expense, [e.target.name]: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categoryId" className="text-sm font-medium text-gray-600">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={expense?.categoryId}
          onChange={(e) => setExpense({ ...expense, [e.target.name]: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="paymentOptionId" className="text-sm font-medium text-gray-600">
          Payment Option
        </label>
        <select
          id="paymentOptionId"
          name="paymentOptionId"
          value={expense?.paymentOptionId}
          onChange={(e) => setExpense({ ...expense, [e.target.name]: e.target.value })}
        >
          {paymentOptions.map((paymentOption) => (
            <option key={paymentOption.id} value={paymentOption.id}>
              {paymentOption.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="text-sm font-medium text-gray-600">
          Date and Time
        </label>
        <input
          id="date"
          name="timestamp"
          type="datetime-local"
          value={expense?.timestamp}
          className="input-field"
          onChange={(e) => setExpense({ ...expense, [e.target.name]: e.target.value })}
        />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
          {submitText ? submitText : 'Submit'}
        </button>
      </div>
    </form>
  );
}
