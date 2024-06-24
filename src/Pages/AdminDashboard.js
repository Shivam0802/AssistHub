import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import AdminSidebar from "../Components/Sidebar";
import AdminPage from "../Components/AdminPage";

const AdminDashboard = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <>
            <Navbar />
            <div className={`flex flex-col lg:flex-row p-2 text-gray-900 ${theme === "light" ? "bg-[#F2F1EB]" : "bg-[#040D12]"}`}>
                <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
                <AdminPage theme={theme} />
            </div>
        </>
    );
};

export default AdminDashboard;

