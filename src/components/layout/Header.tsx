"use client"

import { useRef } from "react"
import { Menu, X, User } from "lucide-react"
import { useScroll, useElementSize, useMobileMenu } from "../../hooks"
import { navigationLinks } from "../../constants"

const Header = () => {
    const headerRef = useRef<HTMLElement>(null)
    const isScrolled = useScroll()
    const { height: headerHeight } = useElementSize(headerRef)
    const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu()

    return (
        <>
            {/* HEADER */}
            <header
                ref={headerRef}
                id="main-header"
                className={`sticky top-0 left-0 w-full z-50 border-b-2 
                     ${isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-black/95"} 
                     ${isMobileMenuOpen ? "border-transparent" : "border-[#f3aa01]"}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 sm:py-3 md:py-3">
                        {/* Logo */}
                        <a href="#" className="flex items-center group">
                            <div className="p-3 rounded-lg sm:rounded-xl bg-[#f3aa01]">
                                <span className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-black">PUBG</span>
                            </div>
                            <div className="ml-2 sm:ml-3 md:ml-4">
                                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">Tournament</h1>
                                <p className="text-xs sm:text-sm text-[#f3aa01] hidden xs:block">Battle Royale</p>
                            </div>
                        </a>

                        {/* Desktop menu */}
                        <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white hover:text-[#f3aa01] px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Kirish button */}
                        <div className="hidden md:flex items-center">
                            <button className="bg-gradient-to-r from-[#f3aa01] to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-1.5 px-3 sm:px-4 lg:px-6 rounded-full flex items-center space-x-1 sm:space-x-2">
                                <User className="h-4 w-4" />
                                <span className="hidden lg:inline">Kirish</span>
                            </button>
                        </div>

                        {/* Mobile toggle */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="bg-white/10 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-white/20"
                                onClick={toggleMobileMenu}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MOBILE MENU */}
            <div
                className={` fixed top-0 left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
                style={{ top: `${headerHeight}px` }}
            >
                <div className="flex flex-col items-center justify-start pt-8 sm:pt-12 space-y-4 sm:space-y-6 px-4 sm:px-6 pb-8">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-[#f3aa01] text-lg sm:text-xl md:text-2xl font-semibold w-full text-center"
                            onClick={closeMobileMenu}
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* Kirish button */}
                    <div className="w-full flex justify-center relative mt-4">
                        <button
                            className="bg-gradient-to-r from-[#f3aa01] to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-2 px-6 rounded-full flex items-center justify-center space-x-2 text-sm sm:text-base"
                            onClick={closeMobileMenu}
                        >
                            <User className="h-5 w-5" />
                            <span>Kirish</span>
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f3aa01]"></div>
            </div>
        </>
    )
}

export default Header
