import React from "react";

const Hero = () => {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
        >
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2070&q=80')`,
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-wide">
                    <span className="text-white drop-shadow-lg">PUBG</span>
                    <span
                        className="block text-transparent bg-clip-text drop-shadow-[0_0_20px_#f3aa01]"
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                        }}
                    >
                        CHAMPIONSHIP
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Eng kuchli komandalar bilan kurash olib boring va{" "}
                    <span className="text-[#f3aa01] font-semibold">champion</span> bo'ling
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <button className="px-10 py-4 text-lg font-bold rounded-full bg-[#f3aa01] text-black shadow-[0_0_15px_#f3aa01] hover:shadow-[0_0_30px_#f3aa01] hover:scale-105 transition duration-300">
                        QATNASHISH
                    </button>
                    <button className="px-10 py-4 text-lg font-bold rounded-full border-2 border-[#f3aa01] text-white hover:bg-[#f3aa01] hover:text-black transition duration-300">
                        BATAFSIL
                    </button>
                </div>

                {/* Tournament Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
                    {[
                        { title: "MUKOFOT FONDI", value: "$50,000" },
                        { title: "KOMANDALAR", value: "128" },
                        { title: "SANA", value: "15 DEKABR" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-black/70 backdrop-blur-md p-8 rounded-2xl border border-[#f3aa01]/40 hover:scale-105 hover:shadow-[0_0_20px_#f3aa01] transition duration-300"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-3xl font-extrabold text-[#f3aa01]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glowing lines background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#f3aa01] to-transparent top-1/3 animate-pulse opacity-40"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#f3aa01] to-transparent top-2/3 animate-pulse opacity-40 delay-500"></div>
            </div>
        </section>
    );
};

export default Hero;
