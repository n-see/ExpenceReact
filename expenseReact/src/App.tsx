import { useState } from "react"
import ExpenseList from "./expense-tracker/components/ExpenseList"


const App = () => {
  
  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    {id: 1, description: 'aaa', amount:10, category: 'Utilities'},
    {id: 2, description: 'bbb', amount:15, category: 'Entertainment'},
    {id: 3, description: 'ccc', amount:20, category: 'Food'},
    {id: 4, description: 'ddd', amount:25, category: 'Shop[ping'},
    {id: 5, description: 'eee', amount:16, category: 'Groceries'},
  ])
  
  const handleDelete = (id:number) => {
    setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id != id))
  }
  return (
    <>
      <h1 className="text-center">Expense Tracker</h1>
      <ExpenseList expenses={dummyExpensesArray} onDelete={handleDelete}/>
    </>
  )
}

export default App