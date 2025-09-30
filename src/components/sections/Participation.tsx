import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import { Calendar, Clock, Coins, MapPin, Award } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

// --- TYPE DEFINITIONS --- //
type Prize = {
    id: string;
    place: number;
    prize: string;
};

type Region = {
    id: string;
    name: string;
    currentParticipants: number;
    maxParticipants: number;
};

type Tournament = {
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime?: string;
    participationFee?: number;
    regions?: Region[];
    regionalPrizes?: Prize[];
    nationalPrizes?: Prize[];
};

type ApiResponse = {
    success: boolean;
    data?: Tournament;
};

// --- COMPONENT --- //
export default function TournamentDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<ApiResponse>({
        queryKey: ["participation", id],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/participation/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const tournament = data?.data;

    // loading holati
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-white">
                Yuklanmoqda...
            </div>
        );
    }

    // error holati
    if (error || !tournament) {
        return (
            <div className="min-h-screen bg-[#000102] flex items-center justify-center text-red-400">
                Xatolik: {error.message || "Turnir topilmadi"}
            </div>
        );
    }

    // Sana formatlash
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Noma'lum";
        return new Date(dateString).toLocaleString("uz-UZ", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-[#000102] py-8 px-4">
            <div className="max-w-4xl mx-auto text-white">
                {/* Title & Description */}
                <h1 className="text-3xl font-bold mb-6">{tournament.name}</h1>
                <p className="text-gray-300 mb-6">{tournament.description}</p>

                {/* Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-[#f3aa01]" size={18} />
                        <span>Boshlanish: {formatDate(tournament.startTime)}</span>
                    </div>

                    {tournament.endTime && (
                        <div className="flex items-center gap-2">
                            <Clock className="text-amber-400" size={18} />
                            <span>Tugash: {formatDate(tournament.endTime)}</span>
                        </div>
                    )}

                    {tournament.participationFee && tournament.participationFee > 0 && (
                        <div className="flex items-center gap-2">
                            <Coins className="text-[#f3aa01]" size={18} />
                            <span>Ishtirok to‘lovi: {tournament.participationFee} Coin</span>
                        </div>
                    )}
                </div>

                {/* Regionlar */}
                {tournament.regions?.length ? (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="text-amber-400" size={20} /> Regionlar
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {tournament.regions.map((region) => (
                                <div key={region.id} className="bg-black/30 p-4 rounded-lg">
                                    <div className="font-medium">{region.name}</div>
                                    <div className="text-sm text-gray-400">
                                        {region.currentParticipants} / {region.maxParticipants}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* Sovrinlar */}
                {tournament.regionalPrizes?.length || tournament.nationalPrizes?.length ? (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                            <Award className="text-[#f3aa01]" size={20} /> Sovrinlar
                        </h2>

                        {tournament.regionalPrizes?.length ? (
                            <div className="mb-4">
                                <h3 className="text-amber-300 mb-2">Hududiy</h3>
                                <ul className="space-y-1">
                                    {tournament.regionalPrizes.map((p) => (
                                        <li key={p.id} className="flex justify-between">
                                            <span>{p.place}-o‘rin</span>
                                            <span className="text-[#f3aa01]">{p.prize}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {tournament.nationalPrizes?.length ? (
                            <div>
                                <h3 className="text-purple-300 mb-2">Milliy</h3>
                                <ul className="space-y-1">
                                    {tournament.nationalPrizes.map((p) => (
                                        <li key={p.id} className="flex justify-between">
                                            <span>{p.place}-o‘rin</span>
                                            <span className="text-[#f3aa01]">{p.prize}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
