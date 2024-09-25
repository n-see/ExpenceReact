import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";


import ExpenseForm from "./ExpenseForm";
import categories from "../categories";
import ExpenseFilter from "./ExpenseFilter";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { checkToken, GetItemsByUserId, LoggedInData } from "../../Services/DataService";
import { User } from "../../App";

export interface Expense {
    id: number;
    userId: number;
    description: string;
    amount: number;
    category: string;
}

interface userInfo {
    id: number
    userId: number
    publisherName: string

}


export interface ExpenseProps {
    fetchData: () => void;
    
}
interface ExpenseProp {
    onLogin: (userInfo:any) => void
}

// interface ExpenseProps {
//     expenses: Expense [];
//     onDelete: (id: number) => void
// }

const ExpenseList = ({onLogin}:ExpenseProp) => {
    let navigate = useNavigate();


    const [userId, setUserId] = useState(0);
    const [publisherName, setPublisherName] = useState("")
    const [expenseItem, setExpenseItem] = useState<Expense[]>([])

    const [localS, setLocalS] = useState(() => {
        return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : {userId: 0, publisherName: ""}
        
    })
    // const [userInfo, setUserInfo] = useState<userInfo [] | null>(null)
    
    useEffect(() => {
        if (!checkToken()) {
            navigate('/')
        }
        else{
            setLocalS(() => {
                return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : {userId: 0, publisherName: ""}
                
            })
            loadUserData();
        }
    }, [])
    
    

    const loadUserData = () => {
        // let userInfos = LoggedInData();
        
        onLogin(localS);
        
        fetchData();

        // setTimeout(async () => {
            
        //   let userExpenseItems = await GetItemsByUserId(userInfos.userId)
        //   setExpenseItem(userExpenseItems.data);
        //   setUserId(userId);


        //   console.log("Loaded expense items: ", expenseItem);
        // },1000)
    
    }
    
    const [data, setData] = useState<Expense[]>([]);
    // const [currentData, setCurrentData] = useState<Expense>({} as Expense);
    const [selectedCategory, setSelectedCategory] = useState("");

    const visibleExpense = selectedCategory
        ? data.filter((e) => e.category === selectedCategory)
        : data;

    const [editInput, setEditInput] = useState<Expense>({
        id: 0,
        userId: localS.userId,
        description: "",
        amount: 0,
        category: "",
    });
    const [editId, setEditId] = useState<number | null>(null);

    const setEdit = (id: number) => {
        setEditId(id);
    };

    const handleSave = () => {
        axios
            .put(BASE_URL + "Expense/" + editId, editInput)
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setEditInput({
                    ...editInput,
                    id: 0,
                    userId: localS.userId,
                    description: editInput.description,
                    amount: editInput.amount,
                    category: editInput.category,
                });
                setEditId(null);
            });
    };

    const fetchData = () => {
        let userInfo = JSON.parse(localStorage.getItem("UserData")!)
        console.log(localS.userId)
        axios
            .get(BASE_URL + "Expense/GetItemsByUserId/" + localS.userId)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id: number) => {
        axios
            .delete(BASE_URL + "Expense/" + id)
            .then(() => fetchData())
            .catch((error) => {
                console.log(error);
            });
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <>  
            
            <ExpenseForm fetchData={fetchData}/>
            <br />
            <ExpenseFilter
                onSelectCategory={(category) => setSelectedCategory(category)}
            />
            <br />

            <table className="table table-dark table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {visibleExpense.map((expense) => (
                        <tr key={expense.id}>
                            <td>
                                {editId == expense.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={expense.description}
                                            onChange={(e) =>
                                                setEditInput({
                                                    ...editInput,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    expense.description
                                )}
                            </td>
                            <td>
                                {editId == expense.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={expense.amount}
                                            onChange={(e) =>
                                                setEditInput({
                                                    ...editInput,
                                                    amount: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    expense.amount
                                )}
                            </td>
                            <td>
                                {editId == expense.id ? (
                                    <>
                                        <select
                                            id="category"
                                            className="form-select"
                                            onChange={(e) =>
                                                setEditInput({ ...expense, category: e.target.value })
                                            }
                                        >
                                            <option value={expense.category}>Select a Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={expense.category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    expense.category
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger m-2"
                                    onClick={() => handleDelete(expense.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-outline-warning "
                                    onClick={() => setEdit(expense.id)}
                                >
                                    Edit
                                </button>
                                {editId == expense.id ? (
                                    <>
                                        <button
                                            className="btn btn-outline-success m-2"
                                            onClick={() => handleSave()}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel Edit
                                        </button>
                                    </>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>
                            {visibleExpense
                                .reduce((acc, expense) => expense.amount + acc, 0)
                                .toFixed(2)}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseList;
