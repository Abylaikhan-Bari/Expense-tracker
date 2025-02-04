import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = ["Food", "Transport", "Shopping"];

const ExpenseForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [sum, setSum] = useState<number | "">("");
    const [category, setCategory] = useState<string>(categories[0]);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || sum === "" || sum <= 0) {
            alert("Please enter a valid date and amount greater than zero.");
            return;
        }

        const transaction = { dateTime: date, sum, category, comment, author: "User" };

        try {
            await axios.post("http://localhost:5002/transactions", transaction);
            alert("Expense added successfully!");
            setSum("");
            setComment("");
        } catch (error) {
            console.error("Error saving transaction:", error);
            alert("Failed to save expense. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">Add Expense</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Date Picker */}
                    <div>
                        <label className="block text-gray-300 mb-1">Date:</label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            aria-label="Select Date"
                        />
                    </div>

                    {/* Sum Input */}
                    <div>
                        <label className="block text-gray-300 mb-1">Amount:</label>
                        <input
                            type="number"
                            value={sum}
                            onChange={(e) => setSum(Number(e.target.value))}
                            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            required
                            min="1"
                            aria-label="Enter amount"
                        />
                    </div>

                    {/* Category Select */}
                    <div>
                        <label className="block text-gray-300 mb-1">Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            aria-label="Select category"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comment Input */}
                    <div>
                        <label className="block text-gray-300 mb-1">Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            aria-label="Enter comment"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-200 shadow-md"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
