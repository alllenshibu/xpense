import "./App.css"
import AddNewExpense from "./components/AddNewExpense"
import ExpenseExplorer from "./components/ExpenseExplorer"
import PlusButton from "./components/PlusButton"

function App() {
  return (
    <div className="App h-screen">
      <div className="container mx-auto h-full relative flex flex-row justify-center items-center">
        <div className="w-96 h-full justify-self-start">Sidebar</div>
        <main className="w-full max-h-full overflow-y-scroll">
          <ExpenseExplorer />
          <AddNewExpense />
        </main>
        <div className="absolute bottom-20 right-20">
          <PlusButton />
        </div>
      </div>
    </div>
  )
}

export default App
