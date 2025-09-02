// import React from 'react';
// import {
//     Facebook,
//     Twitter,
//     Instagram,
//     Youtube,
//     Twitch,
//     Mail,
//     Phone,
//     MapPin,
//     Users,
//     Trophy,
//     Calendar,
//     GamepadIcon,
//     Heart
// } from 'lucide-react';

// const Footer = () => {
//     const currentYear = new Date().getFullYear();

//     const socialLinks = [
//         { name: 'Facebook', icon: Facebook, href: '#', color: '#1877f2' },
//         { name: 'Twitter', icon: Twitter, href: '#', color: '#1da1f2' },
//         { name: 'Instagram', icon: Instagram, href: '#', color: '#e4405f' },
//         { name: 'YouTube', icon: Youtube, href: '#', color: '#ff0000' },
//         { name: 'Twitch', icon: Twitch, href: '#', color: '#9146ff' }
//     ];

//     const quickLinks = [
//         'Turnirlar',
//         'Komandalar',
//         'Natijalar',
//         'Jadval',
//         'Qoidalar',
//         'FAQ'
//     ];

//     const tournamentTypes = [
//         'World Championship',
//         'Regional Cups',
//         'National Leagues',
//         'Online Qualifiers',
//         'Custom Matches',
//         'Scrimmages'
//     ];

//     const supportLinks = [
//         'Yordam Markazi',
//         'Bog\'lanish',
//         'Texnik Yordam',
//         'Hisobot Berish',
//         'Community Guidelines',
//         'Maxfiylik Siyosati'
//     ];

//     return (
//         <footer className="bg-black relative overflow-hidden">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//                 <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-transparent to-yellow-500"></div>
//             </div>

//             {/* Main Footer Content */}
//             <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//                     {/* Brand Section */}
//                     <div className="lg:col-span-1">
//                         <div className="flex items-center mb-6">
//                             <div className="p-3 rounded-xl shadow-lg" style={{ backgroundColor: '#f3aa01' }}>
//                                 <GamepadIcon className="h-8 w-8 text-black" />
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="text-2xl font-bold text-white">PUBG</h3>
//                                 <p className="text-sm" style={{ color: '#f3aa01' }}>Tournament</p>
//                             </div>
//                         </div>

//                         <p className="text-gray-400 mb-6 leading-relaxed">
//                             Eng zo'r PUBG turnirlariga qatnashing va professional o'yinchilar bilan raqobatlashing.
//                             Bizning platformada eng yaxshi gaming tajribasini oling.
//                         </p>

//                         {/* Social Media */}
//                         <div className="flex space-x-4">
//                             {socialLinks.map((social) => {
//                                 const IconComponent = social.icon;
//                                 return (
//                                     <a
//                                         key={social.name}
//                                         href={social.href}
//                                         className="bg-gray-900 p-3 rounded-full hover:scale-110 transition-all duration-300 group"
//                                         style={{
//                                             ':hover': { backgroundColor: social.color }
//                                         }}
//                                         onMouseEnter={(e) => {
//                                             e.currentTarget.style.backgroundColor = social.color;
//                                         }}
//                                         onMouseLeave={(e) => {
//                                             e.currentTarget.style.backgroundColor = '#111827';
//                                         }}
//                                     >
//                                         <IconComponent className="h-5 w-5 text-white" />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
//                             <Users className="h-5 w-5 mr-2" style={{ color: '#f3aa01' }} />
//                             Tezkor Havolalar
//                         </h4>
//                         <ul className="space-y-3">
//                             {quickLinks.map((link, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href="#"
//                                         className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
//                                     >
//                                         <span className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200" style={{ backgroundColor: '#f3aa01' }}></span>
//                                         {link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Tournament Categories */}
//                     <div>
//                         <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
//                             <Trophy className="h-5 w-5 mr-2" style={{ color: '#f3aa01' }} />
//                             Turnir Turlari
//                         </h4>
//                         <ul className="space-y-3">
//                             {tournamentTypes.map((tournament, index) => (
//                                 <li key={index}>
//                                     <a
//                                         href="#"
//                                         className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
//                                     >
//                                         <span className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200" style={{ backgroundColor: '#f3aa01' }}></span>
//                                         {tournament}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Support & Contact */}
//                     <div>
//                         <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
//                             <Mail className="h-5 w-5 mr-2" style={{ color: '#f3aa01' }} />
//                             Yordam va Aloqa
//                         </h4>

//                         {/* Contact Info */}
//                         <div className="space-y-4 mb-6">
//                             <div className="flex items-start space-x-3">
//                                 <Mail className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
//                                 <div>
//                                     <p className="text-gray-400 text-sm">Email</p>
//                                     <a href="mailto:info@pubgtournament.uz" className="text-white hover:text-yellow-300 transition-colors duration-200">
//                                         info@pubgtournament.uz
//                                     </a>
//                                 </div>
//                             </div>

