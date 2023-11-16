import { fetchAllCategories } from "@/services/category";
import { useEffect,useState } from "react";

export default function ExpenseEditor({
    expense,
    setExpense,
    submitText,
    handleSubmit,
}) 

{
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchAllCategories().then((categories) => {
            setCategories(categories.data);
            console.log(categories.data)
            
        });
    }, []);
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
          <input
            id="title"
            name="title"
            type="text"
            value={expense.title}
            placeholder="Groceries"
          />
        </div>
        <div>
          <label htmlFor="Category">category</label>
          <input
            id="category"
            name="category"
            type="category"
            value={expense.category}
            placeholder="499.49"
          />
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
