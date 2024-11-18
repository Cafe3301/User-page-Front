import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile'; 
import Map from './pages/Map';
import Appointments from './pages/Appointments'; 
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './routes/ProtectedRoute';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                            <Dashboard />
                    }
                />
                <Route
                    path="/profile"
                    element={
                            <Profile />
                    }
                />
                <Route
                    path="/appointments"
                    element={
                            <Appointments />
                    }
                />
                <Route path="/map" element={<Map/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

export default App;
