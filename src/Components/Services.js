import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AdminSidebar from "./Sidebar";
import { serviceTables } from "./Tables";

const Services = () => {
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
                <div className="lg:w-[80%] m-4 lg:m-10 p-4 text-black rounded-lg shadow-2xl">
                    <div className="overflow-x-auto">
                        {serviceTables({ theme })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Services;