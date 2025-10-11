// "use client";

// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import apiClient from "../../lib/apiClient";
// import {
//     Calendar,
//     Clock,
//     MapPin,
//     Trophy,
//     Users,
//     Coins,
//     ChevronLeft,
//     LucideIcon,
//     X,
// } from "lucide-react";

// type Region = {
//     id: string;
//     name: string;
//     maxParticipants: number;
//     currentParticipants: number;
// };

// type Prize = {
//     id: string;
//     place: number;
//     prize: string;
// };

// type Tournament = {
//     id: string;
//     name: string;
//     description?: string;
//     type?: string;
//     scope?: string;
//     startTime?: string;
//     endTime?: string;
//     status?: string;
//     maxPlayers?: number | null;
//     participationFee?: number;
//     regions?: Region[];
//     regionalPrizes?: Prize[];
//     nationalPrizes?: Prize[];
// };

// const API_URL = import.meta.env.VITE_API_URL;

// const getScopeText = (scope: string) => {
//     switch (scope) {
//         case "regional":
//             return "Hududiy";
//         case "national":
//             return "Milliy";
//         case "international":
//             return "Xalqaro";
//         default:
//             return scope || "Noma'lum";
//     }
// };

// const getStatusText = (status: string) => {
//     switch (status) {
//         case "upcoming":
//             return "Kelgusi";
//         case "live":
//             return "Jonli";
//         case "completed":
//             return "Tugagan";
//         default:
//             return status || "Noma'lum";
//     }
// };

// const formatDate = (dateString?: string) =>
//     dateString
//         ? new Date(dateString).toLocaleDateString("uz-UZ", {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         })
//         : "Noma'lum";

// export default function TournamentDetail() {
//     const { id } = useParams<{ id: string }>();
//     const [showRegistrationModal, setShowRegistrationModal] = useState(false);
//     const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] =
//         useState<Tournament | null>(null);

//     // Ro‘yxatdan o‘tish so‘rovini yuboruvchi mutation
//     const registerMutation = useMutation({
//         mutationFn: async (tournamentId: string) => {
//             const res = await apiClient.post(`${API_URL}/web/v1/tournament/register`, {
//                 tournamentId,
//             });
//             return res.data;
//         },
//         onSuccess: () => {
//             alert("✅ Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!");
//             setShowRegistrationModal(false);
//             setSelectedTournamentForRegistration(null);
//         },
//         onError: () => {
//             alert("❌ Ro‘yxatdan o‘tishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
//         },
//     });

