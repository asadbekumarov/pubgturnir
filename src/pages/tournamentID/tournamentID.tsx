import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import {
    Calendar,
    Clock,
    MapPin,
    Trophy,
    Award,
    Users,
    Coins,
    ChevronLeft,
    LucideIcon,
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

const getScopeText = (scope: string) => {
    switch (scope) {
        case "regional": return "Hududiy";
        case "national": return "Milliy";
        case "international": return "Xalqaro";
        default: return scope || "Noma'lum";
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case "upcoming": return "Kelgusi";
        case "live": return "Jonli";
        case "completed": return "Tugagan";
        default: return status || "Noma'lum";
    }
};

const formatDate = (dateString?: string) =>
    dateString
        ? new Date(dateString).toLocaleDateString("uz-UZ", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
        : "Noma'lum";

export default function TournamentDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: tournament, isLoading, isError } = useQuery<Tournament>({
        queryKey: ["tournament", id],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/tournament/${id}`);
            if (!res.data.success || !res.data.data) {
                throw new Error("Turnir ma'lumotini yuklab bo'lmadi");
            }
            return res.data.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f3aa01] mb-3"></div>
                    <p>Turnir ma'lumotlari yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    if (isError || !tournament) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-red-400">
                <div className="text-center p-6">
                    <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-600" />
                    <p className="text-lg">Turnir topilmadi</p>
                    <Link
                        to="/tournaments"
                        className="mt-4 inline-flex items-center gap-1 text-[#f3aa01] hover:underline"
                    >
                        <ChevronLeft size={16} /> Barcha turnirlarga qaytish
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#000102] py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">

                {/* Sarlavha */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {tournament.name}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-700/50">
                            {getStatusText(tournament.status || "")}
                        </span>
                        <span className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm border border-amber-700/50">
                            {getScopeText(tournament.scope || "")}
                        </span>
                        {tournament.type && (
                            <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm border border-indigo-700/50">
                                {tournament.type}
                            </span>
                        )}
                    </div>
                </div>

                {/* Asosiy kontent */}
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
                    {/* Banner qism */}
                    <div className="h-48 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center relative">
                        <Trophy className="h-16 w-16 text-[#f3aa01]" />
                        <div className="absolute bottom-4 left-6 text-white">
                            <h2 className="text-xl font-bold">{tournament.name}</h2>
                        </div>
                    </div>

                    {/* Tafsilotlar */}
                    <div className="p-6 space-y-6">
                        {/* Tavsif */}
                        {tournament.description && (
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <Trophy size={18} className="text-[#f3aa01]" /> Tavsif
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
                            </section>
                        )}

                        {/* Asosiy ma'lumotlar */}
                        <section>
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Calendar size={18} className="text-[#f3aa01]" /> Tadbir haqida
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoRow label="Boshlanish vaqti" value={formatDate(tournament.startTime)} icon={Calendar} />
                                {tournament.endTime && (
                                    <InfoRow label="Tugash vaqti" value={formatDate(tournament.endTime)} icon={Clock} />
                                )}
                                {tournament.participationFee !== undefined && (
                                    <InfoRow
                                        label="Ishtirok to‘lovi"
                                        value={`${tournament.participationFee} Coin`}
                                        icon={Coins}
                                    />
                                )}
                                {tournament.maxPlayers && (
                                    <InfoRow
                                        label="Maksimal ishtirokchilar"
                                        value={String(tournament.maxPlayers)}
                                        icon={Users}
                                    />
                                )}
                            </div>
                        </section>

                        {/* Regionlar */}
                        {tournament.regions && tournament.regions.length > 0 && (
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <MapPin size={18} className="text-amber-400" /> Regionlar
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {tournament.regions.map((region) => (
                                        <div
                                            key={region.id}
                                            className="bg-gray-900/50 p-4 rounded-lg border border-gray-800"
                                        >
                                            <div className="font-medium text-white">{region.name}</div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                <Users size={14} className="inline mr-1" />
                                                {region.currentParticipants} / {region.maxParticipants} ishtirokchi
                                            </div>
                                            <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="bg-[#f3aa01] h-2 rounded-full"
                                                    style={{
                                                        width: `${(region.currentParticipants / region.maxParticipants) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Sovrinlar */}
                        {(tournament.regionalPrizes?.length || tournament.nationalPrizes?.length) && (
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <Award size={18} className="text-[#f3aa01]" /> Sovrinlar
                                </h3>

                                {tournament.regionalPrizes?.length ? (
                                    <div className="mb-5">
                                        <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-1">
                                            <MapPin size={14} className="text-amber-400" /> Hududiy sovrinlar
                                        </h4>
                                        <PrizeList prizes={tournament.regionalPrizes} />
                                    </div>
                                ) : null}

                                {tournament.nationalPrizes?.length ? (
                                    <div>
                                        <h4 className="font-medium text-purple-300 mb-2 flex items-center gap-1">
                                            <Trophy size={14} className="text-purple-400" /> Milliy sovrinlar
                                        </h4>
                                        <PrizeList prizes={tournament.nationalPrizes} />
                                    </div>
                                ) : null}
                            </section>
                        )}

                        {/* Ro'yxatdan o'tish tugmasi */}
                        <div className="pt-4 border-t border-gray-800">
                            <button
                                disabled={tournament.status === "completed"}
                                className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${tournament.status === "completed"
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-[#f3aa01] text-[#000102] hover:bg-[#e09a00]"
                                    }`}
                            >
                                {tournament.status === "completed" ? "Turnir tugagan" : "Ro'yxatdan o'tish"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ✅ Yordamchi komponentlar
const InfoRow = ({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: LucideIcon; // 👈 LucideIcon ishlatildi
}) => (
    <div className="flex items-start gap-3 hover:bg-gray-800/40 p-2 rounded-lg transition">
        <Icon size={18} className="text-[#f3aa01] mt-0.5 flex-shrink-0" />
        <div>
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-white font-medium">{value}</div>
        </div>
    </div>
);

const PrizeList = ({ prizes }: { prizes: Prize[] }) => (
    <ul className="space-y-2">
        {prizes.map((prize) => (
            <li
                key={prize.id}
                className="flex items-center justify-between bg-gray-900/40 p-3 rounded-lg border border-gray-800 hover:bg-gray-800/60 transition"
            >
                <span className="text-white font-medium">
                    {prize.place}-o‘rin
                </span>
                <span className="text-[#f3aa01] font-bold">{prize.prize}</span>
            </li>
        ))}
    </ul>
);
