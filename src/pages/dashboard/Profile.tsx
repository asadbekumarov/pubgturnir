// "use client";

// import React, { useState, useEffect } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import apiClient from "../../lib/apiClient";
// import {
//     User,
//     CreditCard,
//     Shield,
//     Edit3,
//     Save,
// } from "lucide-react";

// type Region = {
//     id: string;
//     name: string;
//     currentParticipants: number;
//     maxParticipants: number;
// };

// type Prize = {
//     id: string;
//     place: number;
//     prize: string;
// };

// type Tournament = {
//     id: string;
//     name: string;
//     description: string;
//     startTime: string;
//     endTime?: string;
//     participationFee?: number;
//     status: "upcoming" | "ongoing" | "completed" | "cancelled";
//     regions?: Region[];
//     regionalPrizes?: Prize[];
//     nationalPrizes?: Prize[];
//     currentParticipants?: number;
//     maxParticipants?: number;
// };

// type Application = {
//     id: string;
//     tournament: {
//         id: string;
//         name: string;
//         startTime: string;
//         status: "upcoming" | "ongoing" | "completed" | "cancelled";
//     };
//     status: "pending" | "accepted" | "rejected";
//     appliedAt: string;
// };

// type RegistrationResponse = {
//     success: boolean;
//     message: string;
//     data: {
//         tournament: string;
//         user: string;
//         status: "pending" | "accepted" | "rejected";
//         appliedAt: string;
//         createdAt: string;
//         updatedAt: string;
//         id: string;
//     };
// };

// type UserData = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     pubgId: string;
//     email: string;
//     username: string;
//     region: string;
//     isActive: boolean;
//     lastLogin?: string;
//     joinDate?: string;
// };

// const API_URL = import.meta.env.VITE_API_URL;
// const VALID_REGIONS = [
//     "Toshkent",
//     "Farg'ona",
//     "Andijon",
//     "Namangan",
//     "Samarqand",
//     "Buxoro",
//     "Navoiy",
//     "Xorazm",
//     "Qashqadaryo",
//     "Surxondaryo",
//     "Jizzax",
//     "Sirdaryo",
//     "Qoraqalpog'iston",
// ];

// const LoadingScreen: React.FC = () => {
//     return (
//         <div
//             className="min-h-screen flex items-center justify-center"
//             style={{ backgroundColor: "#0e131f" }}
//         >
//             <div className="text-center">
//                 <div className="relative w-24 h-24 mx-auto mb-8">
//                     <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
//                     <div className="absolute inset-0 border-4 border-transparent border-t-yellow-500 border-r-yellow-500 rounded-full animate-spin"></div>
//                     <div className="absolute inset-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full animate-pulse flex items-center justify-center">
//                         <Shield className="h-10 w-10 text-black" />
//                     </div>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white mb-3">Yuklanmoqda...</h2>
//                 <p className="text-gray-400 text-sm">Ma'lumotlar yuklanmoqda</p>
//                 <div className="flex justify-center gap-2 mt-6">
//                     <div
//                         className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
//                         style={{ animationDelay: "0ms" }}
//                     ></div>
//                     <div
//                         className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
//                         style={{ animationDelay: "150ms" }}
//                     ></div>
//                     <div
//                         className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
//                         style={{ animationDelay: "300ms" }}
//                     ></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Profile: React.FC = () => {
//     const [formData, setFormData] = useState<UserData>({
//         id: "",
//         firstName: "",
//         lastName: "",
//         pubgId: "",
//         email: "",
//         region: "Toshkent",
//         username: "",
//         isActive: false,
//     });
//     const [isEditing, setIsEditing] = useState(false);
//     const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
//     const [showRegistrationModal, setShowRegistrationModal] = useState(false);
//     const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] =
//         useState<Tournament | null>(null);
//     const [isSaving, setIsSaving] = useState(false);

//     // Fetch valid regions
//     const { data: validRegions = VALID_REGIONS } = useQuery<string[]>({
//         queryKey: ["valid-regions"],
//         queryFn: async () => {
//             try {
//                 const res = await apiClient.get(`${API_URL}/web/v1/regions`);
//                 if (res.data.success && Array.isArray(res.data.data)) {
//                     return res.data.data;
//                 }
//                 throw new Error("Invalid regions data");
//             } catch (error) {
//                 console.warn("Falling back to default regions:", error);
//                 return VALID_REGIONS;
//             }
//         },
//         initialData: VALID_REGIONS,
//     });

