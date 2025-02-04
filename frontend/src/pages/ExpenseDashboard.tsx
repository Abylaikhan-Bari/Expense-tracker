import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
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

    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Today's Spending</h2>
                <button
                    onClick={onAddExpense}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <FaPlus /> Add Expense
                </button>
            </div>

            {/* DISPLAY TOTAL SPENDING */}
            <div className="mb-6 text-xl font-bold text-yellow-500">
                Total Spent: ₸ {totalSpending}
            </div>

            {/* PIE CHART */}
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-lg mb-4">Expense Breakdown</h3>
                <Pie data={pieData} />
            </div>

            {/* TRANSACTIONS LIST */}
            <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Recent Expenses</h3>
                <ul className="space-y-4">
                    {transactions.map((tx) => (
                        <li key={tx.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                            <div>
                                <span className="text-yellow-400">{tx.dateTime}</span>
                                <span className="ml-2 text-xs px-2 py-1 bg-yellow-500 text-black rounded-md">
                                    {tx.category}
                                </span>
                                <p className="text-lg font-medium">{tx.comment}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-semibold">₸ {tx.sum}</span>
                                <button
                                    onClick={() => handleDelete(tx.id!)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ExpenseDashboard;
