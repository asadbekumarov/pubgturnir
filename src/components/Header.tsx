"use client"

import { useState, useEffect } from "react"
import { Menu, X, User } from "lucide-react"

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const navigationLinks = [
        { name: "Natijalar", href: "#results" },
        // { name: "Komandalar", href: "#teams" },
        { name: "Turnirlar", href: "#tournaments" },
        { name: "Jadval", href: "#table" },
    ]

    // Scrollni kuzatish
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <header
                className={`sticky top-0 left-0 w-full h-auto z-50 border-b-2 border-yellow-500 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black/95"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center sm:py-4 md:py-4">
                        <div className="flex items-center">
                            <a href="#" className="flex items-center group">
                                <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-200 bg-[#f3aa01]">
                                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-black">PUBG</span>
                                </div>
                                <div className="ml-2 sm:ml-3 md:ml-4">
                                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Tournament</h1>
                                    <p className="text-xs sm:text-sm text-[#f3aa01] hidden sm:block">Battle Royale</p>
                                </div>
                            </a>
                        </div>

                        {/* Desktop Navigation - Better responsive hiding */}
                        <nav className="hidden lg:flex space-x-6 xl:space-x-8">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white hover:text-[#f3aa01] px-3 py-2 rounded-md text-sm font-medium relative group transition-all duration-200"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f3aa01] group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Login Button - Better responsive visibility */}
                        <div className="hidden lg:flex items-center">
                            <button className="bg-gradient-to-r from-[#f3aa01] to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-4 xl:px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="hidden xl:inline">Kirish</span>
                            </button>
                        </div>

                        {/* Mobile menu button - Improved mobile button */}
                        <div className="lg:hidden">
                            <button
                                type="button"
                                className="bg-white/10 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#f3aa01] transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded="false"
                                aria-label="Menyuni ochish"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
{/* <div></div> */}
                {/* Mobile Menu - Improved mobile menu with better animations */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                >
                    <div className="px-4 pt-2 pb-4 space-y-1 bg-black/90 backdrop-blur-sm">
                        {navigationLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white hover:text-[#f3aa01] hover:bg-white/10 block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 transform hover:translate-x-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-4 px-3">
                            <button
                                className="w-full bg-gradient-to-r from-[#f3aa01] to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 text-base"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>Kirish</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative gradient line */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f3aa01] via-orange-500 to-red-500"></div> */}
            </header>

            {/* <div className="h-[62px] md:h-[80px]"></div> */}
        </>
    )
}

export default Header
