"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

import {
    User,
    CreditCard,
    Shield,
    Edit3,
    Save,
    Crown,
    Activity,
    Loader2,
} from "lucide-react"

type Tournament = {
    id: string
    name: string
    description: string
    startTime: string
    endTime?: string
    participationFee?: number
    status: "upcoming" | "ongoing" | "completed" | "cancelled"
    regions?: Region[]
    regionalPrizes?: Prize[]
    nationalPrizes?: Prize[]
    currentParticipants?: number
    maxParticipants?: number
}

type Region = {
    id: string
    name: string
    currentParticipants: number
    maxParticipants: number
}

type Prize = {
    id: string
    place: number
    prize: string
}

type RegistrationResponse = {
    success: boolean
    message: string
    data: {
        tournament: string
        user: string
        status: "pending" | "accepted" | "rejected"
        appliedAt: string
        createdAt: string
        updatedAt: string
        id: string
    }
}

type UserData = {
    id: string
    firstName: string
    lastName: string
    phone: string
    email: string
    username: string
    status: string
    lastLogin?: string
    joinDate?: string
}

const API_URL = import.meta.env.VITE_API_URL

const LoadingScreen: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0e131f' }}>
            <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>

                    {/* Inner pulsing circle */}
                    <div className="absolute inset-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
                        <Shield className="h-10 w-10 text-black" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">Yuklanmoqda...</h2>
                <p className="text-gray-400 text-sm">Ma'lumotlar yuklanmoqda</p>

                {/* Loading dots animation */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    )
}

