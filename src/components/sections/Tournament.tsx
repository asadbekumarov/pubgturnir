import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import {
    Calendar,
    Clock,
    MapPin,
    Trophy,
    Award,
    Coins,
} from "lucide-react";

type Region = {
    id: string;
    name: string;
    maxParticipants: number;
    currentParticipants: number;
};

type Prize = {
    id: string;
    place: number;
    prize: string;
};

type Tournament = {
    id: string;
    name: string;
    description?: string;
    type?: string;
    scope?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
    maxPlayers?: number | null;
    participationFee?: number;
    regions?: Region[];
    regionalPrizes?: Prize[];
    nationalPrizes?: Prize[];
};

const API_URL = import.meta.env.VITE_API_URL;

export default function TournamentList() {
    const { data: tournaments, isLoading, isError } = useQuery<Tournament[]>({
        queryKey: ["tournaments"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
            if (!res.data.success || !res.data.data?.items) {
                throw new Error("API noto‘g‘ri formatda ma’lumot qaytardi");
            }
            return res.data.data.items;
        },
    });

    const getScopeText = (scope: string) => {
        switch (scope) {
            case "regional":
                return "Hududiy";
            case "national":
                return "Milliy";
            case "international":
                return "Xalqaro";
            default:
                return scope || "Noma'lum";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "upcoming":
                return "Kelgusi";
            case "live":
                return "Jonli";
            case "completed":
                return "Tugagan";
            default:
                return status || "Noma'lum";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "upcoming":
                return "bg-blue-900/30 text-blue-300 border border-blue-700/50";
            case "live":
                return "bg-red-900/30 text-red-300 border border-red-700/50";
            case "completed":
                return "bg-emerald-900/30 text-emerald-300 border border-emerald-700/50";
            default:
                return "bg-gray-800/50 text-gray-400 border border-gray-700/50";
        }
    };

    const getScopeColor = (scope: string) => {
        switch (scope) {
            case "regional":
                return "bg-amber-900/30 text-amber-300 border border-amber-700/50";
            case "national":
                return "bg-purple-900/30 text-purple-300 border border-purple-700/50";
            case "international":
                return "bg-cyan-900/30 text-cyan-300 border border-cyan-700/50";
            default:
                return "bg-gray-800/50 text-gray-400 border border-gray-700/50";
        }
    };

    const formatDate = (dateString?: string) =>
        dateString
            ? new Date(dateString).toLocaleDateString("uz-UZ", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : "Noma'lum";

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f3aa01] mb-3"></div>
                    <p className="text-lg">Turnirlar yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center">
                <div className="text-center max-w-md p-6 bg-black/30 rounded-xl border border-red-500/30">
                    <p className="text-xl font-semibold text-red-400 mb-2">Xatolik yuz berdi</p>
                    <p className="text-gray-400">
                        Turnirlar ro'yxatini yuklab bo'lmadi. Iltimos, tarmoq aloqasini tekshirib, qayta urinib ko'ring.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className=" bg-[#000102] py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white mb-3">
                        Turnirlar
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Ishtirok etish uchun mavjud turnirlarni ko'ring va o'z darajangizni sinab ko'ring!
                    </p>
                </div>

                {!tournaments?.length ? (
                    <div className="text-center py-16">
                        <Trophy className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            Hech qanday turnir topilmadi
                        </h3>
                        <p className="text-gray-600">
                            Yangi turnirlar tez orada e'lon qilinadi.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {tournaments.map((tournament) => (
                            <Link
                                key={tournament.id}
                                to={`/tournaments/${tournament.id}`}
                                className="block group"
                            >
                                <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-[#f3aa01]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(243,170,1,0.2)] flex flex-col h-full">
                                    <div className="h-40 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center">
                                        <div className="bg-black/40 p-4 rounded-full border border-[#f3aa01]/20">
                                            <Trophy className="h-10 w-10 text-[#f3aa01]" />
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-white group-hover:text-[#f3aa01] transition-colors mb-2 line-clamp-1">
                                            {tournament.name}
                                        </h2>
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {tournament.description || "Tavsif mavjud emas."}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                                                    tournament.status || ""
                                                )}`}
                                            >
                                                {getStatusText(tournament.status || "")}
                                            </span>
                                            <span
                                                className={`text-xs px-3 py-1 rounded-full font-medium ${getScopeColor(
                                                    tournament.scope || ""
                                                )}`}
                                            >
                                                {getScopeText(tournament.scope || "")}
                                            </span>
                                            {tournament.type && (
                                                <span className="text-xs bg-indigo-900/30 text-indigo-300 px-3 py-1 rounded-full font-medium border border-indigo-700/50">
                                                    {tournament.type}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-300 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-[#f3aa01] flex-shrink-0" />
                                                <span>Boshlanish: {formatDate(tournament.startTime)}</span>
                                            </div>
                                            {tournament.endTime && (
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-amber-400 flex-shrink-0" />
                                                    <span>Tugash: {formatDate(tournament.endTime)}</span>
                                                </div>
                                            )}
                                            {tournament.participationFee !== undefined && (
                                                <div className="flex items-center gap-2">
                                                    <Coins size={16} className="text-[#f3aa01] flex-shrink-0" />
                                                    <span>Ishtirok: {tournament.participationFee} Coin</span>
                                                </div>
                                            )}
                                        </div>

                                        {tournament.regions && (
                                            <div className="mt-auto pt-3 border-t border-gray-800">
                                                <p className="text-xs text-gray-500 font-medium mb-2 flex items-center gap-1">
                                                    <MapPin size={14} className="text-amber-400" />
                                                    Regionlar ({tournament.regions.length})
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {tournament.regions.slice(0, 3).map((region) => (
                                                        <span
                                                            key={region.id}
                                                            className="text-xs bg-black/30 text-gray-300 px-2 py-1 rounded"
                                                        >
                                                            {region.name}
                                                        </span>
                                                    ))}
                                                    {tournament.regions.length > 3 && (
                                                        <span className="text-xs text-gray-600">+{tournament.regions.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {(tournament.regionalPrizes?.length || tournament.nationalPrizes?.length) && (
                                            <div className="mt-3 pt-3 border-t border-gray-800">
                                                <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                                                    <Award size={14} className="text-[#f3aa01]" />
                                                    Sovrinlar
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {tournament.regionalPrizes?.length && (
                                                        <span className="text-xs bg-amber-900/20 text-amber-300 px-2 py-1 rounded">
                                                            Hududiy
                                                        </span>
                                                    )}
                                                    {tournament.nationalPrizes?.length && (
                                                        <span className="text-xs bg-purple-900/20 text-purple-300 px-2 py-1 rounded">
                                                            Milliy
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}