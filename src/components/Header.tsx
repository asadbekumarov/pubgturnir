import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigationLinks = [
        { name: 'Turnirlar', href: '#tournaments' },
        { name: 'Jadval', href: '#schedule' },
        { name: 'Komandalar', href: '#teams' },
        { name: 'Natijalar', href: '#results' }
    ];

    return (
        <header className="bg-black shadow-2xl border-b-2 border-yellow-500" style={{ borderColor: '#f3aa01' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
                    {/* Logo */}
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#" className="flex items-center group">
                            <div className="p-3 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-200" style={{ backgroundColor: '#f3aa01' }}>
                                <span className="text-2xl font-bold text-black">PUBG</span>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-xl font-bold text-white transition-colors duration-200" style={{ color: isMobileMenuOpen ? '#f3aa01' : 'white' }}>
                                    Tournament
                                </h1>
                                <p className="text-xs" style={{ color: '#f3aa01' }}>Battle Royale</p>
                            </div>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            type="button"
                            className="bg-white bg-opacity-10 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset transition-all duration-200"
                            // style={{ focusRingColor: '#f3aa01' }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigationLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium relative group transition-all duration-200"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Login Button */}
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Kirish</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-black bg-opacity-20 rounded-lg backdrop-blur-sm">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4">
                                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                                    <User className="h-4 w-4" />
                                    <span>Kirish</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
        </header>
    );
};

export default Header;