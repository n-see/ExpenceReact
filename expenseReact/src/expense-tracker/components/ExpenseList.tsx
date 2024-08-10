import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
}

// interface ExpenseProps {
//     expenses: Expense [];
//     onDelete: (id: number) => void
// }

const ExpenseList = () => {

    const [data, setData] = useState<Expense[]>([]);
    const [currentData, setCurrentData] = useState<Expense>({} as Expense);

    

    const fetchData = () => {
        axios
            .get(BASE_URL + "Expense/")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleDelete = (id: number) => {
        axios
            .delete(BASE_URL + "Expense/" + id)
            .then(() =>
                fetchData()
            )
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
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
                    {data.map(expense => <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.category}</td>
                        <td>
                            <button className="btn btn-outline-danger" onClick={() => handleDelete(expense.id)}>Delete</button>
                        </td>

                    </tr>)}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{data.reduce((acc, expense) => expense.amount + acc, 0).toFixed(2)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseList;
