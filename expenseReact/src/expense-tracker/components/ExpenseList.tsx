interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
}

interface ExpenseProps {
    expenses: Expense [];
    onDelete: (id: number) => void
}

const ExpenseList = ({expenses, onDelete}:ExpenseProps) => {
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
                    {expenses.map(expense => <tr key={expense.id}> 
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={()=> onDelete(expense.id)}>Delete</button>
                    </td>

                    </tr>)}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>{expenses.reduce((acc, expense)=> expense.amount + acc,0).toFixed(2)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseList;