//     // Fetch user data
//     const {
//         data: userData,
//         isLoading: isLoadingUser,
//         error: userError,
//         refetch: refetchUser,
//     } = useQuery<UserData>({
//         queryKey: ["user"],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/user/me`);
//             if (!res.data.success) throw new Error("Foydalanuvchi ma'lumotlari yuklanmadi");
//             return res.data.data;
//         },
//     });

//     // Fetch applications
//     const {
//         data: applicationsData,
//         isLoading: isLoadingApplications,
//         error: applicationsError,
//     } = useQuery<{ items: Application[] }>({
//         queryKey: ["applications"],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/application`);
//             if (!res.data.success || !res.data.data?.items)
//                 throw new Error("Arizalar yuklanmadi");
//             return res.data.data;
//         },
//     });

//     // Fetch tournaments
//     const {
//         data: tournamentsData,
//         isLoading: isLoadingTournaments,
//         error: tournamentsError,
//     } = useQuery<Tournament[]>({
//         queryKey: ["tournaments"],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
//             if (!res.data.success || !res.data.data?.items)
//                 throw new Error("Turnirlar yuklanmadi");
//             return res.data.data.items;
//         },
//     });

//     // Update form data when user data is loaded
//     useEffect(() => {
//         if (userData) {
//             const region = validRegions.includes(userData.region)
//                 ? userData.region
//                 : "Toshkent";
//             setFormData({
//                 id: userData.id || "",
//                 firstName: userData.firstName || "",
//                 lastName: userData.lastName || "",
//                 pubgId: userData.pubgId || "",
//                 email: userData.email || "",
//                 region,
//                 username: userData.username || "",
//                 isActive: userData.isActive ?? false,
//             });
//         }
//     }, [userData, validRegions]);

//     const registerMutation = useMutation({
//         mutationFn: async (tournamentId: string) => {
//             const response = await apiClient.post(`${API_URL}/web/v1/application`, {
//                 tournamentId,
//             });
//             return response.data as RegistrationResponse;
//         },
//         onSuccess: (data: RegistrationResponse) => {
//             if (data.success) {
//                 alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅");
//                 setShowRegistrationModal(false);
//                 setSelectedTournamentForRegistration(null);
//             } else {
//                 alert(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
//             }
//         },
//         onError: (error: any) => {
//             const errorMessage =
//                 error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
//             alert(errorMessage);
//         },
//     });

//     const updateProfileMutation = useMutation({
//         mutationFn: async (data: Partial<UserData>) => {
//             setIsSaving(true);
//             const response = await apiClient.put(`${API_URL}/web/v1/user/profile`, {
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 region: data.region,
//                 isActive: data.isActive,
//             });
//             return response.data;
//         },
//         onSuccess: (data) => {
//             if (data.success) {
//                 refetchUser();
//                 setIsEditing(false);
//             } else {
//                 alert(data.message || "Ma'lumotlarni yangilashda xatolik yuz berdi");
//             }
//         },
//         onError: (error: any) => {
//             const errorMessage =
//                 error.response?.data?.message || "Ma'lumotlarni yangilashda xatolik yuz berdi";
//             alert(errorMessage);
//         },
//         onSettled: () => {
//             setIsSaving(false);
//         },
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, checked } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: checked }));
//     };

//     const handleSaveProfile = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (isEditing) {
//             updateProfileMutation.mutate(formData);
//         }
//     };

//     const handleConfirmRegistration = () => {
//         if (selectedTournamentForRegistration) {
//             registerMutation.mutate(selectedTournamentForRegistration.id);
//         }
//     };

//     const formatDate = (dateString?: string) => {
//         if (!dateString) return "Noma'lum";
//         return new Date(dateString).toLocaleString("uz-UZ", {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     const isLoading = isLoadingUser || isLoadingApplications || isLoadingTournaments;
//     const hasError = userError || applicationsError || tournamentsError;

//     if (isLoading) {
//         return <LoadingScreen />;
//     }