//                             <div className="flex items-start space-x-3">
//                                 <Phone className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
//                                 <div>
//                                     <p className="text-gray-400 text-sm">Telefon</p>
//                                     <a href="tel:+998901234567" className="text-white hover:text-yellow-300 transition-colors duration-200">
//                                         +998 90 123 45 67
//                                     </a>
//                                 </div>
//                             </div>

//                             <div className="flex items-start space-x-3">
//                                 <MapPin className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
//                                 <div>
//                                     <p className="text-gray-400 text-sm">Manzil</p>
//                                     <p className="text-white">Tashkent, O'zbekiston</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Newsletter Signup */}
//                         <div className="bg-gray-900 rounded-lg p-4">
//                             <h5 className="text-white font-semibold mb-2">Yangiliklar</h5>
//                             <p className="text-gray-400 text-sm mb-3">Eng so'nggi turnir yangilikları</p>
//                             <div className="flex">
//                                 <input
//                                     type="email"
//                                     placeholder="Email manzilingiz"
//                                     className="flex-1 bg-black text-white px-3 py-2 rounded-l-lg text-sm border border-gray-700 focus:outline-none focus:border-yellow-500"
//                                 />
//                                 <button
//                                     className="px-4 py-2 rounded-r-lg text-black font-semibold text-sm hover:opacity-90 transition-opacity duration-200"
//                                     style={{ backgroundColor: '#f3aa01' }}
//                                 >
//                                     Obuna
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Bar */}
//             <div className="bg-gray-900 border-t border-gray-800">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//                         <div>
//                             <div className="text-2xl font-bold text-white mb-1">128+</div>
//                             <div className="text-gray-400 text-sm">Faol Komandalar</div>
//                         </div>
//                         <div>
//                             <div className="text-2xl font-bold text-white mb-1">50+</div>
//                             <div className="text-gray-400 text-sm">Turnirlar</div>
//                         </div>
//                         <div>
//                             <div className="text-2xl font-bold text-white mb-1">$500K+</div>
//                             <div className="text-gray-400 text-sm">Mukofot Fondi</div>
//                         </div>
//                         <div>
//                             <div className="text-2xl font-bold text-white mb-1">10K+</div>
//                             <div className="text-gray-400 text-sm">O'yinchilar</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div className="bg-black border-t" style={{ borderColor: '#f3aa01' }}>
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//                         <div className="flex items-center space-x-4 text-gray-400 text-sm">
//                             <span>© {currentYear} PUBG Tournament Platform.</span>
//                             <span>Barcha huquqlar himoyalangan.</span>
//                         </div>

//                         <div className="flex items-center space-x-6 text-gray-400 text-sm">
//                             <a href="#" className="hover:text-white transition-colors duration-200">Maxfiylik</a>
//                             <a href="#" className="hover:text-white transition-colors duration-200">Shartlar</a>
//                             <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
//                         </div>

//                         <div className="flex items-center space-x-2 text-gray-400 text-sm">
//                             <span>Ishlab chiqildi</span>
//                             <Heart className="h-4 w-4" style={{ color: '#f3aa01' }} />
//                             <span>bilan O'zbekistonda</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Animated Background Elements */}
//             <div className="absolute top-10 left-10 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#f3aa01' }}></div>
//             <div className="absolute top-20 right-20 w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#f3aa01' }}></div>
//             <div className="absolute bottom-20 left-1/4 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#f3aa01' }}></div>
//         </footer>
//     );
// };

