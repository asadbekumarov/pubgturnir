import { Link, useNavigate } from "react-router-dom";
import { Globe, Settings, MessageCircle, LogOut } from "lucide-react";
import { CgMenuRightAlt } from "react-icons/cg";
// import siteLogo from "@/assets/siteLogo.png";

const Header = () => {
    const navigate = useNavigate();

    const getUserInitials = () => {
        return "CP"; // Hardcoded initials
    };

    return (
        <header className="sticky top-0 z-10 bg-dark-custom border-b-2 border-dark-border-custom">
            <div className="h-[64px] py-[12px] px-4 flex items-center justify-between gap-2">
                {/* Logo */}
                <Link to="/" aria-current="page" className="inline-flex md:hidden">
                    <div className="flex items-center relative">
                        {/* <img
                            alt="CloudPlay Logo"
                            className="w-[38px] h-[32px] mr-2"
                            src={siteLogo}
                        /> */}
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
                        {/* Language */}
                        <li>
                            <button className="flex items-center gap-2 text-white text-sm px-3 py-2 rounded-lg bg-dark-2-custom">
                                <Globe className="h-4 w-4" />
                                Language
                            </button>
                        </li>

                        {/* Profile */}
                        <li>
                            <div className="relative">
                                <button className="flex items-center gap-2 text-white text-sm px-3 py-2 rounded-lg bg-dark-2-custom">
                                    <div className="h-8 w-8 bg-primary-custom rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {getUserInitials()}
                                        </span>
                                    </div>
                                    user@cloudplay.com
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-dark-2-custom border border-dark-border-custom rounded-lg shadow-lg">
                                    <Link to="/dashboard/settings">
                                        <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 text-white">
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </div>
                                    </Link>
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 text-white"
                                        onClick={() =>
                                            window.open("https://t.me/cloudplay_support2", "_blank")
                                        }
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Telegram Support
                                    </div>
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-700 text-red-400"
                                        onClick={() => navigate("/")}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* Mobile Menu Button */}
                        <li className="md:hidden">
                            <button
                                type="button"
                                className="text-white transition"
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
