import "./App.css"
import AddNewExpense from "./components/AddNewExpense"
import ExpenseExplorer from "./components/ExpenseExplorer"
import Overview from "./components/Overview"
import PlusButton from "./components/PlusButton"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="App h-screen">
      <div className="container mx-auto h-full relative flex flex-row justify-center items-center">
        <div className="w-96 h-full justify-self-start">
          <Sidebar />
        </div>
        <div className="w-full max-h-full flex flex-col justify-start items-center">
          <Overview />
          <div className="w-full h-full overflow-y-scroll flex flex-col justify-start items-center">
            <ExpenseExplorer />
          </div>
        </div>
        <div className="absolute bottom-20 right-20">
          <PlusButton />
        </div>
      </div>
    </div>
  )
}

export default App
