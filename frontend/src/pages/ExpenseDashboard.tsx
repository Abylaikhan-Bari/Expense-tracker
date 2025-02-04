import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Transaction, getTransactions, deleteTransaction } from "../services/TransactionService";

interface ExpenseDashboardProps {
    onAddExpense: () => void;
}

const categories = [
    { name: "General", color: "#b91c1c" },
    { name: "Fuel", color: "#f59e0b" },
    { name: "Grocery", color: "#10b981" },
    { name: "Fun", color: "#3b82f6" },
    { name: "Shopping", color: "#8b5cf6" },
    { name: "Travel", color: "#6d28d9" },
    { name: "Food", color: "#374151" },
];

const ExpenseDashboard: React.FC<ExpenseDashboardProps> = ({ onAddExpense }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalSpending, setTotalSpending] = useState<number>(0);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
            setTotalSpending(data.reduce((acc, tx) => acc + Number(tx.sum), 0));
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteTransaction(id);
        fetchTransactions();
    };

    const pieData = {
        labels: categories.map((cat) => cat.name),
        datasets: [
            {
                data: categories.map(
                    (cat) => transactions.filter((tx) => tx.category === cat.name).reduce((sum, tx) => sum + tx.sum, 0)
                ),
                backgroundColor: categories.map((cat) => cat.color),
            },
        ],
    };

    const barData = {
        labels: categories.map((cat) => cat.name),
        datasets: [
            {
                label: "Expense per Category (₸)",
                data: categories.map(
                    (cat) => transactions.filter((tx) => tx.category === cat.name).reduce((sum, tx) => sum + tx.sum, 0)
                ),
                backgroundColor: categories.map((cat) => cat.color),
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <div className="header">
                <h2>Today's Spending</h2>
                <span className="total-spending">₸ {totalSpending}</span>
                <button onClick={onAddExpense} className="add-expense-btn">
                    <FaPlus /> Add Expense
                </button>
            </div>

            <div className="dashboard-content">
                <div className="chart-card">
                    <h3>Expense Breakdown</h3>
                    <Pie data={pieData} />
                </div>

                <div className="chart-card">
                    <h3>Expense Per Category</h3>
                    <Bar data={barData} />
                </div>

                <div className="expense-list">
                    <h3>Recent Expenses</h3>

                    <div className="expenses-container">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="expense-card">
                                <div className="expense-info">
                                    <span className="expense-date">{tx.dateTime}</span>
                                    <span className="expense-category">{tx.category}</span>
                                    <p className="expense-comment">{tx.comment}</p>
                                </div>
                                <div className="expense-actions">
                                    <span className="expense-amount">₸ {tx.sum}</span>
                                    <button onClick={() => handleDelete(tx.id!)} className="delete-btn">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseDashboard;
