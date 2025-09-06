const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2070&q=80')`,
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 sm:mb-6 md:mb-10 leading-tight tracking-wide">
                    <span className="text-white drop-shadow-lg">PUBG</span>
                    <span
                        className="block text-[#f3aa01] bg-clip-text drop-shadow-[0_0_20px_#f3aa01]"
                        style={{
                            backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "#f3aa01",
                        }}
                    >
                        CHAMPIONSHIP
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                    Eng kuchli komandalar bilan kurash olib boring va{" "}
                    <span className="text-[#f3aa01] font-semibold">champion</span> bo'ling
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20 md:mb-24">
                    <button className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold rounded-full bg-[#f3aa01] text-black shadow-[0_0_20px_#f3aa01] hover:shadow-[0_0_40px_#f3aa01] hover:scale-105 transition-all duration-300 transform">
                        QATNASHISH
                    </button>
                    <button className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-bold rounded-full border-2 border-[#f3aa01] text-white hover:bg-[#f3aa01] hover:text-black transition-all duration-300 transform hover:scale-105">
                        BATAFSIL
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pt-10">
                    {[
                        { title: "MUKOFOT FONDI", value: "$50,000" },
                        { title: "KOMANDALAR", value: "128" },
                        { title: "SANA", value: "15 DEKABR" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-black/70 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-[#f3aa01]/40 hover:scale-105 hover:shadow-[0_0_30px_#f3aa01] transition-all duration-300 transform group"
                        >
                            <h3 className="text-sm sm:text-base lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#f3aa01] transition-colors">{item.title}</h3>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f3aa01] group-hover:scale-110 transition-transform duration-300">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Glowing lines background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#f3aa01] to-transparent top-1/3 animate-pulse opacity-40"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#f3aa01] to-transparent top-2/3 animate-pulse opacity-40 delay-500"></div> */}
            </div>
        </section>
    )
}

export default Hero
