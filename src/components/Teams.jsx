"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Star, Trophy, Zap, Shield, Target } from "lucide-react"

const Teams = () => {
    const [activeCategory, setActiveCategory] = useState("top")
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const topTeams = [
        {
            id: 1,
            name: "THUNDER SQUAD",
            country: "UZB",
            rank: 1,
            points: 2547,
            wins: 43,
            members: ["WARRIOR_UZ", "STORM_KING", "THUNDER_GOD", "SNIPER_PRO"],
            logo: "⚡",
            bgColor: "#f3aa01",
            status: "CHAMPION",
        },
        {
            id: 2,
            name: "FIRE EAGLES",
            country: "KOR",
            rank: 2,
            points: 2341,
            wins: 38,
            members: ["EAGLE_EYE", "FIRE_STORM", "WING_MASTER", "SKY_HUNTER"],
            logo: "🔥",
            bgColor: "#ff4444",
            status: "PRO",
        },
        {
            id: 3,
            name: "SHADOW WOLVES",
            country: "RUS",
            rank: 3,
            points: 2198,
            wins: 35,
            members: ["SHADOW_X", "WOLF_ALPHA", "DARK_BLADE", "NIGHT_OPS"],
            logo: "🐺",
            bgColor: "#8b5cf6",
            status: "PRO",
        },
        {
            id: 4,
            name: "CYBER DRAGONS",
            country: "CHN",
            rank: 4,
            points: 2045,
            wins: 31,
            members: ["CYBER_001", "DRAGON_FLY", "TECH_MASTER", "CODE_NINJA"],
            logo: "🐲",
            bgColor: "#10b981",
            status: "RISING",
        },
    ]

    const newTeams = [
        {
            id: 5,
            name: "PHOENIX RISING",
            country: "TUR",
            rank: 12,
            points: 1654,
            wins: 18,
            members: ["PHOENIX_01", "FIRE_BIRD", "ASH_WALKER", "FLAME_SOUL"],
            logo: "🔥",
            bgColor: "#f59e0b",
            status: "ROOKIE",
        },
        {
            id: 6,
            name: "ICE BREAKERS",
            country: "NOR",
            rank: 15,
            points: 1432,
            wins: 14,
            members: ["ICE_COLD", "FROST_BITE", "SNOW_WOLF", "ARCTIC_FOX"],
            logo: "❄️",
            bgColor: "#3b82f6",
            status: "ROOKIE",
        },
    ]

    const localTeams = [
        {
            id: 7,
            name: "TASHKENT TIGERS",
            country: "UZB",
            rank: 8,
            points: 1876,
            wins: 24,
            members: ["TIGER_UZ", "TASH_HERO", "SILK_ROAD", "REGISTAN"],
            logo: "🐅",
            bgColor: "#f3aa01",
            status: "LOCAL",
        },
        {
            id: 8,
            name: "SAMARKAND LIONS",
            country: "UZB",
            rank: 11,
            points: 1698,
            wins: 19,
            members: ["LION_SMK", "GOLDEN_DOME", "BLUE_CITY", "ANCIENT_WAR"],
            logo: "🦁",
            bgColor: "#f3aa01",
            status: "LOCAL",
        },
    ]

    const getTeamsByCategory = () => {
        switch (activeCategory) {
            case "top":
                return topTeams
            case "new":
                return newTeams
            case "local":
                return localTeams
            default:
                return topTeams
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "CHAMPION":
                return <Trophy className="h-4 w-4" />
            case "PRO":
                return <Star className="h-4 w-4" />
            case "RISING":
                return <Zap className="h-4 w-4" />
            case "ROOKIE":
                return <Shield className="h-4 w-4" />
            case "LOCAL":
                return <Target className="h-4 w-4" />
            default:
                return <Users className="h-4 w-4" />
        }
    }

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
        >
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
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent top-1/3 animate-pulse"></div>
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent bottom-1/3 animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    className={`text-center mb-10 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight">
                        ENG KUCHLI
                        <span
                            className="block bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(243,170,1,0.6)]"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            }}
                        >
                            KOMANDALAR
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl sm:max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed">
                        Dunyo bo'ylab eng professional komandalar bilan tanishing va ularga qarshi jang eting.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-10 md:mb-16">
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-full p-1 px-2 flex flex-wrap justify-center space-x-1 shadow-xl border border-gray-700">
                        {[
                            { key: "top", label: "TOP KOMANDALAR", icon: Trophy },
                            { key: "new", label: "YANGI", icon: Zap },
                            { key: "local", label: "MAHALLIY", icon: Target },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 flex items-center space-x-2 mb-1 sm:mb-0 ${activeCategory === key
                                        ? "bg-[#f3aa01] text-black shadow-[0_0_20px_#f3aa01] scale-105"
                                        : "text-white hover:text-[#f3aa01]"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {getTeamsByCategory().map((team, index) => {
                        const delay = (index + 1) * 200
                        return (
                            <div
                                key={team.id}
                                className={`relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{
                                    animationDelay: `${delay}ms`,
                                    boxShadow: `0 0 20px ${team.bgColor}10`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = team.bgColor
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "#374151"
                                }}
                            >
                                {/* 3D Light Overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Team Header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div
                                            className="text-4xl sm:text-5xl p-3 sm:p-4 rounded-xl transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: `${team.bgColor}20` }}
                                        >
                                            {team.logo}
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{team.name}</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-400 text-xs sm:text-sm">{team.country}</span>
                                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                                <div
                                                    className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold"
                                                    style={{
                                                        backgroundColor: `${team.bgColor}30`,
                                                        color: team.bgColor,
                                                    }}
                                                >
                                                    {getStatusIcon(team.status)}
                                                    <span>{team.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rank Badge */}
                                    <div
                                        className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-base sm:text-lg font-extrabold text-black"
                                        style={{ backgroundColor: team.bgColor }}
                                    >
                                        #{team.rank}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-5">
                                    <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 text-center">
                                        <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: team.bgColor }}>
                                            {team.points}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-400">OCHKO</div>
                                    </div>
                                    <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 text-center">
                                        <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: team.bgColor }}>
                                            {team.wins}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-400">G'ALABALAR</div>
                                    </div>
                                </div>

                                {/* Members */}
                                <div>
                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">JAMOA A'ZOLARI:</h4>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {team.members.map((member, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-800/60 rounded-md sm:rounded-lg px-2 py-1 text-xs sm:text-sm font-medium text-white hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                {member}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA Button */}
                <div
                    className={`text-center mt-16 sm:mt-20 md:mt-24 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                    <button className="group w-full sm:w-auto px-10 py-4 sm:px-14 sm:py-6 text-base sm:text-xl font-extrabold text-black rounded-full bg-gradient-to-r from-[#f3aa01] to-[#ffcf40] shadow-[0_0_20px_#f3aa01] hover:shadow-[0_0_40px_#f3aa01] hover:scale-105 transition-all duration-300 transform relative overflow-hidden">
                        <span className="relative z-10">BARCHA KOMANDALARNI KO'RISH</span>
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Teams
