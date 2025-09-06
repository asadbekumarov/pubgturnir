"use client"

import { useState, useRef } from "react"
import { Prize, Achievement } from "../../types"
import { prizes, achievements } from "../../data"
import { achievementTabs } from "../../constants"
import { getAnimationDelay, generateRandomPosition, generateRandomDelay, generateRandomDuration } from "../../utils"

const Achievements = () => {
    const [activeTab, setActiveTab] = useState("prizes")
    const sectionRef = useRef(null)

    // Umumiy kartani qaytaruvchi funksiya
    const renderCard = (item: Prize | Achievement, index: number, type: string) => {
        const Icon = item.icon
        const delay = getAnimationDelay(index, 300)

        return (
            <div
                key={index}
                className={`relative bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center border border-gray-700/50 flex flex-col h-full min-h-[320px] sm:min-h-[380px] md:min-h-[420px]`}
                style={{ animationDelay: delay }}
            >
                {/* 3D hover light */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-[#ffffff10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Rank badge - faqat mukofotlar uchun */}
                {type === "prize" && (
                    <div
                        className="absolute -top-3 sm:-top-4 md:-top-5 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-black font-extrabold text-sm sm:text-lg md:text-xl shadow-lg font-mono"
                        style={{ backgroundColor: (item as Prize).bgColor }}
                    >
                        {(item as Prize).rank}
                    </div>
                )}

                {/* Icon */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                    <div
                        className="p-3 sm:p-4 md:p-5 rounded-full"
                        style={{
                            backgroundColor: type === "prize" ? `${(item as Prize).bgColor}20` : `${(item as Achievement).color}20`,
                        }}
                    >
                        <Icon
                            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
                            style={{
                                color: type === "prize" ? (item as Prize).bgColor : (item as Achievement).color,
                            }}
                        />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {item.title}
                </h3>

                {/* Prize Amount */}
                {type === "prize" && (
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-wide" style={{ color: (item as Prize).bgColor }}>
                        {(item as Prize).prize}
                    </div>
                )}

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">{item.description}</p>

                {/* Stats - faqat yutuqlar uchun */}
                {type === "achievement" && (
                    <div className="border-t border-gray-700 pt-3 sm:pt-4 md:pt-5">
                        <div
                            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(90deg, ${(item as Achievement).color}, #ffffff)`,
                            }}
                        >
                            {(item as Achievement).count}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{(item as Achievement).label}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black   mx-auto px-4 sm:px-6 lg:px-8"
        >
            {/* Animated Stars Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            ...generateRandomPosition(),
                            animationDelay: generateRandomDelay(),
                            animationDuration: generateRandomDuration(),
                        }}
                    ></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 `}
                >
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight">
                        YUTUQ{" "}
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            }}
                        >
                            VA MUKOFOTLAR
                        </span>
                    </h2>

                    <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-400 max-w-xl sm:max-w-2xl mx-auto mt-3 sm:mt-5 leading-relaxed px-2 sm:px-4">
                        Eng yaxshi o'yinchilar uchun maxsus mukofotlar, eternal glory va global tan olinish.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 sm:mb-16">
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-full p-1 sm:p-2 px-1 sm:px-3 flex space-x-1 sm:space-x-2 border border-gray-700">
                        {achievementTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold capitalize text-xs sm:text-sm md:text-base 
                    transition transform duration-300
                    ${activeTab === tab.key
                                        ? "bg-[#f3aa01] text-black scale-105 shadow-lg"
                                        : "text-white hover:text-[#f3aa01] hover:scale-105 hover:shadow-md"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-10">
                    {activeTab === "prizes"
                        ? prizes.map((prize, index) => renderCard(prize, index, "prize"))
                        : achievements.map((ach, index) => renderCard(ach, index, "achievement"))}
                </div>
            </div>
        </section >
    )
}

export default Achievements
