import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Common/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import './App.css';


const PrivateRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
       
        return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(user.role)) {
       
        return <Navigate to="/" />;
    }
    return children;
};


function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute roles={['normal']}><UserDashboard /></PrivateRoute>} />
          <Route path="/store-owner" element={<PrivateRoute roles={['store_owner']}><StoreOwnerDashboard /></PrivateRoute>} />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;