//     if (hasError) {
//         return (
//             <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0e131f" }}>
//                 <div className="text-center text-white">
//                     <h2 className="text-2xl font-bold mb-4">Xatolik yuz berdi</h2>
//                     <p className="text-gray-400">
//                         Ma'lumotlarni yuklashda xatolik. Iltimos, keyinroq qayta urinib ko'ring.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen lg:p-6" style={{ backgroundColor: "#0e131f" }}>
//             {/* Account Info Summary */}
//             <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
//                     <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
//                             <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
//                         </div>
//                         Hisob ma'lumotlari
//                     </h2>
//                     <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
//                                <div className="text-green-400 font-bold text-base lg:text-lg">
//                             {formData.isActive ? "Active" : "Inactive"}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
//                     <div className="bg-black/50 p-4 lg:p-6 w-full rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
//                         <div className="flex items-center gap-3 mb-3">
//                             <User className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
//                             <label className="text-sm font-medium text-gray-300">Ism va Familiya</label>
//                         </div>
//                         <div className="text-white font-mono text-base lg:text-lg font-bold break-all">
//                             {formData.firstName || formData.lastName
//                                 ? `${formData.firstName} ${formData.lastName}`.trim()
//                                 : "Noma'lum"}
//                         </div>
//                     </div>
//                     <div className="bg-black/50 p-4 lg:p-6 w-full rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-green-500 flex items-center justify-center">
//                                 <div className="w-2 h-2 rounded-full bg-black"></div>
//                             </div>
//                             <label className="text-sm font-medium text-gray-300">Holat</label>
//                         </div>
//                         <div className="text-green-400 font-bold text-base lg:text-lg">
//                             {formData.isActive ? "Active" : "Inactive"}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Personal Info Section */}
//             <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
//                     <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
//                             <Edit3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
//                         </div>
//                         Shaxsiy ma'lumotlar
//                     </h2>
//                     <div className="flex items-center gap-3">
//                         {isSaving && (
//                             <span className="text-yellow-400 text-sm font-medium animate-pulse">
//                                 Saqlanmoqda...
//                             </span>
//                         )}
//                         <button
//                             onClick={() => setIsEditing(!isEditing)}
//                             className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${isEditing ? "bg-red-500 hover:bg-red-600 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black"
//                                 }`}
//                         >
//                             {isEditing ? "Bekor qilish" : "Tahrirlash"}
//                         </button>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSaveProfile} className="space-y-6 lg:space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
//                         {/* First Name */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <User className="h-4 w-4" />
//                                 Ism
//                             </label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                                 aria-disabled={!isEditing}
//                             />
//                         </div>

//                         {/* Last Name */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <User className="h-4 w-4" />
//                                 Familiya
//                             </label>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                                 aria-disabled={!isEditing}
//                             />
//                         </div>

//                         {/* PUBG ID */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <CreditCard className="h-4 w-4" />
//                                 PubgID
//                             </label>
//                             <input
//                                 type="text"
//                                 name="pubgId"
//                                 value={formData.pubgId}
//                                 disabled
//                                 className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm lg:text-base outline-none backdrop-blur-sm"
//                                 aria-disabled="true"
//                             />
//                         </div>

//                         {/* Email */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <Shield className="h-4 w-4" />
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 disabled
//                                 className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm lg:text-base outline-none backdrop-blur-sm"
//                                 aria-disabled="true"
//                             />
//                         </div>

//                         {/* Region */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <Shield className="h-4 w-4" />
//                                 Region
//                             </label>
//                             {isEditing ? (
//                                 <select
//                                     name="region"
//                                     value={formData.region}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none backdrop-blur-sm font-medium text-sm lg:text-base"
//                                     aria-label="Region"
//                                 >
//                                     {validRegions.map((region) => (
//                                         <option key={region} value={region}>
//                                             {region}
//                                         </option>
//                                     ))}
//                                 </select>
//                             ) : (
//                                 <div className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 font-medium text-sm lg:text-base">
//                                     {formData.region || "Noma'lum"}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Active Status */}
//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <Shield className="h-4 w-4" />
//                                 Active
//                             </label>
//                             <div
//                                 className={`flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
//                                         ? "bg-black/50 text-white border-gray-700"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                             >
//                                 <input
//                                     type="checkbox"
//                                     name="isActive"
//                                     checked={formData.isActive}
//                                     onChange={handleCheckboxChange}
//                                     disabled={!isEditing}
//                                     className="h-5 w-5 accent-yellow-500 cursor-pointer"
//                                     aria-checked={formData.isActive}
//                                     aria-disabled={!isEditing}
//                                 />
//                                 <span>{formData.isActive ? "Active" : "Inactive"}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {isEditing && (
//                         <div className="flex justify-end pt-6 lg:pt-8 border-t border-gray-700/50">
//                             <button
//                                 type="submit"
//                                 disabled={isSaving}
//                                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <Save className="h-4 w-4 lg:h-5 lg:w-5" />
//                                 Saqlash
//                             </button>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;
"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import apiClient from "../../lib/apiClient";
import {
    User,
    CreditCard,
    Shield,
    Edit3,
    Save,
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
    isActive: boolean;
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
        const toastId = toast(
            (t) => (
                <div className="flex items-center justify-between gap-4 p-3">
                    <span className="text-sm font-medium text-white">{message}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                resolve(true);
                                toast.dismiss(t.id);
                            }}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded font-semibold transition-all duration-200"
                        >
                            Ha
                        </button>
                        <button
                            onClick={() => {
                                resolve(false);
                                toast.dismiss(t.id);
                            }}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded font-semibold transition-all duration-200"
                        >
                            Yo'q
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                position: "top-right",
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    padding: "0",
                    maxWidth: "400px",
                },
            }
        );
    });
};

