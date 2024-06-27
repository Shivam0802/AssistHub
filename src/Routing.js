import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TicketForm from "./Components/TicketForm";
import AdminDashboard from "./Pages/AdminDashboard";
import Users from "./Components/User";
import Tickets from "./Components/Tickets";
import Graph from "./Components/Graph";
import { AuthContext } from "./Context/AuthContext";

const Routing = () => {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  return (
    <div className="w-full text-gray-200">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createTicket" element={
          <RequireAuth>
            <TicketForm />
          </RequireAuth>
        } />
        <Route path="/admin" element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        } />
        <Route path="/users" element={
          <RequireAuth>
            <Users />
          </RequireAuth>
        } />
        <Route path="/tickets" element={
          <RequireAuth>
            <Tickets />
          </RequireAuth>
        } />
        <Route path="/graph" element={
          <RequireAuth>
            <Graph />
          </RequireAuth>
        } />
      </Routes>
    </div>
  );
}

export default Routing;