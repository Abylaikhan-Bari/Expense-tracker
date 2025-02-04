import React, { useState } from "react";
import { Transaction, saveTransaction } from "../services/TransactionService";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sum) return;
        const transaction: Transaction = { dateTime: date, sum: Number(sum), category, comment, author: "User" };

        try {
            await saveTransaction(transaction);
            onSave(transaction);
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    return (
        <div className="form-card">
            <h3>Add Expense</h3>
            <form onSubmit={handleSubmit}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
                <input type="number" value={sum} onChange={(e) => setSum(Number(e.target.value))} required className="form-input" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
                    {categories.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="form-input" />
                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
