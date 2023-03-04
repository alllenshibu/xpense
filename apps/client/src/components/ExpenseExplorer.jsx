import { useEffect } from "react"

const ExpenseExplorer = () => {
  useEffect(() => {
    console.log("Api call to get expenses")
  }, [])

  return (
    <div>
      <h1>Expense Explorer</h1>
    </div>
  )
}

export default ExpenseExplorer
