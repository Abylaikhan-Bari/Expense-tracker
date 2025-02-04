import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = ["Food", "Transport", "Shopping"];

const ExpenseForm = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [sum, setSum] = useState<number | "">("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const transaction = { dateTime: date, sum, category, comment, author: "User" };

        try {
            await axios.post("http://localhost:5002/transactions", transaction);
            alert("Expense added!");
            setSum("");
            setComment("");
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Picker */}
                <div>
                    <label className="block text-gray-300 mb-1">Date:</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>

                {/* Sum Input */}
                <div>
                    <label className="block text-gray-300 mb-1">Sum:</label>
                    <input
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(Number(e.target.value))}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        required
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label className="block text-gray-300 mb-1">Category:</label>
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

                {/* Comment Input */}
                <div>
                    <label className="block text-gray-300 mb-1">Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
