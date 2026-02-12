import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Admin
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ManageLibrarians from './pages/admin/ManageLibrarians';
import ManageStudents from './pages/admin/ManageStudents';
import ViewBooks from './pages/admin/ViewBooks';
import AdminTransactions from './pages/admin/Transactions';

// Librarian
import LibrarianLayout from './layouts/LibrarianLayout';
import LibrarianDashboard from './pages/librarian/Dashboard';
import ManageBooks from './pages/librarian/ManageBooks';
import IssueBook from './pages/librarian/IssueBook';
import ReturnBook from './pages/librarian/ReturnBook';
import LibrarianTransactions from './pages/librarian/Transactions';

function App() {
  return (
    <Router>
      <div className="antialiased text-text bg-background min-h-screen font-sans">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="librarians" element={<ManageLibrarians />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="books" element={<ViewBooks />} />
            <Route path="transactions" element={<AdminTransactions />} />
          </Route>

          {/* Librarian Routes */}
          <Route path="/librarian" element={<LibrarianLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<LibrarianDashboard />} />
            <Route path="books" element={<ManageBooks />} />
            <Route path="issue" element={<IssueBook />} />
            <Route path="return" element={<ReturnBook />} />
            <Route path="transactions" element={<LibrarianTransactions />} />
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
