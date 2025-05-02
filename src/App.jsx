import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Signin from "./pages/SignInSupa";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupSupabase";
import Layout from './components/layout/Layout';
import Home from './pages/HomePage';
import Activity from './pages/Activity';
import Expenses from './pages/Expenses';
import Accounts from './pages/Accounts';
import NewExpenseModal from './ui/NewExpenseModal';

const App = () => {
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Route with Layout */}
          <Route path="/dashboard" element={<Layout />}>
            <Route path="home" element={<Home onNewExpense={() => setShowNewExpenseModal(true)} />} />
            <Route path="activity" element={<Activity />} />
            <Route path="expenses" element={<Expenses onNewExpense={() => setShowNewExpenseModal(true)} />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="groups" element={<Accounts />} />
          </Route>
        </Routes>

        {/* New Expense Modal */}
        {showNewExpenseModal && (
          <NewExpenseModal onClose={() => setShowNewExpenseModal(false)} />
        )}
      </div>
    </Router>
  );
};

export default App;
