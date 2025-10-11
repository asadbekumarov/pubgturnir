import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
// Assuming Header component is well-optimized
import Header from "../../pages/dashboard/Header";
import { Menu, X, LayoutDashboard, User } from "lucide-react"; // Using Lucide icons for a modern look

// Define the structure for sidebar links
interface NavLink {
    path: string;
    label: string;
    Icon: React.ElementType;
}

// Sidebar links configuration
const NAV_LINKS: NavLink[] = [
    { path: "/dashboard/stats", label: "Dashboard", Icon: LayoutDashboard },
    { path: "/dashboard/profile", label: "Profile", Icon: User },
    // Add more links here
];

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    // Toggle function for better reusability and potential memoization
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    // Use useMemo for the dynamic link classes to prevent unnecessary re-renders
    const linkClasses = useMemo(() => (path: string) => {
        const isActive = location.pathname === path;
        // Refined Tailwind classes for a cleaner, more professional look
        return `
            flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
            ${isActive
                ? "bg-yellow-500/90 text-gray-900 font-semibold shadow-md shadow-yellow-500/30"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }
        `.trim();
    }, [location.pathname]);

    const isMobileSidebarVisible = isSidebarOpen;

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <header className="fixed top-0 left-0 z-50 border-b w-full bg-[#111827]  border-gray-700">
                <Header />
            </header>

            <div className="flex flex-1 pt-16"> 

                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-4 right-4 z-[60] p-2 text-white hover:bg-gray-600/90 transition-colors shadow-lg"
                    aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    {isSidebarOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Sidebar */}
                <aside
                    className={`
            fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] p-4 border-r-2 border-[#374151]
            bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out
            ${isMobileSidebarVisible ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:w-64 lg:flex-shrink-0 lg:h-auto
        `}
                >
                    <nav className="space-y-1 mt-4">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={linkClasses(link.path)}
                                onClick={toggleSidebar}
                            >
                                <link.Icon className="w-5 h-5" />
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Overlay: Increased Z-index to be below the mobile button but above content */}
                {isMobileSidebarVisible && (
                    <div
                        className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
                        onClick={toggleSidebar}
                        aria-hidden="true"
                    />
                )}

                {/* Main content */}
                <main className="flex-1 relative transition-all duration-300 ease-in-out lg:ml-0 overflow-y-auto">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1)_0,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1)_0,transparent_50%)] pointer-events-none"></div>

                    <div className="mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;