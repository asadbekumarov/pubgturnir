
"use client";

import type React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";
import {
    Activity,
    CheckCircle,
    XCircle,
    Clock,
    Calendar,
    Trophy,
    Users,
    MapPin,
    DollarSign,
    Info,
    Award,
    Shield,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // Ensure Swiper CSS is imported

type Region = {
    id: string;
    name: string;
    currentParticipants: number;
    maxParticipants: number;
};

type Prize = {
    id: string;
    place: number;
    prize: string;
};

type Tournament = {
    id: string;
    name: string;
    description: string;
    type: string;
    scope: string;
    startTime: string;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    maxPlayers?: number;
    participationFee?: number;
    regions?: Region[];
    regionalPrizes: Prize[];
    nationalPrizes: Prize[];
    regionalWinners: string[];
    nationalWinners: string[];
    createdAt: string;
};

type Application = {
    id: string;
    tournament: {
        name: string;
        type: string;
        scope: string;
        startTime: string;
        status: "upcoming" | "ongoing" | "completed" | "cancelled";
        id: string;
    };
    user: string;
    status: "pending" | "accepted" | "rejected";
    appliedAt: string;
    createdAt: string;
    updatedAt: string;
};

type RegistrationResponse = {
    success: boolean;
    message: string;
    data: {
        tournament: string;
        user: string;
        status: "pending" | "accepted" | "rejected";
        appliedAt: string;
        createdAt: string;
        updatedAt: string;
        id: string;
    };
};

const API_URL = import.meta.env.VITE_API_URL;

// LoadingScreen Component
const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0e131f" }}>
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
                        <Shield className="h-10 w-10 text-black" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Yuklanmoqda...</h2>
                <p className="text-gray-400 text-sm">Ma'lumotlar yuklanmoqda</p>
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [showApplications, setShowApplications] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] = useState<Tournament | null>(null);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    // Fetch applications
    const { data: applicationsData, isLoading: isLoadingApplications, refetch } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/application`);
            if (!res.data.success || !res.data.data?.items) throw new Error("Arizalar yuklanmadi");
            return res.data.data;
        },
    });

    const applications: Application[] = applicationsData?.items || [];

    // Fetch tournaments
    const { data: tournamentsData, isLoading: isLoadingTournaments } = useQuery({
        queryKey: ["tournaments"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
            if (!res.data.success || !res.data.data?.items) throw new Error("Turnirlar yuklanmadi");
            return res.data.data.items as Tournament[];
        },
    });

    const upcomingTournaments: Tournament[] = (tournamentsData || []).filter((tournament: Tournament) => tournament.status === "upcoming");

    // Filter registered tournaments
    const registeredTournaments: Tournament[] = (tournamentsData || []).filter((tournament: Tournament) =>
        applications.some((app: Application) => app.tournament.id === tournament.id)
    );

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: async (tournamentId: string) => {
            const response = await apiClient.post(`${API_URL}/web/v1/application`, { tournamentId });
            return response.data as RegistrationResponse;
        },
        onSuccess: (data: RegistrationResponse) => {
            if (data.success) {
                alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅");
                setShowRegistrationModal(false);
                setSelectedTournamentForRegistration(null);
                refetch();
                // Move Swiper to next slide
                if (swiperInstance) {
                    swiperInstance.slideNext(3000); // Move to next slide over 3 seconds
                }
            } else {
                alert(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
            }
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
            alert(errorMessage);
        },
    });

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

    const isUserRegistered = (tournamentId: string) => {
        return applications.some((app: Application) => app.tournament.id === tournamentId);
    };

    const getApplicationStatus = (tournamentId: string) => {
        const application = applications.find((app: Application) => app.tournament.id === tournamentId);
        return application ? application.status : null;
    };

    const isTournamentFull = (tournament: Tournament): boolean => {
        if (tournament.scope === "regional" && tournament.regions) {
            return tournament.regions.every((region) => region.currentParticipants >= region.maxParticipants);
        }
        return !!(tournament.maxPlayers && tournament.regionalWinners && tournament.regionalWinners.length >= tournament.maxPlayers);
    };

    const getTotalParticipants = (tournament: Tournament): number => {
        if (tournament.scope === "regional" && tournament.regions) {
            return tournament.regions.reduce((sum, region) => sum + region.currentParticipants, 0);
        }
        return tournament.regionalWinners?.length || 0;
    };

    const getMaxParticipants = (tournament: Tournament): number => {
        if (tournament.scope === "regional" && tournament.regions) {
            return tournament.regions.reduce((sum, region) => sum + region.maxParticipants, 0);
        }
        return tournament.maxPlayers || 0;
    };

    const handleRegisterClick = (tournament: Tournament) => {
        setSelectedTournamentForRegistration(tournament);
        setShowRegistrationModal(true);
    };

    const handleConfirmRegistration = () => {
        if (!selectedTournamentForRegistration) return;
        registerMutation.mutate(selectedTournamentForRegistration.id);
    };

    // Unified loading state
    if (isLoadingApplications || isLoadingTournaments) {
        return <LoadingScreen />;
    }

    return (
        <div className="relative mx-auto overflow-hidden bg-[#0d111c] min-h-screen w-full">
            {/* Applications Toggle Button */}
            <button
                onClick={() => setShowApplications(!showApplications)}
                className="fixed top-4 right-4 z-40 text-white px-4 py-2 rounded-2xl hover:text-[#f3aa01] transition-all duration-300 flex items-center gap-2 border border-white/10 sm:px-6 sm:py-3"
            >
                <Activity className="h-5 w-5" />
                Arizalarim ({applications.length})
            </button>

            {/* Upcoming Tournaments Section */}
            {upcomingTournaments.length === 0 ? (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                    <div className="text-center">
                        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4 md:h-20 md:w-20" />
                        <p className="text-xl md:text-2xl text-gray-300">Hozircha kelgusi turnirlar yo'q</p>
                    </div>
                </div>
            ) : (
                <div className="swiper-container w-full h-full">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            reverseDirection: true, // Move to the right
                        }}
                        loop={upcomingTournaments.length > 1}
                        spaceBetween={0}
                        slidesPerView={1}
                        slidesPerGroup={1} // Ensure one slide at a time
                        direction="horizontal"
                        className="h-full w-full"
                        onSwiper={setSwiperInstance}
                    >
                        {upcomingTournaments.map((tournament, index) => {
                            const isRegistered = isUserRegistered(tournament.id);
                            const applicationStatus = getApplicationStatus(tournament.id);
                            const isFull = isTournamentFull(tournament);
                            const totalParticipants = getTotalParticipants(tournament);
                            const maxParticipants = getMaxParticipants(tournament);

                            return (
                                <SwiperSlide key={tournament.id}>
                                    <div className="flex items-center bg-[#111827] justify-center p-2 sm:p-6 md:p-8 lg:p-12 h-full border-2 border-[#373b41] m-8 rounded-xl">
                                        <div className="w-full h-[720px] flex flex-col">
                                            {/* Header Section */}
                                            <div className="mb-4 sm:mb-6">
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center shadow-2xl"
                                                            style={{ background: "linear-gradient(to bottom right, #f3aa01, #ff8c00)" }}
                                                        >
                                                            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                                        </div>
                                                        <div>
                                                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                                                                {tournament.name}
                                                            </h1>
                                                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                                                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold border border-blue-500/30">
                                                                    {tournament.type}
                                                                </span>
                                                                <span className="bg-purple-500/20 text-purple-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold border border-purple-500/30">
                                                                    {tournament.scope === "regional" ? "Viloyatlararo" : "Ochiq"}
                                                                </span>
                                                                {isRegistered && applicationStatus === "accepted" && (
                                                                    <span className="flex items-center gap-1 text-green-400 text-xs sm:text-sm font-semibold">
                                                                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                                                        Qabul qilindi
                                                                    </span>
                                                                )}
                                                                {isRegistered && applicationStatus === "pending" && (
                                                                    <span className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm font-semibold">
                                                                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                                                        Kutilmoqda
                                                                    </span>
                                                                )}
                                                                {isFull && (
                                                                    <span className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                                                                        To'ldi
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-white/60 text-sm sm:text-lg mt-2 sm:mt-0">
                                                        {index + 1} / {upcomingTournaments.length}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Content Grid */}
                                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto pb-4">
                                                {/* Left Column */}
                                                <div className="space-y-4">
                                                    {/* Description */}
                                                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Info className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                            <h3 className="text-base sm:text-lg font-bold text-white">Tavsif</h3>
                                                        </div>
                                                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                                            {tournament.description}
                                                        </p>
                                                    </div>

                                                    {/* Tournament Details */}
                                                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300">
                                                        <h3 className="text-base sm:text-lg font-bold text-white mb-3">Ma'lumotlar</h3>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2 text-gray-300">
                                                                    <Calendar className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                    <span>Boshlanish:</span>
                                                                </div>
                                                                <span className="text-white font-semibold text-xs sm:text-sm">
                                                                    {formatDate(tournament.startTime)}
                                                                </span>
                                                            </div>

                                                            {tournament.participationFee && (
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2 text-gray-300">
                                                                        <DollarSign className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                        <span>Ishtirok to'lovi:</span>
                                                                    </div>
                                                                    <span className="font-bold text-base sm:text-lg" style={{ color: "#f3aa01" }}>
                                                                        {tournament.participationFee.toLocaleString()} so'm
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex items-center gap-2 text-gray-300">
                                                                        <Users className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                        <span>Ishtirokchilar:</span>
                                                                    </div>
                                                                    <span className="text-white font-semibold text-xs sm:text-sm">
                                                                        {totalParticipants}/{maxParticipants}
                                                                    </span>
                                                                </div>
                                                                <div className="w-full bg-white/20 rounded-full h-2">
                                                                    <div
                                                                        className="h-2 rounded-full transition-all duration-500"
                                                                        style={{
                                                                            background: "linear-gradient(to right, #f3aa01, #ff8c00)",
                                                                            width: `${(totalParticipants / maxParticipants) * 100}%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Regions */}
                                                    {tournament.regions && tournament.regions.length > 0 && (
                                                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <MapPin className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                <h3 className="text-base sm:text-lg font-bold text-white">Hududlar</h3>
                                                            </div>
                                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                                {tournament.regions.map((region) => (
                                                                    <div
                                                                        key={region.id}
                                                                        className="bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                                                    >
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <span className="text-white font-semibold text-xs sm:text-sm">
                                                                                {region.name}
                                                                            </span>
                                                                            <span className="text-gray-300 text-xs sm:text-sm">
                                                                                {region.currentParticipants}/{region.maxParticipants}
                                                                            </span>
                                                                        </div>
                                                                        <div className="w-full bg-white/20 rounded-full h-2">
                                                                            <div
                                                                                className="h-2 rounded-full transition-all duration-500"
                                                                                style={{
                                                                                    background: "linear-gradient(to right, #f3aa01, #ff8c00)",
                                                                                    width: `${(region.currentParticipants / region.maxParticipants) * 100}%`,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right Column - Prizes */}
                                                <div className="space-y-4">
                                                    {/* National Prizes */}
                                                    {tournament.nationalPrizes.length > 0 && (
                                                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Trophy className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                <h3 className="text-base sm:text-lg font-bold text-white">
                                                                    Milliy Mukofotlar
                                                                </h3>
                                                            </div>
                                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                                {tournament.nationalPrizes.map((prize, index) => (
                                                                    <div
                                                                        key={prize.id}
                                                                        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-2xl border border-yellow-500/20"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-3">
                                                                                <div
                                                                                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${index === 0
                                                                                        ? "bg-yellow-500 text-black"
                                                                                        : index === 1
                                                                                            ? "bg-gray-400 text-black"
                                                                                            : index === 2
                                                                                                ? "bg-orange-900 text-orange-200"
                                                                                                : "bg-gray-700 text-gray-300"
                                                                                        }`}
                                                                                >
                                                                                    {prize.place}
                                                                                </div>
                                                                                <span className="text-white font-semibold text-xs sm:text-sm">
                                                                                    {prize.prize}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Regional Prizes */}
                                                    {tournament.regionalPrizes.length > 0 && (
                                                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Award className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                                <h3 className="text-base sm:text-lg font-bold text-white">
                                                                    Hududiy Mukofotlar
                                                                </h3>
                                                            </div>
                                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                                {tournament.regionalPrizes.map((prize, index) => (
                                                                    <div
                                                                        key={prize.id}
                                                                        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-3 rounded-2xl border border-blue-500/20"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-3">
                                                                                <div
                                                                                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${index === 0
                                                                                        ? "bg-yellow-500 text-black"
                                                                                        : index === 1
                                                                                            ? "bg-gray-400 text-black"
                                                                                            : "bg-orange-900 text-orange-200"
                                                                                        }`}
                                                                                >
                                                                                    {prize.place}
                                                                                </div>
                                                                                <span className="text-white font-semibold text-xs sm:text-sm">
                                                                                    {prize.prize}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="mt-4 sm:mt-6">
                                                {isRegistered ? (
                                                    <button
                                                        disabled
                                                        className="w-full bg-gray-600 text-gray-300 px-4 py-3 sm:px-6 sm:py-4 rounded-3xl text-base sm:text-lg font-bold cursor-not-allowed"
                                                    >
                                                        {applicationStatus === "accepted"
                                                            ? "✓ Qabul qilindi"
                                                            : applicationStatus === "pending"
                                                                ? "⏳ Kutilmoqda"
                                                                : "Ro'yxatdan o'tilgan"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRegisterClick(tournament)}
                                                        disabled={isFull || registerMutation.isPending}
                                                        className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-3xl text-base sm:text-lg font-bold transition-all duration-300 ${isFull ? "bg-red-500/50 text-gray-300 cursor-not-allowed" : "text-black hover:shadow-2xl transform"
                                                            }`}
                                                        style={
                                                            !isFull && !registerMutation.isPending
                                                                ? {
                                                                    background: "linear-gradient(to right, #f3aa01, #ff8c00)",
                                                                    boxShadow: "0 0 30px rgba(243, 170, 1, 0.3)",
                                                                }
                                                                : {}
                                                        }
                                                    >
                                                        {registerMutation.isPending ? "Yuklanmoqda..." : isFull ? "❌ To'ldi" : "✓ Ro'yxatdan o'tish"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}

            {/* Registered Tournaments Section */}
            {registeredTournaments.length > 0 && (
                <div className="p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-[#373b41] bg-[#111827] m-8 rounded-xl">
                    <div className=" mx-auto">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Trophy className="h-6 w-6" style={{ color: "#f3aa01" }} />
                            Ro'yxatdan O'tgan Turnirlar
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {registeredTournaments.map((tournament) => {
                                const application = applications.find((app) => app.tournament.id === tournament.id);
                                const applicationStatus = application?.status;
                                const totalParticipants = getTotalParticipants(tournament);
                                const maxParticipants = getMaxParticipants(tournament);

                                return (
                                    <div
                                        key={tournament.id}
                                        className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-base sm:text-lg font-bold text-white">{tournament.name}</h3>
                                            {applicationStatus === "accepted" && (
                                                <span className="flex items-center gap-1 text-green-400 text-xs sm:text-sm font-semibold">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Qabul qilindi
                                                </span>
                                            )}
                                            {applicationStatus === "pending" && (
                                                <span className="flex items-center gap-1 text-yellow-400 text-xs sm:text-sm font-semibold">
                                                    <Clock className="h-4 w-4" />
                                                    Kutilmoqda
                                                </span>
                                            )}
                                            {applicationStatus === "rejected" && (
                                                <span className="flex items-center gap-1 text-red-400 text-xs sm:text-sm font-semibold">
                                                    <XCircle className="h-4 w-4" />
                                                    Rad etildi
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-300 text-xs sm:text-sm mb-3">
                                            {tournament.type} • {tournament.scope === "regional" ? "Viloyatlararo" : "Ochiq"} •
                                            Boshlanish: {formatDate(tournament.startTime)}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Users className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                    <span>Ishtirokchilar:</span>
                                                </div>
                                                <span className="text-white font-semibold text-xs sm:text-sm">
                                                    {totalParticipants}/{maxParticipants}
                                                </span>
                                            </div>
                                            <div className="w-full bg-white/20 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full transition-all duration-500"
                                                    style={{
                                                        background: "linear-gradient(to right, #f3aa01, #ff8c00)",
                                                        width: `${(totalParticipants / maxParticipants) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            {tournament.participationFee && (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-gray-300">
                                                        <DollarSign className="h-5 w-5" style={{ color: "#f3aa01" }} />
                                                        <span>Ishtirok to'lovi:</span>
                                                    </div>
                                                    <span className="font-bold text-sm" style={{ color: "#f3aa01" }}>
                                                        {tournament.participationFee.toLocaleString()} so'm
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Applications Panel */}
            {showApplications && (
                <div className="absolute inset-0 backdrop-blur-lg z-50 bg-[#111827]">
                    <div className="p-4 sm:p-6 md:p-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                                    <Activity className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#f3aa01" }} />
                                    Mening arizalarim
                                </h2>
                                <button
                                    onClick={() => setShowApplications(false)}
                                    className="text-white text-xl sm:text-2xl hover:text-[#f3aa01] transition-colors duration-300"
                                >
                                    ✕
                                </button>
                            </div>

                            {isLoadingApplications ? (
                                <div className="text-center py-12 sm:py-16">
                                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-white mx-auto mb-4"></div>
                                    <p className="text-base sm:text-lg text-gray-300">Yuklanmoqda...</p>
                                </div>
                            ) : applications.length === 0 ? (
                                <div className="text-center py-12 sm:py-16">
                                    <XCircle className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
                                    <p className="text-lg sm:text-xl text-gray-400">Hozircha arizangiz yo'q</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[80vh] overflow-y-auto">
                                    {applications.map((app) => {
                                        const tournamentData = app.tournament;
                                        return (
                                            <div
                                                key={app.id}
                                                className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 hover:border-[#f3aa01]/30 transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-base sm:text-lg font-bold text-white">
                                                        {tournamentData.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        {app.status === "accepted" && (
                                                            <>
                                                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                                                                <span className="text-green-400 font-bold text-xs sm:text-sm">
                                                                    Qabul qilindi
                                                                </span>
                                                            </>
                                                        )}
                                                        {app.status === "pending" && (
                                                            <>
                                                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                                                                <span className="text-yellow-400 font-bold text-xs sm:text-sm">
                                                                    Kutilmoqda
                                                                </span>
                                                            </>
                                                        )}
                                                        {app.status === "rejected" && (
                                                            <>
                                                                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                                                                <span className="text-red-400 font-bold text-xs sm:text-sm">
                                                                    Rad etildi
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-300 mb-3 text-xs sm:text-sm">
                                                    {tournamentData.type} •{" "}
                                                    {tournamentData.scope === "regional" ? "Viloyatlararo" : "Ochiq"} •
                                                    Boshlanish: {formatDate(tournamentData.startTime)}
                                                </p>
                                                <div className="text-xs text-gray-400 space-y-1">
                                                    <p>Ariza topshirilgan: {formatDate(app.appliedAt)}</p>
                                                    <p>Yaratilgan: {formatDate(app.createdAt)}</p>
                                                    <p>Yangilangan: {formatDate(app.updatedAt)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            {showRegistrationModal && selectedTournamentForRegistration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="rounded-3xl p-4 sm:p-6 max-w-md w-full border border-white/20 bg-[#111827] shadow-2xl">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                            Ro'yxatdan o'tish
                        </h3>

                        <div className="space-y-4 mb-6">
                            <p className="text-gray-200 text-sm sm:text-base">
                                <strong className="text-white">{selectedTournamentForRegistration.name}</strong>{" "}
                                turniriga ro'yxatdan o'tmoqchimisiz?
                            </p>

                            <p className="text-gray-300 text-xs sm:text-sm">
                                Turnir ID: {selectedTournamentForRegistration.id}
                            </p>

                            {selectedTournamentForRegistration.participationFee && (
                                <p className="font-bold text-base sm:text-lg text-[#f3aa01]">
                                    Ishtirok to'lovi:{" "}
                                    {selectedTournamentForRegistration.participationFee.toLocaleString()} so'm
                                </p>
                            )}

                            <p className="text-gray-300 text-xs sm:text-sm">
                                Boshlanish: {formatDate(selectedTournamentForRegistration.startTime)}
                            </p>

                            <p className="text-gray-300 text-xs sm:text-sm">
                                Ishtirokchilar: {getTotalParticipants(selectedTournamentForRegistration)}/
                                {getMaxParticipants(selectedTournamentForRegistration)}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedTournamentForRegistration(null);
                                }}
                                className="flex-1 bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-2xl hover:bg-gray-600 transition-all duration-300 font-bold text-sm sm:text-base"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={registerMutation.isPending}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black px-3 py-2 sm:px-4 sm:py-3 rounded-2xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 font-bold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {registerMutation.isPending ? "Yuklanmoqda..." : "Tasdiqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;