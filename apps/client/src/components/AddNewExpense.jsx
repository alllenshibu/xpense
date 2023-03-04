const AddNewExpense = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Add New Expense</h1>
      <label htmlFor="expense-name">Expense Name</label>
      <input type="text" name="expense-name" placeholder="Expense Name" />
      <label htmlFor="expense-amount">Expense Name</label>
      <input type="number" name="expense-amount" placeholder="Expense Amount" />
      <label htmlFor="expense-date">Expense Name</label>
      <input type="date" name="expense-date" placeholder="Expense Date" />
      <label htmlFor="expense-category">Expense Category</label>
      <input type="text" name="expense-category" placeholder="Expense Category" />

      <button className="btn">Add Expense</button>
    </div>
  )
}

export default AddNewExpense