const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    })

    const [isEditing, setIsEditing] = useState(false)
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] = useState<Tournament | null>(null)

    // Fetch user data
    const { data: userData, isLoading: loadingUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/user/me`);
            if (!res.data.success) throw new Error("Foydalanuvchi ma'lumotlari yuklanmadi");
            return res.data.data;
        },
    });

    const { isLoading: loadingApps, refetch } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/application`);
            if (!res.data.success || !res.data.data?.items) throw new Error("Arizalar yuklanmadi");
            return res.data.data;
        },
    });

    useQuery({
        queryKey: ["tournaments"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
            if (!res.data.success || !res.data.data?.items) throw new Error("Turnirlar yuklanmadi");
            return res.data.data.items;
        },
    });

    // Update form data when user data is loaded
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                phone: userData.phone || "",
                email: userData.email || "",
            })
        }
    }, [userData]);

    const registerMutation = useMutation({
        mutationFn: async (tournamentId: string) => {
            const response = await apiClient.post(`${API_URL}/web/v1/application`, {
                tournamentId: tournamentId,
            });
            return response.data;
        },
        onSuccess: (data: RegistrationResponse) => {
            if (data.success) {
                alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅");
                setShowRegistrationModal(false);
                setSelectedTournamentForRegistration(null);
                refetch();
            } else {
                alert(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
            }
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
            alert(errorMessage);
        }
    });

    if (loadingApps || loadingUser) {
        return <LoadingScreen />
    }

    const profile = {
        username: userData?.username || "Noma'lum",
        user_id: userData?.id || "N/A",
        balance: 250000,
        tariff: "Premium",
        status: userData?.status || "Noma'lum",
        lastLogin: userData?.lastLogin || "Noma'lum",
        totalTransactions: 48,
        avatar: "AS",
        joinDate: userData?.joinDate || "Noma'lum",
        monthlySpent: 45000,
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault()
        setIsEditing(false)
        alert("O'zgarishlar saqlandi ✅")
    }

    const handleConfirmRegistration = () => {
        if (selectedTournamentForRegistration) {
            registerMutation.mutate(selectedTournamentForRegistration.id)
        }
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Noma'lum"
        return new Date(dateString).toLocaleString("uz-UZ", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="min-h-screen lg:p-6" style={{ backgroundColor: '#0e131f' }}>


            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
                        </div>
                        Hisob ma'lumotlari
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Onlayn</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    <div className="bg-black/50 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <User className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
                            <label className="text-sm font-medium text-gray-300">Foydalanuvchi</label>
                        </div>
                        <div className="text-white font-mono text-base lg:text-lg font-bold break-all">{profile.username}</div>
                    </div>

                    <div className="bg-black/50 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
                            <label className="text-sm font-medium text-gray-300">ID</label>
                        </div>
                        <div className="text-white font-mono text-base lg:text-lg font-bold">#{profile.user_id}</div>
                    </div>

                    <div className="bg-black/50 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                            </div>
                            <label className="text-sm font-medium text-gray-300">Holat</label>
                        </div>
                        <div className="text-green-400 font-bold text-base lg:text-lg">{profile.status}</div>
                    </div>

                    <div className="bg-black/50 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                            <label className="text-sm font-medium text-gray-300">So'nggi kirish</label>
                        </div>
                        <div className="text-blue-400 font-semibold text-sm lg:text-base">{profile.lastLogin}</div>
                    </div>

                    <div className="bg-black/50 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <Crown className="h-4 w-4 lg:h-5 lg:w-5 text-purple-500" />
                            <label className="text-sm font-medium text-gray-300">Tarif</label>
                        </div>
                        <div className="text-purple-400 font-bold text-base lg:text-lg">{profile.tariff}</div>
                    </div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Edit3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                        </div>
                        Shaxsiy ma'lumotlar
                    </h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${isEditing ? "bg-red-500 hover:bg-red-600 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black"
                            }`}
                    >
                        {isEditing ? "Bekor qilish" : "Tahrirlash"}
                    </button>
                </div>

                <div className="space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Ism
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Familiya
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-6 lg:pt-8 border-t border-gray-700/50">
                            <button
                                onClick={handleUpdateProfile}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105 text-sm lg:text-base"
                            >
                                <Save className="h-4 w-4 lg:h-5 lg:w-5" />
                                O'zgarishlarni saqlash
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Confirmation Modal */}
            {showRegistrationModal && selectedTournamentForRegistration && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-3xl p-6 lg:p-8 max-w-md w-full relative">
                        <button
                            onClick={() => {
                                setShowRegistrationModal(false)
                                setSelectedTournamentForRegistration(null)
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold text-white mb-4">Turnirga ro'yxatdan o'tish</h3>

                        <div className="space-y-4 mb-6">
                            <p className="text-gray-300">
                                <strong>{selectedTournamentForRegistration.name}</strong> turniriga ro'yxatdan o'tmoqchimisiz?
                            </p>

                            {selectedTournamentForRegistration.participationFee && (
                                <p className="text-yellow-400 font-bold">
                                    Ishtirok to'lovi: {selectedTournamentForRegistration.participationFee.toLocaleString()} so'm
                                </p>
                            )}

                            <p className="text-sm text-gray-400">
                                Boshlanish vaqti: {formatDate(selectedTournamentForRegistration.startTime)}
                            </p>

                            {selectedTournamentForRegistration.currentParticipants !== undefined &&
                                selectedTournamentForRegistration.maxParticipants !== undefined && (
                                    <p className="text-sm text-gray-400">
                                        Ishtirokchilar: {selectedTournamentForRegistration.currentParticipants}/
                                        {selectedTournamentForRegistration.maxParticipants}
                                    </p>
                                )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false)
                                    setSelectedTournamentForRegistration(null)
                                }}
                                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-2xl hover:bg-gray-600 transition-all duration-300 font-semibold"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={registerMutation.isPending}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-3 rounded-2xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {registerMutation.isPending ? "Yuklanmoqda..." : "Tasdiqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tournament Detail Modal */}
            {selectedTournament && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedTournament(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-white mb-4">{selectedTournament.name}</h3>
                        <p className="text-gray-300 mb-4">{selectedTournament.description}</p>

                        <div className="space-y-3 mb-6">
                            <p className="text-sm text-gray-400">
                                <strong>Boshlanish:</strong> {formatDate(selectedTournament.startTime)}
                            </p>
                            {selectedTournament.endTime && (
                                <p className="text-sm text-gray-400">
                                    <strong>Tugash:</strong> {formatDate(selectedTournament.endTime)}
                                </p>
                            )}
                            {selectedTournament.participationFee && (
                                <p className="text-sm text-gray-400">
                                    <strong>Ishtirok to'lovi:</strong> {selectedTournament.participationFee.toLocaleString()} so'm
                                </p>
                            )}
                            {selectedTournament.currentParticipants !== undefined && selectedTournament.maxParticipants !== undefined && (
                                <p className="text-sm text-gray-400">
                                    <strong>Ishtirokchilar:</strong> {selectedTournament.currentParticipants}/{selectedTournament.maxParticipants}
                                </p>
                            )}
                        </div>

                        {selectedTournament.regions && selectedTournament.regions.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-white mb-3">Hududlar</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedTournament.regions.map(region => (
                                        <div key={region.id} className="bg-gray-800 p-3 rounded-xl">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white font-semibold">{region.name}</span>
                                                <span className="text-gray-400 text-sm">
                                                    {region.currentParticipants}/{region.maxParticipants}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{
                                                        width: `${(region.currentParticipants / region.maxParticipants) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTournament.nationalPrizes && selectedTournament.nationalPrizes.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-white mb-3">Milliy mukofotlar</h4>
                                <div className="space-y-2">
                                    {selectedTournament.nationalPrizes.map(prize => (
                                        <div key={prize.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl">
                                            <span className="text-white">
                                                {prize.place}-o'rin
                                            </span>
                                            <span className="text-yellow-400 font-semibold">{prize.prize}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTournament.regionalPrizes && selectedTournament.regionalPrizes.length > 0 && (
                            <div>
                                <h4 className="text-lg font-bold text-white mb-3">Hududiy mukofotlar</h4>
                                <div className="space-y-2">
                                    {selectedTournament.regionalPrizes.map(prize => (
                                        <div key={prize.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl">
                                            <span className="text-white">
                                                {prize.place}-o'rin
                                            </span>
                                            <span className="text-yellow-400 font-semibold">{prize.prize}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile

