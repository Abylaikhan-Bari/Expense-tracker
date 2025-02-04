import React, { useState } from "react";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import ExpenseForm from "./components/ExpenseForm";

const App: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
            {showForm ? (
                <ExpenseForm onSave={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
            ) : (
                <ExpenseDashboard onAddExpense={() => setShowForm(true)} />
            )}
        </div>
    );
};

export default App;
