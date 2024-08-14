import { useState } from "react"
import ExpenseList from "./expense-tracker/components/ExpenseList"
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
import ExpenseForm from "./expense-tracker/components/ExpenseForm"
import categories from "./expense-tracker/categories";

// interface expenseItem{
//   id: number,
//   description: string,
//   amount: number,
//   category: string;
// }


const App = () => {

  //create a useState to help us handle our selectedCategory

  const [selectedCategory, setSelectedCategory] = useState('')
  
  
  const [dummyExpensesArray, setDummyExpensesArray] = useState([
    {id: 1, description: 'aaa', amount:10, category: 'Utilities'},
    {id: 2, description: 'bbb', amount:15, category: 'Entertainment'},
    {id: 3, description: 'ccc', amount:20, category: 'Food'},
    {id: 4, description: 'ddd', amount:25, category: 'Shopping'},
    {id: 5, description: 'eee', amount:16, category: 'Groceries'},

  ])
  

  const handleDelete = (id:number) => {
    setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id != id))
  }
  // const expenseSubmit = (newItem:string, newAmount:number, newCategory:category) => {
  //   const addExpense:expenseItem | any = {
  //     id: Math.random(),
  //     description: newItem,
  //     amount: newAmount,
  //     category: newCategory
  //   }
  //   setDummyExpensesArray([...dummyExpensesArray, addExpense]);
  // }

 

  //create a variable with a ternary operator we are going to use our selectedCategory as a boolean filter through our dummyExpenseArray
  const visibleExpense = selectedCategory ? dummyExpensesArray.filter(e => e.category === selectedCategory): dummyExpensesArray;
  return (
    <>
      <h1 className="text-center">Expense Tracker</h1>
      <div className="m-5">
      {/* <ExpenseForm/> */}
      </div>
      <div className='m-5'>
      <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)}/>
      </div>
      <div className="m-5">
      <ExpenseList  />
      </div>
    </>
  )
}

export default App