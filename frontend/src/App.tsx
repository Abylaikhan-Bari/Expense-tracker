import React, { useState } from "react";
import ExpenseDashboard from "./pages/ExpenseDashboard";
import ExpenseForm from "./components/ExpenseForm";

const App: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="app-container">
            {showForm ? (
                <ExpenseForm onSave={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
            ) : (
                <ExpenseDashboard onAddExpense={() => setShowForm(true)} />
            )}
        </div>
    );
};

export default App;
