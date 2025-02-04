import React, { useState } from "react";
import { Transaction, addTransaction } from "../services/TransactionService";

interface ExpenseFormProps {
    onSave: () => void;
    onCancel: () => void;
}

const categories = ["General", "Fuel", "Grocery", "Fun", "Shopping", "Travel", "Food"];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSave, onCancel }) => {
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [sum, setSum] = useState<number | "">("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sum) return;

        const transaction: Transaction = {
            dateTime: date,
            sum: Number(sum),
            category,
            comment,
            author: "User",
        };

        await addTransaction(transaction);
        onSave();
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto text-center">
            <h3 className="text-lg mb-4 text-yellow-400">Add Expense</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 bg-gray-700 text-white" />
                <input type="number" value={sum} onChange={(e) => setSum(Number(e.target.value))} className="w-full p-2 bg-gray-700 text-white" required />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-gray-700 text-white">
                    {categories.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full p-2 bg-gray-700 text-white" />
                <button type="submit" className="bg-yellow-500 text-black w-full py-2">Save</button>
                <button onClick={onCancel} className="bg-gray-600 text-white w-full py-2 mt-2">Cancel</button>
            </form>
        </div>
    );
};

export default ExpenseForm;
