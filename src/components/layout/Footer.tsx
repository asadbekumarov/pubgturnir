// "use client"

// import { useRef } from "react"

// import { Mail, Phone, MapPin, Users, GamepadIcon } from "lucide-react"
// import { socialLinks, quickLinks } from "../../constants"

// const Footer = () => {
//     const footerRef = useRef<HTMLElement | null>(null)

//     return (
//         <footer ref={footerRef} className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black px-4">
//             {/* Animated Stars */}
//             <div className="absolute inset-0 z-0 overflow-hidden">
//                 {[...Array(15)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 3}s`,
//                             animationDuration: `${2 + Math.random() * 3}s`,
//                         }}
//                     />
//                 ))}
//             </div>

//             {/* Main Content */}
//             <div className="relative z-10 max-w-7xl py-10 sm:py-12 md:py-16 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
//                     {/* Brand */}
//                     <div>
//                         <div className="flex items-center mb-4 sm:mb-6">
//                             <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#f3aa01]">
//                                 <GamepadIcon className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
//                             </div>
//                             <div className="ml-3 sm:ml-4">
//                                 <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">PUBG</h3>
//                                 <p className="text-xs sm:text-sm font-medium text-[#f3aa01]">Tournament</p>
//                             </div>
//                         </div>
//                         <p className="max-w-96 text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
//                             Eng zo'r PUBG turnirlariga qatnashing va professional o'yinchilar bilan raqobatlashing. Bizning platformada eng yaxshi gaming tajribasini oling.
//                         </p>

//                         {/* Social Links */}
//                         <div className="flex space-x-3 sm:space-x-4">
//                             {socialLinks.map((social, index) => {
//                                 const IconComponent = social.icon
//                                 return (
//                                     <a
//                                         key={index}
//                                         href={social.href}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 flex items-center justify-center transition-colors duration-200 hover:bg-[#da9902]"
//                                     >
//                                         <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                                     </a>
//                                 )
//                             })}
//                         </div>
//                     </div>

//                     {/* Quick Links & Contact */}
//                     <div className="flex flex-col sm:flex-row justify-between flex-2 gap-8 sm:gap-16">
//                         {/* Quick Links */}
//                         <div >
//                             <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
//                                 <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#f3aa01]" />
//                                 Tezkor Havolalar
//                             </h4>
//                             <ul className="space-y-2">
//                                 {quickLinks.map((link, idx) => (
//                                     <li key={idx}>
//                                         <a
//                                             href={link.href}
//                                             className="text-sm sm:text-base text-gray-400 hover:text-[#da9902] transition-colors duration-200 flex items-center"
//                                         >
//                                             <span className="w-2 h-2 rounded-full mr-2 sm:mr-3 bg-transparent group-hover:bg-[#da9902] transition-colors duration-200"></span>
//                                             {link.label}
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Support & Contact */}
//                         <div >
//                             <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
//                                 <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#f3aa01]" />
//                                 Yordam va Aloqa
//                             </h4>
//                             <div className="space-y-4">
//                                 <div className="flex items-start space-x-2 sm:space-x-3">
//                                     <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
//                                     <div>
//                                         <p className="text-gray-400 text-xs sm:text-sm">Email</p>
//                                         <a href="mailto:info@pubgtournament.uz" className="text-sm sm:text-base text-white hover:text-[#da9902] break-all">
//                                             info@pubgtournament.uz
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start space-x-2 sm:space-x-3">
//                                     <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
//                                     <div>
//                                         <p className="text-gray-400 text-xs sm:text-sm">Telefon</p>
//                                         <a href="tel:+998901234567" className="text-sm sm:text-base text-white hover:text-[#da9902]">
//                                             +998 90 123 45 67
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start space-x-2 sm:space-x-3">
//                                     <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
//                                     <div>
//                                         <p className="text-gray-400 text-xs sm:text-sm">Manzil</p>
//                                         <p className="text-sm sm:text-base text-white">Tashkent, O'zbekiston</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer
"use client"

import { useRef } from "react"
import { Mail, Phone, MapPin, Users, GamepadIcon } from "lucide-react"
import { socialLinks, quickLinks } from "../../constants"

// Define the icon type to fix TypeScript issues
type IconComponentType = React.ComponentType<{
    className?: string;
    size?: number | string;
}>;

const Footer = () => {
    const footerRef = useRef<HTMLElement | null>(null)

    return (
        <footer ref={footerRef} className="relative overflow-hidden bg-[#000102] px-4">
            {/* Animated Stars */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl py-10 sm:py-12 md:py-16 lg:py-20 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center mb-4 sm:mb-6">
                            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#f3aa01]">
                                <GamepadIcon className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                            </div>
                            <div className="ml-3 sm:ml-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">PUBG</h3>
                                <p className="text-xs sm:text-sm font-medium text-[#f3aa01]">Tournament</p>
                            </div>
                        </div>
                        <p className="max-w-96 text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                            Eng zo'r PUBG turnirlariga qatnashing va professional o'yinchilar bilan raqobatlashing. Bizning platformada eng yaxshi gaming tajribasini oling.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-3 sm:space-x-4">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon as IconComponentType;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 flex items-center justify-center transition-colors duration-200 hover:bg-[#da9902]"
                                    >
                                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links & Contact */}
                    <div className="flex flex-col sm:flex-row justify-between flex-2 gap-8 sm:gap-16">
                        {/* Quick Links */}
                        <div >
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                                <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#f3aa01]" />
                                Tezkor Havolalar
                            </h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={link.href}
                                            className="text-sm sm:text-base text-gray-400 hover:text-[#da9902] transition-colors duration-200 flex items-center"
                                        >
                                            <span className="w-2 h-2 rounded-full mr-2 sm:mr-3 bg-transparent group-hover:bg-[#da9902] transition-colors duration-200"></span>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support & Contact */}
                        <div >
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-[#f3aa01]" />
                                Yordam va Aloqa
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-2 sm:space-x-3">
                                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                                        <a href="mailto:info@pubgtournament.uz" className="text-sm sm:text-base text-white hover:text-[#da9902] break-all">
                                            info@pubgtournament.uz
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2 sm:space-x-3">
                                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Telefon</p>
                                        <a href="tel:+998901234567" className="text-sm sm:text-base text-white hover:text-[#da9902]">
                                            +998 90 123 45 67
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2 sm:space-x-3">
                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-[#f3aa01]" />
                                    <div>
                                        <p className="text-gray-400 text-xs sm:text-sm">Manzil</p>
                                        <p className="text-sm sm:text-base text-white">Tashkent, O'zbekiston</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer