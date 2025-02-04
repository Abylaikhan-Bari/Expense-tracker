import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = ["Food", "Transport", "Shopping"];

interface Transaction {
    id?: number;
    dateTime: Date | null;
    sum: number | "";
    category: string;
    comment: string;
    author: string;
}

const ExpenseForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [sum, setSum] = useState<number | "">("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [comment, setComment] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Fetch transactions
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const { data } = await axios.get("http://localhost:5002/transactions");
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const transaction: Transaction = {
            dateTime: date,
            sum,
            category,
            comment,
            author: "User",
        };

        try {
            await axios.post("http://localhost:5002/transactions", transaction);
            alert("Expense added!");
            setSum("");
            setComment("");
            fetchTransactions(); // Refresh list
        } catch (error) {
            alert("Failed to save expense. Please try again.");
            console.error("Error saving transaction:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5002/transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-semibold text-center mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-1">Date:</label>
                    <DatePicker
                        selected={date}
                        onChange={setDate}
                        className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Amount:</label>
                    <input
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(Number(e.target.value))}
                        className="w-full p-2 rounded-md bg-gray-800 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white"
                    >
                        {categories.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                >
                    Add Expense
                </button>
            </form>

            {/* Transactions List */}
            <h2 className="text-xl font-semibold mt-6">Expense History</h2>
            <ul className="mt-4 space-y-2">
                {transactions.map((tx) => (
                    <li key={tx.id} className="bg-gray-800 p-4 rounded-md flex justify-between">
                        <div>
                            <p className="font-semibold">{tx.category} - ${tx.sum}</p>
                            <p className="text-sm text-gray-400">{tx.comment}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(tx.id!)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseForm;
