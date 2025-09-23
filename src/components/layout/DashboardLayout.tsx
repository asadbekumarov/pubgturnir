import React, { useState } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import Header from "../../pages/dashboard/Header" // ✅ headerni chaqiramiz

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    const linkClasses = (path: string) =>
        `group flex items-center px-4 py-3 rounded-xl mb-2 transition-all duration-300 ease-in-out ${location.pathname === path
            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold shadow-lg scale-105"
            : "text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white"
        }`

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#111827" }}>
            {/* ✅ Header */}
            <Header />

            <div className="flex flex-1">
                {/* Mobile menu button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Sidebar */}
                <aside
                    className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 p-6 border-r border-gray-700 shadow-2xl transition-transform duration-300 ease-in-out`}
                    style={{ backgroundColor: "#111827" }}
                >
                    <div className="mb-8">
                        <h2 className="text-white font-bold text-xl mb-2 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                            Boshqaruv paneli
                        </h2>
                        <div className="h-1 w-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                    </div>

                    <nav className="space-y-1">
                        <Link to="/dashboard/stats" className={linkClasses("/dashboard/stats")}>
                            Dashboard
                        </Link>

                        <Link to="/dashboard/profile" className={linkClasses("/dashboard/profile")}>
                            Profile
                        </Link>
                    </nav>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 relative lg:ml-0 p-6">
                    <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>
                    <div className="pt-6 lg:pt-0">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
