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
    console.log(expense);
  }, [expense]);
  return (
    <form
      className="w-full md:w-2/5 flex flex-col gap-4"
      onChange={(e) => {
        e.preventDefault();
        setExpense({ ...expense, [e.target.name]: e.target.value });
      }}
    >
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" value={expense.title} placeholder="Groceries" />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={expense.amount}
          placeholder="499.49"
        />
      </div>
      <div>
        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" name="categoryId" value={expense.categoryId}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="paymentOptionId">Payment Option</label> 
        <select id="paymentOptionId" name="paymentOptionId" value={expense.paymentOptionId}>
          {paymentOptions.map((paymentOption) => (
            <option key={paymentOption.id} value={paymentOption.id}>
              {paymentOption.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date">Date and Time</label>
        <input id="date" name="date" type="datetime-local" value={expense.timestamp} />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit" className="w-auto btn btn-primary">
          {submitText ? submitText : 'Submit'}
        </button>
      </div>
    </form>
  );
}
