export default function IncomeEditor({ income, setIncome, submitText, handleSubmit }) {
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
          value={income?.title}
          placeholder="Salary"
          className="input-field"
          onChange={(e) => setIncome({ ...income, [e.target.name]: e.target.value })}
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
          value={income?.amount}
          placeholder="75,000"
          className="input-field"
          onChange={(e) => setIncome({ ...income, [e.target.name]: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="text-sm font-medium text-gray-600">
          Date and Time
        </label>
        <input
          id="date"
          name="timestamp"
          type="datetime-local"
          value={income?.timestamp}
          className="input-field"
          onChange={(e) => setIncome({ ...income, [e.target.name]: e.target.value })}
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