//     const { data: tournament, isLoading, isError } = useQuery<Tournament>({
//         queryKey: ["tournament", id],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/tournament/${id}`);
//             if (!res.data.success || !res.data.data) {
//                 throw new Error("Turnir ma'lumotini yuklab bo'lmadi");
//             }
//             return res.data.data;
//         },
//         enabled: !!id,
//     });

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-[#000102] flex items-center justify-center text-white">
//                 <div className="text-center">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f3aa01] mb-3"></div>
//                     <p>Turnir ma'lumotlari yuklanmoqda...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError || !tournament) {
//         return (
//             <div className="min-h-screen bg-[#000102] flex items-center justify-center text-red-400">
//                 <div className="text-center p-6">
//                     <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-600" />
//                     <p className="text-lg">Turnir topilmadi</p>
//                     <Link
//                         to="/tournaments"
//                         className="mt-4 inline-flex items-center gap-1 text-[#f3aa01] hover:underline"
//                     >
//                         <ChevronLeft size={16} /> Barcha turnirlarga qaytish
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const handleRegisterClick = () => {
//         setSelectedTournamentForRegistration(tournament);
//         setShowRegistrationModal(true);
//     };

//     const handleConfirmRegistration = () => {
//         if (!selectedTournamentForRegistration) return;
//         registerMutation.mutate(selectedTournamentForRegistration.id);
//     };

//     return (
//         <div className="min-h-screen bg-[#000102] py-8 px-4 sm:px-6">
//             <div className="max-w-4xl mx-auto">
//                 {/* Sarlavha */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
//                         {tournament.name}
//                     </h1>
//                     <div className="flex flex-wrap justify-center gap-2">
//                         <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-700/50">
//                             {getStatusText(tournament.status || "")}
//                         </span>
//                         <span className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm border border-amber-700/50">
//                             {getScopeText(tournament.scope || "")}
//                         </span>
//                         {tournament.type && (
//                             <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-sm border border-indigo-700/50">
//                                 {tournament.type}
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 {/* Asosiy kontent */}
//                 <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden">
//                     <div className="h-48 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center relative">
//                         <Trophy className="h-16 w-16 text-[#f3aa01]" />
//                         <div className="absolute bottom-4 left-6 text-white">
//                             <h2 className="text-xl font-bold">{tournament.name}</h2>
//                         </div>
//                     </div>

//                     <div className="p-6 space-y-6">
//                         {tournament.description && (
//                             <section>
//                                 <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
//                                     <Trophy size={18} className="text-[#f3aa01]" /> Tavsif
//                                 </h3>
//                                 <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
//                             </section>
//                         )}

//                         <section>
//                             <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
//                                 <Calendar size={18} className="text-[#f3aa01]" /> Tadbir haqida
//                             </h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <InfoRow
//                                     label="Boshlanish vaqti"
//                                     value={formatDate(tournament.startTime)}
//                                     icon={Calendar}
//                                 />
//                                 {tournament.endTime && (
//                                     <InfoRow
//                                         label="Tugash vaqti"
//                                         value={formatDate(tournament.endTime)}
//                                         icon={Clock}
//                                     />
//                                 )}
//                                 {tournament.participationFee !== undefined && (
//                                     <InfoRow
//                                         label="Ishtirok to‘lovi"
//                                         value={`${tournament.participationFee} Coin`}
//                                         icon={Coins}
//                                     />
//                                 )}
//                                 {tournament.maxPlayers && (
//                                     <InfoRow
//                                         label="Maksimal ishtirokchilar"
//                                         value={String(tournament.maxPlayers)}
//                                         icon={Users}
//                                     />
//                                 )}
//                             </div>
//                         </section>

//                         {tournament.regions && tournament.regions.length > 0 && (
//                             <section>
//                                 <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
//                                     <MapPin size={18} className="text-amber-400" /> Regionlar
//                                 </h3>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                     {tournament.regions.map((region) => (
//                                         <div
//                                             key={region.id}
//                                             className="bg-gray-900/50 p-4 rounded-lg border border-gray-800"
//                                         >
//                                             <div className="font-medium text-white">{region.name}</div>
//                                             <div className="text-sm text-gray-400 mt-1">
//                                                 <Users size={14} className="inline mr-1" />
//                                                 {region.currentParticipants} / {region.maxParticipants} ishtirokchi
//                                             </div>
//                                             <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
//                                                 <div
//                                                     className="bg-[#f3aa01] h-2 rounded-full"
//                                                     style={{
//                                                         width: `${(region.currentParticipants / region.maxParticipants) * 100}%`,
//                                                     }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}

//                         <div className="pt-4 border-t border-gray-800">
//                             <button
//                                 disabled={tournament.status === "completed"}
//                                 onClick={handleRegisterClick}
//                                 className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${tournament.status === "completed"
//                                         ? "bg-gray-700 text-gray-500 cursor-not-allowed"
//                                         : "bg-[#f3aa01] text-[#000102] hover:bg-[#e09a00]"
//                                     }`}
//                             >
//                                 {tournament.status === "completed"
//                                     ? "Turnir tugagan"
//                                     : "Ro'yxatdan o'tish"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             {showRegistrationModal && selectedTournamentForRegistration && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//                     <div className="rounded-3xl p-6 max-w-md w-full border border-white/20 bg-[#111827] shadow-2xl relative">
//                         <button
//                             onClick={() => {
//                                 setShowRegistrationModal(false);
//                                 setSelectedTournamentForRegistration(null);
//                             }}
//                             className="absolute top-3 right-3 text-gray-400 hover:text-white"
//                         >
//                             <X size={20} />
//                         </button>

//                         <h3 className="text-2xl font-bold text-white mb-4">
//                             Ro'yxatdan o'tish
//                         </h3>

//                         <div className="space-y-4 mb-6">
//                             <p className="text-gray-200 text-sm sm:text-base">
//                                 <strong className="text-white">
//                                     {selectedTournamentForRegistration.name}
//                                 </strong>{" "}
//                                 turniriga ro'yxatdan o'tmoqchimisiz?
//                             </p>

//                             <p className="text-gray-300 text-sm">
//                                 Turnir ID: {selectedTournamentForRegistration.id}
//                             </p>

//                             {selectedTournamentForRegistration.participationFee !== undefined && (
//                                 <p className="text-[#f3aa01] font-bold text-base">
//                                     Ishtirok to‘lovi: {selectedTournamentForRegistration.participationFee} Coin
//                                 </p>
//                             )}

//                             <p className="text-gray-300 text-sm">
//                                 Boshlanish vaqti: {formatDate(selectedTournamentForRegistration.startTime)}
//                             </p>
//                         </div>

//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => {
//                                     setShowRegistrationModal(false);
//                                     setSelectedTournamentForRegistration(null);
//                                 }}
//                                 className="flex-1 bg-gray-700 text-white py-3 rounded-2xl hover:bg-gray-600 transition-all font-bold"
//                             >
//                                 Bekor qilish
//                             </button>
//                             <button
//                                 onClick={handleConfirmRegistration}
//                                 disabled={registerMutation.isPending}
//                                 className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {registerMutation.isPending ? "Yuklanmoqda..." : "Tasdiqlash"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // Yordamchi komponentlar
// const InfoRow = ({
//     label,
//     value,
//     icon: Icon,
// }: {
//     label: string;
//     value: string;
//     icon: LucideIcon;
// }) => (
//     <div className="flex items-start gap-3 hover:bg-gray-800/40 p-2 rounded-lg transition">
//         <Icon size={18} className="text-[#f3aa01] mt-0.5 flex-shrink-0" />
//         <div>
//             <div className="text-gray-400 text-sm">{label}</div>
//             <div className="text-white font-medium">{value}</div>
//         </div>
//     </div>
// );
"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import {
    Calendar,
    Clock,
    MapPin,
    Trophy,
    Users,
    Coins,
    ChevronLeft,
    Info,
    X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] =
        useState<Tournament | null>(null);

    // Ro‘yxatdan o‘tish so‘rovini yuboruvchi mutation
    const registerMutation = useMutation({
        mutationFn: async (tournamentId: string) => {
            const res = await apiClient.post(`${API_URL}/web/v1/tournament/register`, {
                tournamentId,
            });
            return res.data;
        },
        onMutate: () => {
            toast.info("Ro‘yxatdan o‘tish yuborilmoqda...", { autoClose: 1200 });
        },
        onSuccess: (data) => {
            // Agar backend xabar qaytarsa uni chiqarish
            const message =
                data?.message || "✅ Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!";
            toast.success(message);
            setShowRegistrationModal(false);
            setSelectedTournamentForRegistration(null);
        },
        onError: (error: any) => {
            // Har xil error strukturalar uchun umumiy tutish
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "❌ Ro‘yxatdan o‘tishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.";
            toast.error(msg);
        },
    });

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
                <ToastContainer />
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
                <ToastContainer />
            </div>
        );
    }

    const handleRegisterClick = () => {
        setSelectedTournamentForRegistration(tournament);
        setShowRegistrationModal(true);
    };

    const handleConfirmRegistration = () => {
        if (!selectedTournamentForRegistration) return;
        registerMutation.mutate(selectedTournamentForRegistration.id);
    };

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
                    <div className="h-48 bg-gradient-to-r from-black to-gray-900 flex items-center justify-center relative">
                        <Trophy className="h-16 w-16 text-[#f3aa01]" />
                        <div className="absolute bottom-4 left-6 text-white">
                            <h2 className="text-xl font-bold">{tournament.name}</h2>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {tournament.description && (
                            <section>
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <Trophy size={18} className="text-[#f3aa01]" /> Tavsif
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
                            </section>
                        )}

                        <section>
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Calendar size={18} className="text-[#f3aa01]" /> Tadbir haqida
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoRow
                                    label="Boshlanish vaqti"
                                    value={formatDate(tournament.startTime)}
                                    icon={Calendar}
                                />
                                {tournament.endTime && (
                                    <InfoRow
                                        label="Tugash vaqti"
                                        value={formatDate(tournament.endTime)}
                                        icon={Clock}
                                    />
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

                        <div className="pt-4 border-t border-gray-800">
                            <button
                                disabled={tournament.status === "completed"}
                                onClick={handleRegisterClick}
                                className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${tournament.status === "completed"
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-[#f3aa01] text-[#000102] hover:bg-[#e09a00]"
                                    }`}
                            >
                                {tournament.status === "completed"
                                    ? "Turnir tugagan"
                                    : "Ro'yxatdan o'tish"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showRegistrationModal && selectedTournamentForRegistration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="rounded-3xl p-6 max-w-md w-full border border-white/20 bg-[#111827] shadow-2xl relative">
                        <button
                            onClick={() => {
                                setShowRegistrationModal(false);
                                setSelectedTournamentForRegistration(null);
                            }}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ro'yxatdan o'tish
                        </h3>

                        <div className="space-y-4 mb-6">
                            <p className="text-gray-200 text-sm sm:text-base">
                                <strong className="text-white">
                                    {selectedTournamentForRegistration.name}
                                </strong>{" "}
                                turniriga ro'yxatdan o'tmoqchimisiz?
                            </p>

                            <p className="text-gray-300 text-sm">
                                Turnir ID: {selectedTournamentForRegistration.id}
                            </p>

                            {selectedTournamentForRegistration.participationFee !== undefined && (
                                <p className="text-[#f3aa01] font-bold text-base">
                                    Ishtirok to‘lovi: {selectedTournamentForRegistration.participationFee} Coin
                                </p>
                            )}

                            <p className="text-gray-300 text-sm">
                                Boshlanish vaqti: {formatDate(selectedTournamentForRegistration.startTime)}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedTournamentForRegistration(null);
                                }}
                                className="flex-1 bg-gray-700 text-white py-3 rounded-2xl hover:bg-gray-600 transition-all font-bold"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={registerMutation.isLoading}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {registerMutation.isLoading ? "Yuklanmoqda..." : "Tasdiqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast container (bitta joyda bo‘lishi yetarli) */}
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

// Yordamchi komponentlar
const InfoRow = ({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: any;
}) => (
    <div className="flex items-start gap-3 hover:bg-gray-800/40 p-2 rounded-lg transition">
        <Icon size={18} className="text-[#f3aa01] mt-0.5 flex-shrink-0" />
        <div>
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-white font-medium">{value}</div>
        </div>
    </div>
);
