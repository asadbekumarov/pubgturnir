"use client"

import { useState, useEffect, useRef } from "react"
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Twitch,
    Mail,
    Phone,
    MapPin,
    Users,
    GamepadIcon,
} from "lucide-react"

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false)
    const footerRef = useRef(null)
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: "Facebook", icon: Facebook, href: "#", color: "#1877f2" },
        { name: "Twitter", icon: Twitter, href: "#", color: "#1da1f2" },
        { name: "Instagram", icon: Instagram, href: "#", color: "#e4405f" },
        { name: "YouTube", icon: Youtube, href: "#", color: "#ff0000" },
        { name: "Twitch", icon: Twitch, href: "#", color: "#9146ff" },
    ]

    const quickLinks = ["Turnirlar", "Natijalar", "Jadval", "Qoidalar", "FAQ"]


    // Scroll qilganda animatsiya
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (footerRef.current) observer.observe(footerRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <footer ref={footerRef} className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black">
            {/* Animated Stars Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                    {/* Brand Section */}
                    <div
                        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div
                                className="p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110"
                                style={{ backgroundColor: "#f3aa01" }}
                            >
                                <GamepadIcon className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <h3 className="text-2xl sm:text-3xl font-black text-white">PUBG</h3>
                                <p className="text-xs sm:text-sm font-medium" style={{ color: "#f3aa01" }}>
                                    Tournament
                                </p>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                            Eng zo'r PUBG turnirlariga qatnashing va professional o'yinchilar bilan raqobatlashing. Bizning
                            platformada eng yaxshi gaming tajribasini oling.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-3 sm:space-x-4">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon
                                const delay = index * 100
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="group relative"
                                        style={{ animationDelay: `${delay}ms` }}
                                    >
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group-hover:shadow-lg"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = social.color
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "#111827"
                                            }}
                                        >
                                            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div
                        className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" style={{ color: "#f3aa01" }} />
                            Tezkor Havolalar
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index} className="group">
                                    <a
                                        href="#"
                                        className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-200 flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 bg-transparent group-hover:bg-[#f3aa01] transition-all duration-300"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" style={{ color: "#f3aa01" }} />
                            Yordam va Aloqa
                        </h4>

                        {/* Contact Info */}
                        <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-1" style={{ color: "#f3aa01" }} />
                                <div>
                                    <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                                    <a
                                        href="mailto:info@pubgtournament.uz"
                                        className="text-sm sm:text-base text-white hover:text-yellow-300 transition-colors duration-200 break-all"
                                    >
                                        info@pubgtournament.uz
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-1" style={{ color: "#f3aa01" }} />
                                <div>
                                    <p className="text-gray-400 text-xs sm:text-sm">Telefon</p>
                                    <a
                                        href="tel:+998901234567"
                                        className="text-sm sm:text-base text-white hover:text-yellow-300 transition-colors duration-200"
                                    >
                                        +998 90 123 45 67
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2 sm:space-x-3">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1" style={{ color: "#f3aa01" }} />
                                <div>
                                    <p className="text-gray-400 text-xs sm:text-sm">Manzil</p>
                                    <p className="text-sm sm:text-base text-white">Tashkent, O'zbekiston</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <div>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-5">
                    <div className="flex flex-col sm:flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0 text-xs sm:text-sm">
                        <div className="flex flex-col xs:flex-row items-center space-y-1 xs:space-y-0 xs:space-x-4 text-gray-400 text-center xs:text-left">
                            <span>© {currentYear} PUBG Tournament Platform.</span>
                            <span className="hidden xs:inline">•</span>
                            <span>Barcha huquqlar himoyalangan.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Glow Dots */}
            <div
                className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: "#f3aa01" }}
            ></div>
            <div
                className="absolute top-16 right-16 w-1 h-1 rounded-full animate-pulse"
                style={{ backgroundColor: "#f3aa01" }}
            ></div>
            <div
                className="absolute bottom-16 left-1/4 w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: "#f3aa01" }}
            ></div>
        </footer>
    )
}

export default Footer
