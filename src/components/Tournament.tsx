
import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, DollarSign, MapPin, Play, Trophy, Star } from 'lucide-react';

interface Tournament {
    id: number
    title: string
    date: string
    time: string
    location: string
    prizePool: string
    teams: number
    participants: number
    status: string
    image: string
    type: string
    featured: boolean
    viewers?: string
    winner?: string
}

const Tournament = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
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

    const upcomingTournaments: Tournament[] = [
        {
            id: 1,
            title: 'PUBG WORLD CHAMPIONSHIP 2024',
            date: '15 Dekabr 2024',
            time: '18:00',
            location: 'Tashkent, O\'zbekiston',
            prizePool: '$100,000',
            teams: 128,
            participants: 512,
            status: 'REGISTRATION_OPEN',
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'MAJOR',
            featured: true
        },
        {
            id: 2,
            title: 'ASIAN CUP QUALIFIER',
            date: '28 Dekabr 2024',
            time: '20:00',
            location: 'Online',
            prizePool: '$25,000',
            teams: 64,
            participants: 256,
            status: 'REGISTRATION_OPEN',
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'QUALIFIER',
            featured: false
        },
        {
            id: 3,
            title: 'UZBEKISTAN NATIONAL CUP',
            date: '5 Yanvar 2025',
            time: '19:00',
            location: 'Samarkand, O\'zbekiston',
            prizePool: '$15,000',
            teams: 32,
            participants: 128,
            status: 'COMING_SOON',
            image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'NATIONAL',
            featured: false
        }
    ];

    const liveTournaments: Tournament[] = [
        {
            id: 4,
            title: 'WINTER SHOWDOWN',
            date: 'JONLI',
            time: 'Match 3/5',
            location: 'Erangel',
            prizePool: '$50,000',
            teams: 16,
            participants: 64,
            status: 'LIVE',
            image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'LIVE',
            featured: true,
            viewers: '45.2K'
        }
    ];

    const completedTournaments: Tournament[] = [
        {
            id: 5,
            title: 'AUTUMN CHAMPIONSHIP',
            date: '15 Noyabr 2024',
            time: 'Tugallangan',
            location: 'Dubai, UAE',
            prizePool: '$75,000',
            teams: 64,
            participants: 256,
            status: 'COMPLETED',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'MAJOR',
            featured: false,
            winner: 'THUNDER SQUAD'
        },
        {
            id: 6,
            title: 'CENTRAL ASIA CUP',
            date: '3 Noyabr 2024',
            time: 'Tugallangan',
            location: 'Tashkent, O\'zbekiston',
            prizePool: '$30,000',
            teams: 32,
            participants: 128,
            status: 'COMPLETED',
            image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            type: 'REGIONAL',
            featured: false,
            winner: 'TASHKENT TIGERS'
        }
    ];

    const getTournamentsByTab = () => {
        switch (activeTab) {
            case 'upcoming': return upcomingTournaments;
            case 'live': return liveTournaments;
            case 'completed': return completedTournaments;
            default: return upcomingTournaments;
        }
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { text: string; color: string }> = {
            'REGISTRATION_OPEN': { text: 'RO\'YXAT OCHIQ', color: '#10b981' },
            'COMING_SOON': { text: 'TEZDA', color: '#f59e0b' },
            'LIVE': { text: 'JONLI', color: '#ef4444' },
            'COMPLETED': { text: 'TUGALLANGAN', color: '#6b7280' }
        };
        return badges[status] || badges['COMING_SOON'];
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'MAJOR': return <Trophy className="h-4 w-4" />;
            case 'LIVE': return <Play className="h-4 w-4" />;
            default: return <Star className="h-4 w-4" />;
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
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

            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                        BARCHA
                        <span
                            className="block bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(243,170,1,0.6)]"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            }}
                        >
                            TURNIRLAR
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6 leading-relaxed px-4">
                        Eng zo'r turnirlar va professional musobaqalarda ishtirok eting.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16 px-4">
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-full p-2 px-3 flex space-x-2 shadow-xl border border-gray-700">
                        {[
                            { key: 'upcoming', label: 'KELAYOTGAN', icon: Calendar },
                            { key: 'live', label: 'JONLI', icon: Play },
                            { key: 'completed', label: 'TUGALLANGAN', icon: Trophy },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-500 flex items-center space-x-2 text-sm sm:text-base ${activeTab === key
                                    ? "bg-[#f3aa01] text-black shadow-[0_0_30px_#f3aa01] scale-105"
                                    : "text-white hover:text-[#f3aa01] hover:scale-105"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tournaments Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                    {getTournamentsByTab().map((tournament, index) => {
                        const delay = (index + 1) * 300;
                        const statusBadge = getStatusBadge(tournament.status);
                        return (
                            <div
                                key={tournament.id}
                                className={`relative bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    } ${tournament.featured ? 'lg:col-span-2 xl:col-span-1' : ''}`}
                                style={{
                                    animationDelay: `${delay}ms`,
                                }}
                            >
                                {/* 3D Light Overlay */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={tournament.image}
                                        alt={tournament.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                    {/* Status Badge */}
                                    <div
                                        className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-white font-bold text-sm flex items-center space-x-2"
                                        style={{ backgroundColor: statusBadge.color }}
                                    >
                                        {tournament.status === 'LIVE' && (
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        )}
                                        <span>{statusBadge.text}</span>
                                    </div>

                                    {/* Type Badge */}
                                    <div
                                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-black font-bold text-sm flex items-center space-x-2"
                                        style={{ backgroundColor: '#f3aa01' }}
                                    >
                                        {getTypeIcon(tournament.type)}
                                        <span>{tournament.type}</span>
                                    </div>

                                    {/* Viewers */}
                                    {tournament.viewers && (
                                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 px-3 py-1.5 rounded-lg text-white text-sm flex items-center space-x-1">
                                            <Play className="h-4 w-4" />
                                            <span>{tournament.viewers}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold h-16 text-white mb-4 group-hover:text-yellow-300 transition-colors duration-200">
                                        {tournament.title}
                                    </h3>

                                    {/* Details */}
                                    <div className="space-y-2 mb-6 text-gray-400">
                                        <div className="flex items-center text-sm">
                                            <Calendar className="h-4 w-4 mr-3" style={{ color: '#f3aa01' }} />
                                            <span>{tournament.date}</span>
                                            <Clock className="h-4 w-4 ml-5 mr-3" style={{ color: '#f3aa01' }} />
                                            <span>{tournament.time}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MapPin className="h-4 w-4 mr-3" style={{ color: '#f3aa01' }} />
                                            <span>{tournament.location}</span>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                                            <DollarSign className="h-5 w-5 mx-auto mb-1" style={{ color: '#f3aa01' }} />
                                            <div className="text-sm font-bold text-white">{tournament.prizePool}</div>
                                            <div className="text-xs text-gray-400">Mukofot</div>
                                        </div>
                                        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                                            <Users className="h-5 w-5 mx-auto mb-1" style={{ color: '#f3aa01' }} />
                                            <div className="text-sm font-bold text-white">{tournament.teams}</div>
                                            <div className="text-xs text-gray-400">Komanda</div>
                                        </div>
                                        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
                                            <Star className="h-5 w-5 mx-auto mb-1" style={{ color: '#f3aa01' }} />
                                            <div className="text-sm font-bold text-white">{tournament.participants}</div>
                                            <div className="text-xs text-gray-400">Ishtirokchi</div>
                                        </div>
                                    </div>

                                    {/* Winner (for completed) */}
                                    {tournament.winner && (
                                        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl border border-yellow-500/30">
                                            <div className="flex items-center space-x-2">
                                                <Trophy className="h-5 w-5" style={{ color: '#f3aa01' }} />
                                                <span className="text-base font-bold text-yellow-300">G'olib: {tournament.winner}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button className="w-full bg-gradient-to-r from-[#f3aa01] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#f3aa01] text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                        {tournament.status === 'LIVE' ? 'Jonli Ko\'rish' : tournament.status === 'UPCOMING' ? 'Qo\'shilish' : 'Natijalar'}
                                    </button>
                                </div>


                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div
                    className={`text-center mt-16 sm:mt-20 md:mt-24 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <button className="group w-full sm:w-auto px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-black rounded-full bg-gradient-to-r from-[#f3aa01] to-[#ffcf40] shadow-[0_0_30px_#f3aa01] hover:shadow-[0_0_50px_#f3aa01] hover:scale-110 transition-all duration-500 transform relative overflow-hidden">
                        <span className="relative z-10">BARCHA TURNIRLARNI KO'RISH</span>
                        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Tournament;