// export default Footer;
import React, { useState, useEffect, useRef } from 'react';
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
    Trophy,
    Calendar,
    GamepadIcon,
    Heart
} from 'lucide-react';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef(null);
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', color: '#1877f2' },
        { name: 'Twitter', icon: Twitter, href: '#', color: '#1da1f2' },
        { name: 'Instagram', icon: Instagram, href: '#', color: '#e4405f' },
        { name: 'YouTube', icon: Youtube, href: '#', color: '#ff0000' },
        { name: 'Twitch', icon: Twitch, href: '#', color: '#9146ff' }
    ];

    const quickLinks = [
        'Turnirlar',
        'Komandalar',
        'Natijalar',
        'Jadval',
        'Qoidalar',
        'FAQ'
    ];

    const tournamentTypes = [
        'World Championship',
        'Regional Cups',
        'National Leagues',
        'Online Qualifiers',
        'Custom Matches',
        'Scrimmages'
    ];

    const supportLinks = [
        'Yordam Markazi',
        'Bog\'lanish',
        'Texnik Yordam',
        'Hisobot Berish',
        'Community Guidelines',
        'Maxfiylik Siyosati'
    ];

    // Scroll qilganda animatsiya
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden bg-gradient-to-b from-gray-950 to-black"
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
                {/* Glowing horizontal lines */}
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent top-1/4 animate-pulse"></div>
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#f3aa01]/40 to-transparent bottom-1/4 animate-pulse delay-700"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <div className="flex items-center mb-6">
                            <div
                                className="p-3 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-110"
                                style={{ backgroundColor: '#f3aa01' }}
                            >
                                <GamepadIcon className="h-8 w-8 text-black" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-3xl font-black text-white">PUBG</h3>
                                <p className="text-sm font-medium" style={{ color: '#f3aa01' }}>Tournament</p>
                            </div>
                        </div>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Eng zo'r PUBG turnirlariga qatnashing va professional o'yinchilar bilan raqobatlashing.
                            Bizning platformada eng yaxshi gaming tajribasini oling.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                const delay = index * 100;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="group relative"
                                        style={{ animationDelay: `${delay}ms` }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group-hover:shadow-lg"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = social.color;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#111827';
                                            }}
                                        >
                                            <IconComponent className="h-5 w-5 text-white" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Users className="h-5 w-5 mr-3" style={{ color: '#f3aa01' }} />
                            Tezkor Havolalar
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index} className="group">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-all duration-200 flex items-center group"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full mr-3 bg-transparent group-hover:bg-[#f3aa01] transition-all duration-300"
                                        ></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tournament Categories */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Trophy className="h-5 w-5 mr-3" style={{ color: '#f3aa01' }} />
                            Turnir Turlari
                        </h4>
                        <ul className="space-y-3">
                            {tournamentTypes.map((tournament, index) => (
                                <li key={index} className="group">
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-all duration-200 flex items-center"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full mr-3 bg-transparent group-hover:bg-[#f3aa01] transition-all duration-300"
                                        ></span>
                                        {tournament}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Contact */}
                    <div className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Mail className="h-5 w-5 mr-3" style={{ color: '#f3aa01' }} />
                            Yordam va Aloqa
                        </h4>

                        {/* Contact Info */}
                        <div className="space-y-5 mb-8">
                            <div className="flex items-start space-x-3">
                                <Mail className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <a href="mailto:info@pubgtournament.uz" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                        info@pubgtournament.uz
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Phone className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
                                <div>
                                    <p className="text-gray-400 text-sm">Telefon</p>
                                    <a href="tel:+998901234567" className="text-white hover:text-yellow-300 transition-colors duration-200">
                                        +998 90 123 45 67
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 mt-1" style={{ color: '#f3aa01' }} />
                                <div>
                                    <p className="text-gray-400 text-sm">Manzil</p>
                                    <p className="text-white">Tashkent, O'zbekiston</p>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gray-900/70 w-96 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
                            <h5 className="text-white font-bold mb-2">Yangiliklar</h5>
                            <p className="text-gray-400 text-sm mb-4">Eng so'nggi turnir yangiliklarini oling</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email manzilingiz"
                                    className="flex-1 bg-black text-white px-4 py-3 rounded-l-lg text-sm border border-gray-600 focus:outline-none focus:border-[#f3aa01] transition-colors"
                                />
                                <button
                                    className="px-5 py-3 rounded-r-lg text-black font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                                    style={{ backgroundColor: '#f3aa01' }}
                                >
                                    Obuna
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-black/60 border-t border-gray-800/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "128+", label: "Faol Komandalar" },
                            { value: "50+", label: "Turnirlar" },
                            { value: "$500K+", label: "Mukofot Fondi" },
                            { value: "10K+", label: "O'yinchilar" }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-1000 delay-${(index + 5) * 100} ${isVisible ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="text-3xl font-extrabold text-white mb-1 drop-shadow-lg">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black border-t" style={{ borderColor: '#f3aa01' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
                        <div className="flex items-center space-x-4 text-gray-400">
                            <span>© {currentYear} PUBG Tournament Platform.</span>
                            <span>Barcha huquqlar himoyalangan.</span>
                        </div>

                        <div className="flex items-center space-x-6 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors duration-200">Maxfiylik</a>
                            <a href="#" className="hover:text-white transition-colors duration-200">Shartlar</a>
                            <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-400">
                            <span>Ishlab chiqildi</span>
                            <Heart className="h-4 w-4" style={{ color: '#f3aa01' }} />
                            <span>bilan O'zbekistonda</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Glow Dots */}
            <div className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#f3aa01' }}></div>
            <div className="absolute top-16 right-16 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#f3aa01' }}></div>
            <div className="absolute bottom-16 left-1/4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#f3aa01' }}></div>
        </footer>
    );
};

export default Footer;