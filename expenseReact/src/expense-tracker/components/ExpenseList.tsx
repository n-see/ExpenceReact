import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";

import ExpenseForm from "./ExpenseForm";
import categories from "../categories";

export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
}

export interface ExpenseProps {
    fetchData: () => void;
}

// interface ExpenseProps {
//     expenses: Expense [];
//     onDelete: (id: number) => void
// }

const ExpenseList = () => {
    const [data, setData] = useState<Expense[]>([]);
    const [currentData, setCurrentData] = useState<Expense>({} as Expense);

    const [editInput, setEditInput] = useState<Expense>({
        id: 0,
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
                    description: "",
                    amount: 0,
                    category: "",
                });
                setEditId(null);
            });
    };

    const fetchData = () => {
        axios
            .get(BASE_URL + "Expense/")
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ExpenseForm fetchData={fetchData} />
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
                    {data.map((expense) => (
                        <tr key={expense.id}>
                            <td>
                                {editId == expense.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editInput.description}
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
                                            value={editInput.amount}
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
                                            <option value="">Select a Category</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
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
                                    className="btn btn-outline-danger"
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
                                            className="btn btn-outline-success"
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
                            {data
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
