import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./pages/supabaseClient";
import { Provider } from "react-redux";
import store from "./store/store"; // Import the store

// Import your pages
import Signin from "./pages/SignInSupa";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupSupabase";
import Layout from "./components/layout/Layout";
import Home from "./pages/HomePage";
import Activity from "./pages/Activity";
import Expenses from "./pages/Expenses";
import Accounts from "./pages/Accounts";
import NewExpenseModal from "./ui/NewExpenseModal";
import ExpensesPage from "./pages/Expenses";
import Groups from "./pages/Groups";
import GroupDetails from "./components/GroupDetails";
import ProfileForm from "./components/ProfileForm";
import TagsPage from "./components/Tags";
import { fetchUserFromLocalStorage } from "./services/authService";

const App = () => {
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Route with Layout */}
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="activity" element={<Activity />} />
              <Route
                path="expenses"
                element={
                  <ExpensesPage
                    onNewExpense={() => setShowNewExpenseModal(true)}
                  />
                }
              />
              <Route path="accounts" element={<Accounts />} />
              <Route path="groups" element={<Groups />} />
              <Route path="groups/:id" element={<GroupDetails />} />
              <Route path="profile" element={<ProfileForm />} />
              <Route path="tags" element={<TagsPage />} />
            </Route>
          </Routes>

          {/* New Expense Modal */}
          {showNewExpenseModal && (
            <NewExpenseModal onClose={() => setShowNewExpenseModal(false)} />
          )}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
