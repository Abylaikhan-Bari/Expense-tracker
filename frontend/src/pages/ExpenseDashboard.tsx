import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaTrash, FaPlus } from "react-icons/fa";
import ExpenseForm from "../components/ExpenseForm";
import { fetchTransactions, addTransaction, deleteTransaction, Transaction } from "../services/TransactionService";

const categories = [
    { name: "General", color: "#b91c1c" },
    { name: "Fuel", color: "#f59e0b" },
    { name: "Grocery", color: "#10b981" },
    { name: "Fun", color: "#3b82f6" },
    { name: "Shopping", color: "#8b5cf6" },
    { name: "Travel", color: "#6d28d9" },
    { name: "Food", color: "#374151" },
];

const ExpenseDashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [totalSpending, setTotalSpending] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const data = await fetchTransactions();
        setTransactions(data);
        setTotalSpending(data.reduce((acc, tx) => acc + Number(tx.sum), 0));
    };

    const handleSaveTransaction = async (transaction: Transaction) => {
        await addTransaction(transaction);
        loadTransactions();
        setShowForm(false);
    };

    const handleDeleteTransaction = async (id: number) => {
        await deleteTransaction(id);
        loadTransactions();
    };

    const pieData = {
        labels: categories.map((cat) => cat.name),
        datasets: [
            {
                data: categories.map((cat) =>
                    transactions.filter((tx) => tx.category === cat.name).reduce((sum, tx) => sum + tx.sum, 0)
                ),
                backgroundColor: categories.map((cat) => cat.color),
            },
        ],
    };

    return (
        <div className="h-screen bg-gray-900 text-white p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Today's Spending</h2>
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-md text-xl font-bold">₸ {totalSpending}</div>
            </div>

            {showForm ? (
                <ExpenseForm onSave={handleSaveTransaction} onCancel={() => setShowForm(false)} />
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md flex items-center gap-2"
                        >
                            <FaPlus /> Add Expense
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg mb-4">Expense Breakdown</h3>
                            <Pie data={pieData} />
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg mb-4">Recent Expenses</h3>
                            <ul className="space-y-4">
                                {transactions.map((tx) => (
                                    <li key={tx.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                                        <div>
                                            <span className="text-yellow-400">{tx.dateTime}</span>
                                            <span className="ml-2 text-xs px-2 py-1 bg-yellow-500 text-black rounded-md">{tx.category}</span>
                                            <p className="text-lg font-medium">{tx.comment}</p>
                                        </div>
                                        <button onClick={() => handleDeleteTransaction(tx.id!)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExpenseDashboard;
