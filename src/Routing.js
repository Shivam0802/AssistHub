import React, { useContext, useState, useEffect } from "react";
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
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Routing = () => {
  const { currentUser } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role);
        } else {
          console.log("No such document!");
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const PrivateRoute = ({ children }) => {
    const User = localStorage.getItem('user');
    const authenticated = JSON.parse(User).stsTokenManager.accessToken !== null;
    return authenticated ? children : <Navigate to="/" />;
  };

  const RequireRole = ({ children, requiredRole }) => {
    if (role === requiredRole) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };


  return (
    <div className="w-full text-gray-200">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="user">
              <Dashboard />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />
        
        <Route path="/createTicket" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="user">
              <TicketForm />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="admin">
              <AdminDashboard />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />

        <Route path="/users" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="admin">
              <Users />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />

        <Route path="/tickets" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="admin">
              <Tickets />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />

        <Route path="/graph" element={
          <PrivateRoute>
          <RequireAuth>
            <RequireRole requiredRole="admin">
              <Graph />
            </RequireRole>
          </RequireAuth>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
};

export default Routing;
