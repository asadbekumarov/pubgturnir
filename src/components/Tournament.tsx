
import { useState, useRef } from 'react';
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
    const sectionRef = useRef(null);

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
            className="py-16 sm:py-20 md:py-28 mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
        >
            {/* Animated Stars Background */}
            <div className="absolute inset-0 z-0 overflow-hidden mx-6">
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
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center mb-16 transition-all duration-1000 `}
                >
                    <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-black text-white leading-snug">
                        BARCHA
                        <span
                            className="block bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90deg, #f3aa01, #ffcf40, #f3aa01)",
                            }}
                        >
                            TURNIRLAR
                        </span>
                    </h2>
                    <p className="text-sm sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-xl sm:max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed px-2 sm:px-4">
                        Eng zo'r turnirlar va professional musobaqalarda ishtirok eting.
                    </p>

                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-6 sm:mb-10 md:mb-12">
                    <div className="flex justify-center bg-gray-900/60 backdrop-blur-md rounded-full p-1 sm:p-2 flex-wrap gap-1 sm:gap-2 border border-gray-700 max-w-3xl">
                        {[
                            { key: 'upcoming', label: 'KELAYOTGAN', icon: Calendar, shortLabel: 'KELADI' },
                            { key: 'live', label: 'JONLI', icon: Play, shortLabel: 'JONLI' },
                            { key: 'completed', label: 'TUGALLANGAN', icon: Trophy, shortLabel: 'TUGAL' },
                        ].map(({ key, label, icon: Icon, shortLabel }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex-1 sm:flex-none px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 rounded-full font-semibold flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-sm md:text-base transition-all duration-300 transform ${activeTab === key
                                    ? "bg-[#f3aa01] text-black scale-105"
                                    : "text-white hover:text-[#f3aa01] hover:bg-gray-800/50 hover:scale-105"
                                    }`}
                            >
                                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden xs:inline sm:inline">{label}</span>
                                <span className="xs:hidden sm:hidden">{shortLabel}</span>
                            </button>
                        ))}
                    </div>
                </div>


                {/* Tournaments Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 pt-5">
                    {getTournamentsByTab().map((tournament, index) => {
                        const delay = (index + 1) * 200;
                        const statusBadge = getStatusBadge(tournament.status);
                        return (
                            <div
                                key={tournament.id}
                                className={`relative bg-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/50  ${tournament.featured ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1 ring-1 ring-yellow-500/30' : ''}`}
                                style={{
                                    animationDelay: `${delay}ms`,
                                }}
                            >

                                {/* Image */}
                                <div className="relative h-48 sm:h-56 overflow-hidden">
                                    <img
                                        src={tournament.image}
                                        alt={tournament.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                    {/* Status Badge */}
                                    <div
                                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white font-bold text-sm flex items-center space-x-2"
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
                                        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm flex items-center space-x-2 border border-gray-600/50">
                                            <Play className="h-4 w-4 text-red-400" />
                                            <span className="font-semibold">{tournament.viewers}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    {/* Title */}
                                    <div>
                                        <h3 className="text-xl h-16 font-bold text-white leading-tight">
                                            {tournament.title}
                                        </h3>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm text-gray-300">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-yellow-500" />
                                                <span>{tournament.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-4 w-4 text-yellow-500" />
                                                <span>{tournament.time}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-300">
                                            <MapPin className="h-4 w-4 mr-2 text-yellow-500" />
                                            <span>{tournament.location}</span>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gray-800/70 rounded-xl p-4 text-center border border-gray-700/50">
                                            <DollarSign className="h-6 w-6 mx-auto mb-3 text-yellow-500" />
                                            <div className="text-sm font-bold text-white mb-1">{tournament.prizePool}</div>
                                            <div className="text-xs text-gray-400">Mukofot</div>
                                        </div>
                                        <div className="bg-gray-800/70 rounded-xl p-4 text-center border border-gray-700/50">
                                            <Users className="h-6 w-6 mx-auto mb-3 text-yellow-500" />
                                            <div className="text-sm font-bold text-white mb-1">{tournament.teams}</div>
                                            <div className="text-xs text-gray-400">Komanda</div>
                                        </div>
                                        <div className="bg-gray-800/70 rounded-xl p-4 text-center border border-gray-700/50">
                                            <Star className="h-6 w-6 mx-auto mb-3 text-yellow-500" />
                                            <div className="text-sm font-bold text-white mb-1">{tournament.participants}</div>
                                            <div className="text-xs text-gray-400">Ishtirokchi</div>
                                        </div>
                                    </div>

                                    {/* Winner (for completed) */}
                                    {tournament.winner && (
                                        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl border border-yellow-500/30">
                                            <div className="flex items-center space-x-3">
                                                <Trophy className="h-6 w-6 text-yellow-500" />
                                                <div>
                                                    <div className="text-sm text-gray-400">G'olib</div>
                                                    <div className="text-base font-bold text-yellow-300">{tournament.winner}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <div className="pt-2">
                                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-1.5 px-4 rounded-xl text-sm
        transform transition-transform duration-300 hover:scale-105">
                                            {tournament.status === 'LIVE'
                                                ? 'Jonli Ko\'rish'
                                                : tournament.status === 'UPCOMING'
                                                    ? 'Qo\'shilish'
                                                    : 'Natijalar'}
                                        </button>
                                    </div>

                                </div>


                            </div>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <div
                    className={`text-center mt-16 sm:mt-20 md:mt-24 `}
                >
                </div>
            </div>
        </section>
    );
};

export default Tournament;