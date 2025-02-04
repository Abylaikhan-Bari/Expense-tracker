import React, { useState } from "react";
import { Transaction } from "../services/TransactionService";

interface ExpenseFormProps {
    onSave: (transaction: Transaction) => void;
    onCancel: () => void;
}

const categories = ["General", "Fuel", "Grocery", "Fun", "Shopping", "Travel", "Food"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSave, onCancel }) => {
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [sum, setSum] = useState<number | "">("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sum) return;
        onSave({ dateTime: date, sum: Number(sum), category, comment, author: "User" });
        setSum("");
        setComment("");
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg mb-4 text-yellow-400">Add Expense</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Amount (₸):</label>
                    <input
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(Number(e.target.value))}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    >
                        {categories.map((cat) => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-300">Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-md font-semibold">
                        Save
                    </button>
                    <button onClick={onCancel} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
