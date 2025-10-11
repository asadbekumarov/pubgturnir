"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import apiClient from "../../lib/apiClient";
import {
    User,
    CreditCard,
    Shield,
    Edit3,
    Save,
    AlertCircle,
} from "lucide-react";

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
    startTime: string;
    endTime?: string;
    participationFee?: number;
    status: "upcoming" | "ongoing" | "completed" | "cancelled";
    regions?: Region[];
    regionalPrizes?: Prize[];
    nationalPrizes?: Prize[];
    currentParticipants?: number;
    maxParticipants?: number;
};

type Application = {
    id: string;
    tournament: {
        id: string;
        name: string;
        startTime: string;
        status: "upcoming" | "ongoing" | "completed" | "cancelled";
    };
    status: "pending" | "accepted" | "rejected";
    appliedAt: string;
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

type UserData = {
    id: string;
    firstName: string;
    lastName: string;
    pubgId: string;
    email: string;
    username: string;
    region: string;
    isActive?: boolean;
    lastLogin?: string;
    joinDate?: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const VALID_REGIONS = [
    "Toshkent",
    "Farg'ona",
    "Andijon",
    "Namangan",
    "Samarqand",
    "Buxoro",
    "Navoiy",
    "Xorazm",
    "Qashqadaryo",
    "Surxondaryo",
    "Jizzax",
    "Sirdaryo",
    "Qoraqalpog'iston",
];

// Custom confirmation toast function
const showConfirmToast = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
        toast(
            (t) => (
                <div className="flex items-center justify-between gap-3 p-2 sm:p-3">
                    <span className="text-xs sm:text-sm font-medium text-white">{message}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                resolve(true);
                                toast.dismiss(t.id);
                            }}
                            className="px-2 sm:px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded font-semibold transition-all duration-200"
                        >
                            Ha
                        </button>
                        <button
                            onClick={() => {
                                resolve(false);
                                toast.dismiss(t.id);
                            }}
                            className="px-2 sm:px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded font-semibold transition-all duration-200"
                        >
                            Yo'q
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                position: "top-center",
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    padding: "0",
                    maxWidth: "90vw",
                },
            }
        );
    });
};

const LoadingScreen: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "#0e131f" }}
        >
            <div className="text-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-6 sm:mb-8">
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
                        <Shield className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-black" />
                    </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Yuklanmoqda...</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Ma'lumotlar yuklanmoqda</p>
                <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                    <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

