import HeroBG from "../../assets/img/HeroBG.avif"

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url(${HeroBG})`,
                }}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold mb-3 sm:mb-5 md:mb-6 lg:mb-8 leading-tight tracking-wide">
                    <span className="text-white">PUBG</span>
                    <span
                        className="block text-[#f3aa01] bg-clip-text"
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

                <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
                    Eng kuchli komandalar bilan kurash olib boring va{" "}
                    <span className="text-[#f3aa01] font-semibold">champion</span> bo'ling
                </p>

                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
                    <a href="/participation" className="w-full xs:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-4 text-sm sm:text-base font-bold rounded-full bg-[#f3aa01] text-black 
        transition transform hover:scale-105 hover:shadow-lg duration-300">
                        QATNASHISH
                    </a>
                    <a href="/login" className="w-full xs:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-full border-2 border-[#f3aa01] text-white 
        hover:bg-[#f3aa01] hover:text-black transition transform hover:scale-105 hover:shadow-lg duration-300">
                        BATAFSIL
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-6 sm:pt-8 md:pt-10">
                    {[
                        { title: "MUKOFOT FONDI", value: "$50,000" },
                        { title: "KOMANDALAR", value: "128" },
                        { title: "SANA", value: "15 DEKABR" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl border border-[#f3aa01]/40"
                        >
                            <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#f3aa01]">{item.value}</p>
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
