import { useNavigate } from "react-router-dom";
import { Globe, Home } from "lucide-react";
import { useState } from "react";
// import { Tournament } from './../../types/index';

const Header = () => {
    const navigate = useNavigate();
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-dark-custom border-b border-gray-700">
            <div className="h-16 px-4 flex items-center justify-between">
                {/* Left Section: Tariff */}
                <div className="hidden md:flex items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 transition-colors shadow-md"
                    >
                        <span className="text-base font-bold tracking-wide" style={{ color: "#e6b711" }}>
                            PUBG
                        </span>
                        <span className="text-base font-semibold text-white">
                            Tournament
                        </span>
                    </button>
                </div>

                {/* Right Section */}
                <nav>
                    <ul className="flex items-center gap-2">
                        {/* Home Button */}
                        <li>
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-2-custom hover:bg-dark-2-custom/80 text-white text-sm transition-colors"
                            >
                                <Home className="h-4 w-4" />
                                Home
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
};

export default Header;
