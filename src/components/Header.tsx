import { useState } from "react";
import { Menu, Plus } from "lucide-react";
// import { NavLink } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="bg-blue-500 p-4 flex items-center justify-between">
            <div>
                <h1 className="md:text-2xl font-bold">Energizou Frontend Challenge</h1>
            </div>
            <nav className={`hidden md:flex`}>
                <Navbar toggleSidebar={toggleSidebar} />
            </nav>
            <button
                className="md:hidden z-50"
                onClick={toggleSidebar}
                aria-label="Toggle Menu"
                aria-expanded={isSidebarOpen}
            >
                {isSidebarOpen ? (
                    <Plus className="rotate-45 transition-transform transform duration-500 ease-in-out" />
                ) : (
                    <Menu className="transition-transform transform duration-500 ease-in-out" />
                )}
            </button>
            <div
                className={`md:hidden z-40 fixed top-0 right-0 h-screen w-full bg-[#ffffffbd] transition-all transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <Navbar toggleSidebar={toggleSidebar} />

            </div>
        </header>
    );
}