const LoadingScreen: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: "#0e131f" }}
        >
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
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] =
        useState<Tournament | null>(null);

    // Fetch valid regions
    const { data: validRegions = VALID_REGIONS } = useQuery<string[]>({
        queryKey: ["valid-regions"],
        queryFn: async () => {
            try {
                const res = await apiClient.get(`${API_URL}/web/v1/regions`);
                if (res.data.success && Array.isArray(res.data.data)) {
                    return res.data.data;
                }
                throw new Error("Invalid regions data");
            } catch (error) {
                console.warn("Falling back to default regions:", error);
                toast.error("Hududlar ro'yxati yuklanmadi. Standart ro'yxat ishlatilmoqda.", {
                    duration: 5000,
                    position: "top-right",
                });
                return VALID_REGIONS;
            }
        },
        initialData: VALID_REGIONS,
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
        onError: (error) => {
            toast.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik", {
                duration: 5000,
                position: "top-right",
            });
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
        onError: () => {
            toast.error("Arizalar ro'yxatini yuklashda xatolik", {
                duration: 5000,
                position: "top-right",
            });
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
        onError: () => {
            toast.error("Turnirlar ro'yxatini yuklashda xatolik", {
                duration: 5000,
                position: "top-right",
            });
        },
    });

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

    // Register mutation - TOAST bilan
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
                    duration: 4000,
                    position: "top-right",
                    style: {
                        background: "#10b981",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #059669",
                        fontSize: "14px",
                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: "#10b981",
                    },
                });
                setShowRegistrationModal(false);
                setSelectedTournamentForRegistration(null);
            } else {
                toast.error(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi", {
                    duration: 5000,
                    position: "top-right",
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #dc2626",
                        fontSize: "14px",
                    },
                });
            }
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
            toast.error(errorMessage, {
                duration: 5000,
                position: "top-right",
                style: {
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #dc2626",
                    fontSize: "14px",
                },
            });
        },
    });

    // Update profile mutation - TOAST bilan
    const updateProfileMutation = useMutation({
        mutationFn: async (data: Partial<UserData>) => {
            const toastId = toast.loading("⏳ Profil yangilanmoqda...", {
                id: "profile-update",
                duration: 10000,
                position: "top-right",
                style: {
                    background: "#f3aa01",
                    color: "#000",
                    borderRadius: "8px",
                    border: "1px solid #d97706",
                    fontSize: "14px",
                },
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
                    position: "top-right",
                    style: {
                        background: "#10b981",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #059669",
                        fontSize: "14px",
                    },
                });
                refetchUser();
                setIsEditing(false);
            } else {
                toast.error(data.message || "Ma'lumotlarni yangilashda xatolik yuz berdi", {
                    duration: 5000,
                    position: "top-right",
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #dc2626",
                        fontSize: "14px",
                    },
                });
            }
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message || "Ma'lumotlarni yangilashda xatolik yuz berdi",
                {
                    duration: 5000,
                    position: "top-right",
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #dc2626",
                        fontSize: "14px",
                    },
                }
            );
        },
    });

    // Edit toggle handler - window.confirm → custom toast
    const handleEditToggle = async () => {
        if (isEditing) {
            // Bekor qilish tasdiqlash
            const confirmed = await showConfirmToast("O'zgarishlarni bekor qilishni xohlaysizmi?");
            if (confirmed) {
                setIsEditing(false);
                toast.success("✅ Tahrirlash rejimi bekor qilindi", {
                    duration: 3000,
                    position: "top-right",
                    style: {
                        background: "#6b7280",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #4b5563",
                    },
                });
                // Formani asl holatga qaytarish
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
            // Tahrirlashni yoqish
            setIsEditing(true);
            toast.success("✏️ Tahrirlash rejimi yoqildi", {
                duration: 3000,
                position: "top-right",
                style: {
                    background: "#10b981",
                    color: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #059669",
                },
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

        // Ma'lumotlar validatsiyasi
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            toast.error("Ism va familiya majburiy maydonlar!", {
                duration: 4000,
                position: "top-right",
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

    const isLoading = isLoadingUser || isLoadingApplications || isLoadingTournaments;
    const hasError = userError || applicationsError || tournamentsError;

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (hasError) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0e131f" }}>
                <div className="text-center text-white max-w-md mx-auto p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Xatolik yuz berdi</h2>
                    <p className="text-gray-400 mb-6">
                        Ma'lumotlarni yuklashda xatolik. Iltimos, keyinroq qayta urinib ko'ring.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        >
                            Qayta yuklash
                        </button>
                        <button
                            onClick={() => refetchUser()}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        >
                            Yangilash
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen lg:p-6" style={{ backgroundColor: "#0e131f" }}>
            {/* Account Info Summary */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
                        </div>
                        Hisob ma'lumotlari
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <div className={`font-bold text-base lg:text-lg ${formData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 lg:gap-6">
                    <div className="bg-black/50 p-4 lg:p-6 w-full rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <User className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
                            <label className="text-sm font-medium text-gray-300">Ism va Familiya</label>
                        </div>
                        <div className="text-white font-mono text-base lg:text-lg font-bold break-all">
                            {formData.firstName || formData.lastName
                                ? `${formData.firstName} ${formData.lastName}`.trim()
                                : "Noma'lum"}
                        </div>
                    </div>
                    <div className="bg-black/50 p-4 lg:p-6 w-full rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                            </div>
                            <label className="text-sm font-medium text-gray-300">Holat</label>
                        </div>
                        <div className={`font-bold text-base lg:text-lg ${formData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                            {formData.isActive ? "Active" : "Inactive"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Info Section */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Edit3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                        </div>
                        Shaxsiy ma'lumotlar
                    </h2>
                    <div className="flex items-center gap-3">
                        {updateProfileMutation.isPending && (
                            <span className="text-yellow-400 text-sm font-medium animate-pulse flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                Saqlanmoqda...
                            </span>
                        )}
                        <button
                            onClick={handleEditToggle}
                            disabled={updateProfileMutation.isPending}
                            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed ${isEditing
                                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
                                    : "bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/25"
                                }`}
                        >
                            {isEditing ? "❌ Bekor qilish" : "✏️ Tahrirlash"}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6 lg:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {/* First Name */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Ism <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing || updateProfileMutation.isPending}
                                required
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing && !updateProfileMutation.isPending
                                        ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                        : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                                aria-disabled={!isEditing || updateProfileMutation.isPending}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Familiya <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing || updateProfileMutation.isPending}
                                required
                                className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing && !updateProfileMutation.isPending
                                        ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                        : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                                aria-disabled={!isEditing || updateProfileMutation.isPending}
                            />
                        </div>

                        {/* PUBG ID */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                PubgID
                            </label>
                            <input
                                type="text"
                                name="pubgId"
                                value={formData.pubgId}
                                disabled
                                className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm lg:text-base outline-none backdrop-blur-sm"
                                aria-disabled="true"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed font-medium text-sm lg:text-base outline-none backdrop-blur-sm"
                                aria-disabled="true"
                            />
                        </div>

                        {/* Region */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Region
                            </label>
                            {isEditing && !updateProfileMutation.isPending ? (
                                <select
                                    name="region"
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none backdrop-blur-sm font-medium text-sm lg:text-base"
                                    aria-label="Region"
                                >
                                    {validRegions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border bg-gray-800/50 text-gray-300 border-gray-800 font-medium text-sm lg:text-base">
                                    {formData.region || "Noma'lum"}
                                </div>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Active
                            </label>
                            <div
                                className={`flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing && !updateProfileMutation.isPending
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
                                    className="h-5 w-5 accent-yellow-500 cursor-pointer"
                                    aria-checked={formData.isActive}
                                />
                                <span>{formData.isActive ? "Faol" : "Faol emas"}</span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end pt-6 lg:pt-8 border-t border-gray-700/50">
                            <button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="h-4 w-4 lg:h-5 lg:w-5" />
                                {updateProfileMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {/* Registration Modal (agar kerak bo'lsa) */}
            {showRegistrationModal && selectedTournamentForRegistration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 rounded-3xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Turnirga ro'yxat</h3>
                        <p className="text-gray-300 mb-6">
                            "{selectedTournamentForRegistration.name}" turniriga ro'yxatdan o'tmoqchimisiz?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRegistrationModal(false);
                                    setSelectedTournamentForRegistration(null);
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleConfirmRegistration}
                                disabled={registerMutation.isPending}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-colors disabled:opacity-50"
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