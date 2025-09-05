import React, { useState } from 'react';
import { MapPin, Trophy, ChevronRight } from 'lucide-react';

interface Match {
    id: number;
    time: string;
    date: string;
    teams: {
        name: string;
        logo: string;
        score?: number;
    }[];
    status: 'upcoming' | 'live' | 'completed';
    tournament: string;
    map: string;
    prize: string;
}

const Schedule: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('today');

    const days = [
        { id: 'today', label: 'Bugun', date: '15 Yanvar' },
        { id: 'tomorrow', label: 'Ertaga', date: '16 Yanvar' },
        { id: 'week', label: 'Bu Hafta', date: '17-21 Yanvar' },
    ];

    const matches: Match[] = [
        {
            id: 1,
            time: '18:00',
            date: '15 Yanvar',
            teams: [
                { name: 'Team Alpha', logo: '/api/placeholder/40/40', score: 12 },
                { name: 'Team Beta', logo: '/api/placeholder/40/40', score: 8 }
            ],
            status: 'completed',
            tournament: 'PUBG Mobile Championship',
            map: 'Erangel',
            prize: '$50,000'
        },
        {
            id: 2,
            time: '20:30',
            date: '15 Yanvar',
            teams: [
                { name: 'Team Gamma', logo: '/api/placeholder/40/40' },
                { name: 'Team Delta', logo: '/api/placeholder/40/40' }
            ],
            status: 'live',
            tournament: 'PUBG Mobile Championship',
            map: 'Sanhok',
            prize: '$50,000'
        },
        {
            id: 3,
            time: '22:00',
            date: '15 Yanvar',
            teams: [
                { name: 'Team Echo', logo: '/api/placeholder/40/40' },
                { name: 'Team Foxtrot', logo: '/api/placeholder/40/40' }
            ],
            status: 'upcoming',
            tournament: 'PUBG Mobile Championship',
            map: 'Miramar',
            prize: '$50,000'
        },
        {
            id: 4,
            time: '19:00',
            date: '16 Yanvar',
            teams: [
                { name: 'Team Golf', logo: '/api/placeholder/40/40' },
                { name: 'Team Hotel', logo: '/api/placeholder/40/40' }
            ],
            status: 'upcoming',
            tournament: 'PUBG Mobile Championship',
            map: 'Vikendi',
            prize: '$50,000'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live':
                return 'text-red-500 bg-red-500/20';
            case 'completed':
                return 'text-green-500 bg-green-500/20';
            case 'upcoming':
                return 'text-blue-500 bg-blue-500/20';
            default:
                return 'text-gray-500 bg-gray-500/20';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'live':
                return 'JONLI';
            case 'completed':
                return 'YAKUNLANGAN';
            case 'upcoming':
                return 'KUTILMOQDA';
            default:
                return 'NOMA\'LUM';
        }
    };

    const filteredMatches = matches.filter(match => {
        if (selectedDay === 'today') return match.date === '15 Yanvar';
        if (selectedDay === 'tomorrow') return match.date === '16 Yanvar';
        return true;
    });

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        O'yin Jadvali
                    </h2>
                    <p className="text-xl text-gray-400">
                        Eng qiziqarli o'yinlarni kuzatib boring
                    </p>
                </div>

                {/* Day Selector */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-800 rounded-xl p-2 flex space-x-2">
                        {days.map((day) => (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDay(day.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedDay === day.id
                                    ? 'bg-[#f3aa01] text-black'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Matches */}
                <div className="space-y-4">
                    {filteredMatches.map((match, index) => (
                        <div
                            key={match.id}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-[#f3aa01]/50 transition-all duration-300 group"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                {/* Time and Status */}
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">{match.time}</div>
                                        <div className="text-sm text-gray-400">{match.date}</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(match.status)}`}>
                                        {getStatusText(match.status)}
                                    </div>
                                </div>

                                {/* Teams */}
                                <div className="flex items-center space-x-6">
                                    {match.teams.map((team, teamIndex) => (
                                        <div key={teamIndex} className="flex items-center space-x-3">
                                            <div className="text-center">
                                                <img
                                                    src={team.logo}
                                                    alt={team.name}
                                                    className="w-12 h-12 rounded-full border-2 border-gray-600"
                                                />
                                                <div className="text-sm font-semibold text-white mt-2">{team.name}</div>
                                            </div>
                                            {teamIndex === 0 && (
                                                <div className="text-2xl font-bold text-white">
                                                    {match.status === 'completed' ? `${team.score} - ${match.teams[1].score}` : 'VS'}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Tournament Info */}
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-white mb-1">{match.tournament}</div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{match.map}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Trophy className="h-4 w-4" />
                                            <span>{match.prize}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="bg-[#f3aa01] hover:bg-[#ff6b35] text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                                    <span>{match.status === 'live' ? 'Jonli Ko\'rish' : 'Batafsil'}</span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <button className="bg-gradient-to-r from-[#f3aa01] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#f3aa01] text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        Barcha O'yinlarni Ko'rish
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Schedule;