import { Link, useNavigate } from "react-router-dom";
import { Globe, Home } from "lucide-react";
import { CgMenuRightAlt } from "react-icons/cg";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-dark-custom border-b border-[#374151] border-dark-border-custom">
            <div className="h-[64px] py-[12px] px-4 flex items-center justify-between gap-2">
                {/* Logo */}
                <Link to="/" aria-current="page" className="inline-flex md:hidden">
                    <div className="flex items-center relative">
                        <h2 className="text-[18px] font-bold text-white">
                            Cloud
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Play
                            </span>
                        </h2>
                    </div>
                </Link>

                {/* Balance & Tariff (hardcoded) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-dark-2-custom rounded-lg border border-dark-border-custom">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-white">Balance:</span>
                        <span className="text-sm font-semibold text-green-400">
                            100 000 so'm
                        </span>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className="flex items-center gap-2 px-3 py-2 bg-dark-2-custom hover:bg-dark-2-custom/80 rounded-lg border border-dark-border-custom transition-colors"
                    >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-white">Tariff:</span>
                        <span className="text-sm font-semibold text-blue-400">
                            Basic Plan
                        </span>
                    </button>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    <ul className="flex items-center gap-2">
                        {/* Home Button */}
                        <li>
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 text-white text-sm px-3 py-2 rounded-lg bg-dark-2-custom hover:bg-dark-2-custom/80 transition-colors"
                            >
                                <Home className="h-4 w-4" />
                                Home
                            </button>
                        </li>

                        {/* Language Dropdown */}
                        <li className="relative">
                            <button
                                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                                className="flex items-center gap-2 text-white text-sm px-3 py-2 rounded-lg bg-dark-2-custom hover:bg-dark-2-custom/80 transition-colors"
                            >
                                <Globe className="h-4 w-4" />
                                Language
                            </button>

                            {isLanguageMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsLanguageMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-32 bg-dark-2-custom border border-dark-border-custom rounded-lg shadow-lg z-20">
                                        <button
                                            className="w-full text-left px-3 py-2 hover:bg-gray-700 text-white text-sm"
                                            onClick={() => setIsLanguageMenuOpen(false)}
                                        >
                                            English
                                        </button>
                                        <button
                                            className="w-full text-left px-3 py-2 hover:bg-gray-700 text-white text-sm"
                                            onClick={() => setIsLanguageMenuOpen(false)}
                                        >
                                            O'zbek
                                        </button>
                                        <button
                                            className="w-full text-left px-3 py-2 hover:bg-gray-700 text-white text-sm"
                                            onClick={() => setIsLanguageMenuOpen(false)}
                                        >
                                            Русский
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>

                        {/* Mobile Menu Button */}
                        <li className="md:hidden">
                            <button
                                type="button"
                                className="text-white transition hover:text-gray-300"
                                aria-label="Toggle navigation menu"
                            >
                                <CgMenuRightAlt className="text-3xl" aria-hidden="true" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