const Profile: React.FC = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<UserData>({
        id: "",
        firstName: "",
        lastName: "",
        pubgId: "",
        email: "",
        region: "Toshkent",
        username: "",
        isActive: false,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] =
        useState<Tournament | null>(null);

    // Fetch valid regions
    const { data: validRegions = VALID_REGIONS } = useQuery<string[]>({
        queryKey: ["valid-regions"],
        queryFn: async () => {
            try {
                const res = await apiClient.get(`${API_URL}/web/v1/user/me`);
                const region = res.data?.data?.region; // ✅ To‘g‘ri yo‘l

                if (res.data.success && typeof region === "string") {
                    return [region]; // string bo‘lsa, arrayga o‘giramiz
                }

                throw new Error("Invalid region data");
            } catch (error) {
                console.warn("Falling back to default regions:", error);
                toast.error("Hududlar ro'yxati yuklanmadi. Standart ro'yxat ishlatilmoqda.", {
                    duration: 5000,
                    position: "top-center",
                });
                return VALID_REGIONS;
            }
        },
    });



    // Fetch user data
    const {
        data: userData,
        isLoading: isLoadingUser,
        error: userError,
        refetch: refetchUser,
    } = useQuery<UserData>({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/user/me`);
            if (!res.data.success) throw new Error("Foydalanuvchi ma'lumotlari yuklanmadi");
            return res.data.data;
        },
    });

    // Fetch applications
    const {
        data: applicationsData,
        isLoading: isLoadingApplications,
        error: applicationsError,
    } = useQuery<{ items: Application[] }>({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/application`);
            if (!res.data.success || !res.data.data?.items)
                throw new Error("Arizalar yuklanmadi");
            return res.data.data;
        },
    });

    // Fetch tournaments
    const {
        data: tournamentsData,
        isLoading: isLoadingTournaments,
        error: tournamentsError,
    } = useQuery<Tournament[]>({
        queryKey: ["tournaments"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
            if (!res.data.success || !res.data.data?.items)
                throw new Error("Turnirlar yuklanmadi");
            return res.data.data.items;
        },
    });

    // Show error toasts when queries fail
    useEffect(() => {
        if (userError) {
            toast.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik", {
                duration: 5000,
                position: "top-center",
            });
        }
        if (applicationsError) {
            toast.error("Arizalar ro'yxatini yuklashda xatolik", {
                duration: 5000,
                position: "top-center",
            });
        }
        if (tournamentsError) {
            toast.error("Turnirlar ro'yxatini yuklashda xatolik", {
                duration: 5000,
                position: "top-center",
            });
        }
    }, [userError, applicationsError, tournamentsError]);

    // Update form data when user data is loaded
    useEffect(() => {
        if (userData) {
            const region = validRegions.includes(userData.region)
                ? userData.region
                : "Toshkent";
            setFormData({
                id: userData.id || "",
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                pubgId: userData.pubgId || "",
                email: userData.email || "",
                region,
                username: userData.username || "",
                isActive: userData.isActive ?? false,
            });
        }
    }, [userData, validRegions]);

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: async (tournamentId: string) => {
            const response = await apiClient.post(`${API_URL}/web/v1/application`, {
                tournamentId,
            });
            return response.data as RegistrationResponse;
        },
        onSuccess: (data: RegistrationResponse) => {
            if (data.success) {
                toast.success("✅ Muvaffaqiyatli ro'yxatdan o'tdingiz!", {
                    duration: 5000,
                    position: "top-right",
                    style: {
                        background: "#000102",
                        color: "#22c55e", // yashil matn
                        borderRadius: "8px",
                        border: "1px solid #22c55e",
                        fontSize: "14px",
                    },
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#000102",
                    },
                });
                setShowRegistrationModal(false);
                setSelectedTournamentForRegistration(null);
                queryClient.invalidateQueries({ queryKey: ["applications"] });
            } else {
                toast.error(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi", {
                    duration: 5000,
                    position: "top-right",
                    style: {
                        background: "#000102",
                        color: "#ef4444", // qizil matn
                        borderRadius: "8px",
                        border: "1px solid #ef4444",
                        fontSize: "14px",
                    },
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#000102",
                    },
                }
                );
            }
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
            toast.error(errorMessage, {
                duration: 5000,
                position: "top-center",
            });
        },
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: async (data: Partial<UserData>) => {
            const toastId = toast.loading("⏳ Profil yangilanmoqda...", {
                id: "profile-update",
                duration: 10000,
                position: "top-center",
            });

            try {
                const response = await apiClient.put(`${API_URL}/web/v1/user/profile`, {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    region: data.region,
                    isActive: data.isActive,
                });

                toast.dismiss(toastId);
                return response.data;
            } catch (error) {
                toast.dismiss(toastId);
                throw error;
            }
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("✅ Profil muvaffaqiyatli yangilandi!", {
                    duration: 4000,
                    position: "top-center",
                });
                refetchUser();
                setIsEditing(false);
            } else {
                toast.error(data.message || "Ma'lumotlarni yangilashda xatolik yuz berdi", {
                    duration: 5000,
                    position: "top-center",
                });
            }
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Ma'lumotlarni yangilashda xatolik yuz berdi",
                {
                    duration: 5000,
                    position: "top-center",
                }
            );
        },
    });

    // Edit toggle handler
    const handleEditToggle = async () => {
        if (isEditing) {
            const confirmed = await showConfirmToast("O'zgarishlarni bekor qilishni xohlaysizmi?");
            if (confirmed) {
                setIsEditing(false);
                toast.success("✅ Tahrirlash rejimi bekor qilindi", {
                    duration: 3000,
                    position: "top-center",
                });
                if (userData) {
                    const region = validRegions.includes(userData.region)
                        ? userData.region
                        : "Toshkent";
                    setFormData({
                        id: userData.id || "",
                        firstName: userData.firstName || "",
                        lastName: userData.lastName || "",
                        pubgId: userData.pubgId || "",
                        email: userData.email || "",
                        region,
                        username: userData.username || "",
                        isActive: userData.isActive ?? false,
                    });
                }
            }
        } else {
            setIsEditing(true);
            toast.success("✏️ Tahrirlash rejimi yoqildi", {
                duration: 3000,
                position: "top-center",
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            toast.error("Ism va familiya majburiy maydonlar!", {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        updateProfileMutation.mutate(formData);
    };

    const handleConfirmRegistration = () => {
        if (selectedTournamentForRegistration) {
            registerMutation.mutate(selectedTournamentForRegistration.id);
        }
    };

    const isLoading = isLoadingUser || isLoadingApplications || isLoadingTournaments;
    const hasError = userError || applicationsError || tournamentsError;

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (hasError) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0e131f" }}>
                <div className="text-center text-white max-w-md mx-auto p-4 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Xatolik yuz berdi</h2>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                        Ma'lumotlarni yuklashda xatolik. Iltimos, keyinroq qayta urinib ko'ring.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                        >
                            Qayta yuklash
                        </button>
                        <button
                            onClick={() => refetchUser()}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                        >
                            Yangilash
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ backgroundColor: "#0e131f" }}>
            {/* Account Info Summary */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-gray-700 mb-6 sm:mb-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-black" />
                        </div>
                        <span className="break-words">Hisob ma'lumotlari</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <div className={`font-bold text-sm sm:text-base lg:text-lg ${formData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    <div className="bg-black/50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <User className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-500 flex-shrink-0" />
                            <label className="text-xs sm:text-sm font-medium text-gray-300">Ism va Familiya</label>
                        </div>
                        <div className="text-white font-mono text-sm sm:text-base lg:text-lg font-bold break-words">
                            {formData.firstName || formData.lastName
                                ? `${formData.firstName} ${formData.lastName}`.trim()
                                : "Noma'lum"}
                        </div>
                    </div>
                    <div className="bg-black/50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center flex-shrink-0`}>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black"></div>
                            </div>
                            <label className="text-xs sm:text-sm font-medium text-gray-300">Holat</label>
                        </div>
                        <div className={`font-bold text-sm sm:text-base lg:text-lg ${formData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Info Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border-2 border-gray-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                            <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                        </div>
                        <span className="break-words">Shaxsiy ma'lumotlar</span>
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        {updateProfileMutation.isPending && (
                            <span className="text-yellow-400 text-xs sm:text-sm font-medium animate-pulse flex items-center gap-2">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">Saqlanmoqda...</span>
                            </span>
                        )}
                        <button
                            onClick={handleEditToggle}
                            disabled={updateProfileMutation.isPending}
                            className={`flex-1 sm:flex-none px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed ${isEditing
                                ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                                : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/25"
                                }`}
                        >
                            {isEditing ? "❌ Bekor qilish" : "✏️ Tahrirlash"}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {/* First Name */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                Ism <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing || updateProfileMutation.isPending}
                                required
                                className={`w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border transition-all duration-300 font-medium text-sm sm:text-base ${isEditing && !updateProfileMutation.isPending
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                                Familiya <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing || updateProfileMutation.isPending}
                                required
                                className={`w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border transition-all duration-300 font-medium text-sm sm:text-base ${isEditing && !updateProfileMutation.isPending
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        {/* PUBG ID */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                                PubgID
                            </label>
                            <input
                                type="text"
                                name="pubgId"
                                value={formData.pubgId}
                                disabled
                                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm sm:text-base outline-none backdrop-blur-sm"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm sm:text-base outline-none backdrop-blur-sm break-all"
                            />
                        </div>

                        {/* Region */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                                Region
                            </label>
                            {isEditing && !updateProfileMutation.isPending ? (
                                <select
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none backdrop-blur-sm font-medium text-sm sm:text-base"
                                >
                                    {validRegions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 font-medium text-sm sm:text-base">
                                    {formData.region || "Noma'lum"}
                                </div>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-xs sm:text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                                Active
                            </label>
                            <div
                                className={`flex items-center gap-3 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl border transition-all duration-300 font-medium text-sm sm:text-base ${isEditing && !updateProfileMutation.isPending
                                    ? "bg-black/50 text-white border-gray-700"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            >
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleCheckboxChange}
                                    disabled={!isEditing || updateProfileMutation.isPending}
                                    className="h-4 w-4 sm:h-5 sm:w-5 accent-yellow-500 cursor-pointer disabled:cursor-not-allowed"
                                />
                                <span>{formData.isActive ? "Faol" : "Faol emas"}</span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-4 sm:pt-6 lg:pt-8 border-t border-gray-700/50">
                            <button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-bold transform hover:scale-105 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <Save className="h-4 w-4 sm:h-5 sm:w-5" />
                                {updateProfileMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && selectedTournamentForRegistration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Turnirga ro'yxat</h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                            "{selectedTournamentForRegistration.name}" turniriga ro'yxatdan o'tmoqchimisiz?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedTournamentForRegistration(null);
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl transition-colors text-sm sm:text-base font-semibold"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={registerMutation.isPending}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-colors disabled:opacity-50 text-sm sm:text-base font-semibold"
                            >
                                {registerMutation.isPending ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;