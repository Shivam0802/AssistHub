import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TicketForm from "./Components/TicketForm";
import AdminDashboard from "./Pages/AdminDashboard";
import Users from "./Components/User";
import Tickets from "./Components/Tickets";
import Services from "./Components/Services";
import Graph from "./Components/Graph";

const Routing = () => {
  return (
    <div className="w-full text-gray-200">
       <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createTicket" element={<TicketForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/services" element={<Services />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
    </div>
  );
}

export default Routing;