import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Trophy, ChevronRight } from "lucide-react";
import apiClient from "../../lib/apiClient";
import { dayOptions } from "../../constants";
import { getAnimationDelay } from "../../utils";

const API_URL = import.meta.env.VITE_API_URL;

type Match = {
    id: string;
    date: string;
    status: string;
    teams: string[];
};

const Schedule: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>("today");

    const { data: matches, isLoading, error } = useQuery<Match[]>({
        queryKey: ["matches", selectedDay],
        queryFn: async () => {
            const res = await apiClient.get(
                `${API_URL}/web/v1/match?day=${selectedDay}`
            );
            return res.data.data.items;
        },
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "live":
                return "text-green-500";
            case "completed":
                return "text-gray-400";
            default:
                return "text-yellow-500";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "live":
                return "Jonli";
            case "completed":
                return "Yakunlandi";
            default:
                return "Kutilmoqda";
        }
    };

    const filteredMatches = matches || [];

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
                        {dayOptions.map((day) => (
                            <button
                                key={day.id}
                                onClick={() => setSelectedDay(day.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedDay === day.id
                                        ? "bg-[#f3aa01] text-black"
                                        : "text-gray-400 hover:text-white hover:bg-gray-700"
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
                                animationDelay: getAnimationDelay(index, 100),
                            }}
                        >
                            <div className="flex items-center justify-between">
                                {/* Time and Status */}
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">
                                            {match.time}
                                        </div>
                                        <div className="text-sm text-gray-400">{match.date}</div>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                                            match.status
                                        )}`}
                                    >
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
                                                <div className="text-sm font-semibold text-white mt-2">
                                                    {team.name}
                                                </div>
                                            </div>
                                            {teamIndex === 0 && (
                                                <div className="text-2xl font-bold text-white">
                                                    {match.status === "completed"
                                                        ? `${team.score} - ${match.teams[1].score}`
                                                        : "VS"}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Tournament Info */}
                                <div className="text-right">
                                    <div className="text-lg font-semibold text-white mb-1">
                                        {match.tournament}
                                    </div>
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
                                    <span>
                                        {match.status === "live"
                                            ? "Jonli Ko'rsish"
                                            : "Batafsil"}
                                    </span>
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
