import React, { useState, useEffect, useRef } from "react";
import { Trophy, Medal, Star, Crown, Target, Zap } from "lucide-react";

const Achievements = () => {
    const [activeTab, setActiveTab] = useState("prizes");
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Scroll qilganda animatsiya uchun
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const prizes = [
        {
            rank: "1",
            title: "BIRINCHI O'RIN",
            prize: "$25,000",
            description: "Oltin medal va eternal trophy",
            icon: Crown,
            bgColor: "#f3aa01",
            glow: "#f3aa01",
        },
        {
            rank: "2",
            title: "IKKINCHI O'RIN",
            prize: "$15,000",
            description: "Kumush medal va premium rewards",
            icon: Trophy,
            bgColor: "#c0c0c0",
            glow: "#c0c0c0",
        },
        {
            rank: "3",
            title: "UCHINCHI O'RIN",
            prize: "$10,000",
            description: "Bronza medal va special items",
            icon: Medal,
            bgColor: "#cd7f32",
            glow: "#cd7f32",
        },
    ];

    const achievements = [
        {
            title: "HEADSHOT MASTER",
            description: "100+ headshot kills",
            icon: Target,
            count: "2,547",
            label: "Foydalanuvchilar oldi",
            color: "#f3aa01",
        },
        {
            title: "SURVIVAL KING",
            description: "Top 10 da 50 marta",
            icon: Star,
            count: "1,892",
            label: "Foydalanuvchilar oldi",
            color: "#00d4ff",
        },
        {
            title: "KILL STREAK",
            description: "10+ kills bir o'yinda",
            icon: Zap,
            count: "758",
            label: "Foydalanuvchilar oldi",
            color: "#ff4081",
        },
    ];

    // Umumiy kartani qaytaruvchi funksiya
    const renderCard = (item, index, type) => {
        const Icon = item.icon;
        const delay = (index + 1) * 300;

        return (
            <div
                key={index}
                className={`relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                    animationDelay: `${delay}ms`,
                }}
            >
                {/* 3D hover light */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-[#ffffff10] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Rank badge - faqat mukofotlar uchun */}
                {type === "prize" && (
                    <div
                        className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-black font-extrabold text-xl shadow-lg font-mono"
                        style={{ backgroundColor: item.bgColor }}
                    >
                        {item.rank}
                    </div>
                )}

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div
                        className="p-5 rounded-full transition-all duration-500 group-hover:scale-110"
                        style={{
                            backgroundColor: type === "prize" ? `${item.bgColor}20` : `${item.color}20`,
                        }}
                    >
                        <Icon
                            className="h-12 w-12 transition-all duration-300"
                            style={{
                                color: type === "prize" ? item.bgColor : item.color,
                            }}
                        />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ffffff] transition-colors">
                    {item.title}
                </h3>

                {/* Prize Amount */}
                {type === "prize" && (
                    <div
                        className="text-4xl font-extrabold mb-4 tracking-wide"
                        style={{ color: item.bgColor }}
                    >
                        {item.prize}
                    </div>
                )}

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">{item.description}</p>

                {/* Stats - faqat yutuqlar uchun */}
                {type === "achievement" && (
                    <div className="border-t border-gray-700 pt-5">
                        <div
                            className="text-3xl font-extrabold text-transparent bg-clip-text"
                            style={{
                                backgroundImage: `linear-gradient(90deg, ${item.color}, #ffffff)`,
                            }}
                        >
                            {item.count}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="py-28 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
        >
            {/* Animated Stars Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
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
                {/* Glowing horizontal lines */}
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent top-1/3 animate-pulse"></div>
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent bottom-1/3 animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                        YUTUQ{" "}
                        <span
                            className="block bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(243,170,1,0.6)]"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            }}
                        >
                            VA MUKOFOTLAR
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed">
                        Eng yaxshi o'yinchilar uchun maxsus mukofotlar, eternal glory va global tan olinish.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-full p-2 px-3 flex space-x-2 shadow-xl border border-gray-700">
                        {["prizes", "achievements"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-bold transition-all duration-500 capitalize ${
                                    activeTab === tab
                                        ? "bg-[#f3aa01] text-black shadow-[0_0_30px_#f3aa01] scale-105"
                                        : "text-white hover:text-[#f3aa01] hover:scale-105"
                                }`}
                            >
                                {tab === "prizes" ? "MUKOFOTLAR" : "YUTUQLAR"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {activeTab === "prizes"
                        ? prizes.map((prize, index) => renderCard(prize, index, "prize"))
                        : achievements.map((ach, index) => renderCard(ach, index, "achievement"))
                    }
                </div>

                {/* CTA Button */}
                <div
                    className={`text-center mt-24 transition-all duration-1000 delay-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <button className="group px-14 py-6 text-xl font-extrabold text-black rounded-full bg-gradient-to-r from-[#f3aa01] to-[#ffcf40] shadow-[0_0_30px_#f3aa01] hover:shadow-[0_0_50px_#f3aa01] hover:scale-110 transition-all duration-500 transform relative overflow-hidden">
                        <span className="relative z-10">HOZIROQ RO'YXATDAN O'TING</span>
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Achievements;