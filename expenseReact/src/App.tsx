// import { useState } from "react"
import CreateAccount from "./expense-tracker/components/CreateAccount";
import ExpenseList from "./expense-tracker/components/ExpenseList"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "./expense-tracker/components/Navbar";
import Login from "./expense-tracker/components/Login";
import { useState } from "react";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter"
// import ExpenseForm from "./expense-tracker/components/ExpenseForm"
// import categories from "./expense-tracker/categories";

// interface expenseItem{
//   id: number,
//   description: string,
//   amount: number,
//   category: string;
// }

export interface User{
  id: number,
  username: string;
  password: string;
}

const App = () => {

  //create a useState to help us handle our selectedCategory

  // const [selectedCategory, setSelectedCategory] = useState('')
  
  
  // const [dummyExpensesArray, setDummyExpensesArray] = useState([
  //   {id: 1, description: 'aaa', amount:10, category: 'Utilities'},
  //   {id: 2, description: 'bbb', amount:15, category: 'Entertainment'},
  //   {id: 3, description: 'ccc', amount:20, category: 'Food'},
  //   {id: 4, description: 'ddd', amount:25, category: 'Shopping'},
  //   {id: 5, description: 'eee', amount:16, category: 'Groceries'},

  // ])
  

  // const handleDelete = (id:number) => {
  //   setDummyExpensesArray(dummyExpensesArray.filter(expense => expense.id != id))
  // }
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
  const[user, setUser] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (userData:string) => {
    setUser(userData)
    setIsLoggedIn(true);
  }
  const handleLogout = () => {
    localStorage.clear();
    setUser("");
    setIsLoggedIn(false);
}

  return (
    <>
    <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={() => setIsLoggedIn} user={user} handleLogout={handleLogout}/>
      <h1 className="text-center">Expense Tracker</h1>
      <div className="m-5">
      {/* <ExpenseForm/> */}
      </div>
      <div className='m-5'>
      {/* <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)}/> */}
      </div>
      <div className="m-5">
      {/* <ExpenseList  /> */}
      <Routes>
      <Route path="/ExpenseList" element={<ExpenseList onLogin={handleLogin}/>} />
      {/* <Route path="/Login" element={<Login />} /> */}
      <Route path="/CreateAccount" element={<CreateAccount/>} />
      <Route path="/" element={<Login/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App