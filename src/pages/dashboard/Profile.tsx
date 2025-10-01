// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useQuery, useMutation } from "@tanstack/react-query";
// import apiClient from "../../lib/apiClient";

// import {
//     User,
//     CreditCard,
//     Shield,
//     Edit3,
//     Save,
//     Crown,
//     TrendingUp,
//     Activity,
//     Camera,
//     CheckCircle,
//     XCircle,
//     Clock,

// } from "lucide-react"

// type Prize = {
//     id: string
//     place: number
//     prize: string
// }

// type Region = {
//     id: string
//     name: string
//     currentParticipants: number
//     maxParticipants: number
// }

// type Tournament = {
//     id: string
//     name: string
//     description: string
//     startTime: string
//     endTime?: string
//     participationFee?: number
//     status: "upcoming" | "ongoing" | "completed" | "cancelled"
//     regions?: Region[]
//     regionalPrizes?: Prize[]
//     nationalPrizes?: Prize[]
//     currentParticipants?: number
//     maxParticipants?: number
// }

// type Application = {
//     id: string
//     tournament: string
//     user: string
//     status: "pending" | "accepted" | "rejected"
//     appliedAt: string
//     reviewedAt?: string
//     rejectionReason?: string | null
//     createdAt: string
//     updatedAt: string
// }

// type RegistrationResponse = {
//     success: boolean
//     message: string
//     data: {
//         tournament: string
//         user: string
//         status: "pending" | "accepted" | "rejected"
//         appliedAt: string
//         createdAt: string
//         updatedAt: string
//         id: string
//     }
// }

// const API_URL = import.meta.env.VITE_API_URL

// const Profile: React.FC = () => {
//     const [formData, setFormData] = useState({
//         firstName: "Asadbek",
//         lastName: "Umarov",
//         phone: "+998901234567",
//         email: "asadbek@example.com",
//     })

//     const [isEditing, setIsEditing] = useState(false)
//     const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
//     const [showRegistrationModal, setShowRegistrationModal] = useState(false)
//     const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] = useState<Tournament | null>(null)

//     const { data: applicationsData, isLoading: loadingApps, refetch } = useQuery({
//         queryKey: ["applications"],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/application`);
//             if (!res.data.success || !res.data.data?.items) throw new Error("Arizalar yuklanmadi");
//             return res.data.data;
//         },
//     });

//     const _applications = applicationsData?.items || [];

//     const { data: tournamentsData, isLoading: loadingTournaments } = useQuery({
//         queryKey: ["tournaments"],
//         queryFn: async () => {
//             const res = await apiClient.get(`${API_URL}/web/v1/tournament`);
//             if (!res.data.success || !res.data.data?.items) throw new Error("Turnirlar yuklanmadi");
//             return res.data.data.items;
//         },
//     });

//     const upcomingTournaments: Tournament[] = (tournamentsData || []).filter(
//         (tournament: Tournament) => tournament.status === "upcoming"
//     );


//     const registerMutation = useMutation({
//         mutationFn: async (tournamentId: string) => {
//             const response = await apiClient.post(`${API_URL}/web/v1/application`, {
//                 tournamentId: tournamentId,
//             });
//             return response.data;
//         },
//         onSuccess: (data: RegistrationResponse) => {
//             if (data.success) {
//                 alert("Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅");
//                 setShowRegistrationModal(false);
//                 setSelectedTournamentForRegistration(null);
//                 refetch();
//             } else {
//                 alert(data.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
//             }
//         },
//         onError: (error: any) => {
//             const errorMessage = error.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi";
//             alert(errorMessage);
//         }
//     });
//     if (loadingApps) {
//         return <div>Loading applications...</div>
//     }

//     const profile = {
//         username: "asadbek_dev",
//         user_id: 101,
//         balance: 250000,
//         tariff: "Premium",
//         status: "Faol",
//         lastLogin: "2024-09-23",
//         totalTransactions: 48,
//         avatar: "AS",
//         joinDate: "2022-05-15",
//         monthlySpent: 45000,
//     }

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleUpdateProfile = (e: React.FormEvent) => {
//         e.preventDefault()
//         setIsEditing(false)
//         alert("O'zgarishlar saqlandi ✅")
//     }

//     const handleRegisterClick = (tournament: Tournament) => {
//         setSelectedTournamentForRegistration(tournament)
//         setShowRegistrationModal(true)
//     }

//     const handleConfirmRegistration = () => {
//         if (selectedTournamentForRegistration) {
//             registerMutation.mutate(selectedTournamentForRegistration.id)
//         }
//     }

//     const formatDate = (dateString?: string) => {
//         if (!dateString) return "Noma'lum"
//         return new Date(dateString).toLocaleString("uz-UZ", {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         })
//     }

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "accepted": return "text-green-400"
//             case "rejected": return "text-red-400"
//             default: return "text-yellow-400"
//         }
//     }

//     const getStatusIcon = (status: string) => {
//         switch (status) {
//             case "accepted": return <CheckCircle className="h-4 w-4 text-green-400" />
//             case "rejected": return <XCircle className="h-4 w-4 text-red-400" />
//             default: return <Clock className="h-4 w-4 text-yellow-400" />
//         }
//     }

//     // const getTournamentName = (tournamentId: string) => {
//     //     const tournament = availableTournaments.find(t => t.id === tournamentId);
//     //     return tournament ? tournament.name : `Turnir (ID: ${tournamentId})`;
//     // }

//     // const getTournamentDescription = (tournamentId: string) => {
//     //     const tournament = availableTournaments.find(t => t.id === tournamentId);
//     //     return tournament ? tournament.description : "";
//     // }

//     // const isUserRegistered = (tournamentId: string) => {
//     //     return applications.some(app => app.tournament === tournamentId);
//     // }

//     // const getApplicationStatus = (tournamentId: string) => {
//     //     const application = applications.find(app => app.tournament === tournamentId);
//     //     return application ? application.status : null;
//     // }

//     return (
//         <div className="min-h-screen p-4 lg:p-6" style={{ backgroundColor: '#0e131f' }}>

//             {/* Profile Header */}
//             <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6 py-6 lg:py-10 bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
//                 <div className="relative">
//                     <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center text-2xl lg:text-3xl font-bold text-black shadow-lg">
//                         {profile.avatar}
//                     </div>
//                     <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
//                         <Camera className="h-4 w-4 text-gray-800" />
//                     </button>
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
//                 </div>

//                 <div className="text-center lg:text-left">
//                     <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                         {formData.firstName} {formData.lastName}
//                     </h1>
//                     <p className="text-gray-400 text-base lg:text-lg mt-1">@{profile.username}</p>
//                     <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
//                         <div className="flex items-center space-x-2">
//                             <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                             <span className="text-green-400 text-sm font-medium">Online</span>
//                         </div>
//                         <div className="text-gray-500 text-sm">Qo'shilgan: {profile.joinDate}</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
//                 <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-gray-400 text-sm font-medium">Balans</p>
//                             <p className="text-xl lg:text-2xl font-bold text-yellow-400">{profile.balance.toLocaleString()}</p>
//                             <p className="text-xs text-gray-500">so'm</p>
//                         </div>
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
//                             <CreditCard className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-gray-400 text-sm font-medium">Bu oyda sarflangan</p>
//                             <p className="text-xl lg:text-2xl font-bold text-green-400">{profile.monthlySpent.toLocaleString()}</p>
//                             <p className="text-xs text-gray-500">so'm</p>
//                         </div>
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
//                             <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-gray-400 text-sm font-medium">Jami tranzaksiyalar</p>
//                             <p className="text-xl lg:text-2xl font-bold text-blue-400">{profile.totalTransactions}</p>
//                             <p className="text-xs text-gray-500">ta</p>
//                         </div>
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
//                             <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4 lg:p-6 hover:scale-105 transition-all duration-300">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-gray-400 text-sm font-medium">Tarif</p>
//                             <p className="text-xl lg:text-2xl font-bold text-purple-400">{profile.tariff}</p>
//                             <p className="text-xs text-gray-500">faol</p>
//                         </div>
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                             <Crown className="h-5 w-5 lg:h-6 lg:w-6 text-black" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Personal Info */}
//             <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 space-y-4 sm:space-y-0">
//                     <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
//                         <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
//                             <Edit3 className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
//                         </div>
//                         Shaxsiy ma'lumotlar
//                     </h2>
//                     <button
//                         onClick={() => setIsEditing(!isEditing)}
//                         className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${isEditing ? "bg-red-500 hover:bg-red-600 text-white" : "bg-yellow-500 hover:bg-yellow-400 text-black"
//                             }`}
//                     >
//                         {isEditing ? "Bekor qilish" : "Tahrirlash"}
//                     </button>
//                 </div>

//                 <div className="space-y-6 lg:space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
//                                     ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                     : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                             />
//                         </div>

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
//                                     ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                     : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                             />
//                         </div>

//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <CreditCard className="h-4 w-4" />
//                                 Telefon
//                             </label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
//                                     ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                     : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                             />
//                         </div>

//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                 <Shield className="h-4 w-4" />
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 disabled={!isEditing}
//                                 className={`w-full px-4 lg:px-6 py-3 lg:py-4 rounded-2xl border transition-all duration-300 font-medium text-sm lg:text-base ${isEditing
//                                     ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                     : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                     } outline-none backdrop-blur-sm`}
//                             />
//                         </div>
//                     </div>

//                     {isEditing && (
//                         <div className="flex justify-end pt-6 lg:pt-8 border-t border-gray-700/50">
//                             <button
//                                 onClick={handleUpdateProfile}
//                                 className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105 text-sm lg:text-base"
//                             >
//                                 <Save className="h-4 w-4 lg:h-5 lg:w-5" />
//                                 O'zgarishlarni saqlash
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Upcoming Tournaments Section */}
//             {/* <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 mb-8 shadow-2xl">
//                           <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8 flex items-center gap-3">
//                               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
//                                   <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
//                               </div>
//                               Kelgusi Turnirlar
//                           </h2>

//                           {loadingTournaments ? (
//                               <p className="text-gray-400">⏳ Turnirlar yuklanmoqda...</p>
//                           ) : upcomingTournaments.length === 0 ? (
//                               <p className="text-gray-400">❌ Hozircha kelgusi turnirlar yo'q</p>
//                           ) : (
//                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//                                   {upcomingTournaments.map((tournament) => {
//                                       const isRegistered = isUserRegistered(tournament.id);
//                                       const applicationStatus = getApplicationStatus(tournament.id);
//                                       const isFull = tournament.maxParticipants && tournament.currentParticipants && tournament.currentParticipants >= tournament.maxParticipants;

//                                       return (
//                                           <div key={tournament.id} className="bg-black/40 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
//                                               <div className="flex items-center justify-between mb-3">
//                                                   <h3 className="text-lg font-bold text-white">{tournament.name}</h3>
//                                                   <div className="flex items-center gap-2">
//                                                       {isRegistered && applicationStatus === "accepted" && (
//                                                           <CheckCircle className="h-5 w-5 text-green-400" />
//                                                       )}
//                                                       {isRegistered && applicationStatus === "pending" && (
//                                                           <Clock className="h-5 w-5 text-yellow-400" />
//                                                       )}
//                                                       {isFull && (
//                                                           <div className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
//                                                               To'ldi
//                                                           </div>
//                                                       )}
//                                                   </div>
//                                               </div>

//                                               <p className="text-gray-400 text-sm mb-4">{tournament.description}</p>

//                                               <div className="space-y-3 mb-4">
//                                                   <div className="flex justify-between items-center text-xs text-gray-500">
//                                                       <span>Boshlanish:</span>
//                                                       <span>{formatDate(tournament.startTime)}</span>
//                                                   </div>

//                                                   {tournament.participationFee && (
//                                                       <div className="flex justify-between items-center text-xs text-gray-500">
//                                                           <span>Ishtirok to'lovi:</span>
//                                                           <span className="text-yellow-400 font-bold">{tournament.participationFee.toLocaleString()} so'm</span>
//                                                       </div>
//                                                   )}

//                                                   {tournament.currentParticipants !== undefined && tournament.maxParticipants !== undefined && (
//                                                       <div className="flex justify-between items-center text-xs text-gray-500">
//                                                           <span>Ishtirokchilar:</span>
//                                                           <span>{tournament.currentParticipants}/{tournament.maxParticipants}</span>
//                                                       </div>
//                                                   )}

//                                                   {tournament.regions && (
//                                                       <div className="text-xs text-gray-500">
//                                                           <span className="block mb-1">Hududlar:</span>
//                                                           <div className="flex flex-wrap gap-1">
//                                                               {tournament.regions.map(region => (
//                                                                   <span key={region.id} className="bg-gray-700 px-2 py-1 rounded text-xs">
//                                                                       {region.name}
//                                                                   </span>
//                                                               ))}
//                                                           </div>
//                                                       </div>
//                                                   )}
//                                               </div>

//                                               <div className="flex gap-2">
//                                                   <button
//                                                       onClick={() => setSelectedTournament(tournament)}
//                                                       className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-xl hover:bg-gray-600 transition-all duration-300 text-sm font-semibold"
//                                                   >
//                                                       Batafsil
//                                                   </button>

//                                                   {isRegistered ? (
//                                                       <button
//                                                           disabled
//                                                           className="flex-1 bg-gray-600 text-gray-400 px-3 py-2 rounded-xl cursor-not-allowed text-sm font-semibold"
//                                                       >
//                                                           {applicationStatus === "accepted" ? "Qabul qilindi" :
//                                                               applicationStatus === "pending" ? "Kutilmoqda" : "Ro'yxatdan o'tilgan"}
//                                                       </button>
//                                                   ) : (
//                                                       <button
//                                                           onClick={() => handleRegisterClick(tournament)}
//                                                           disabled={registerMutation.isPending || isFull}
//                                                           className={`flex-1 px-3 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${isFull
//                                                               ? "bg-red-500/50 text-gray-300 cursor-not-allowed"
//                                                               : "bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:shadow-lg hover:shadow-green-500/20 transform hover:scale-105"
//                                                               }`}
//                                                       >
//                                                           {registerMutation.isPending ? "Yuklanmoqda..." :
//                                                               isFull ? "To'ldi" : "Ro'yxatdan o'tish"}
//                                                       </button>
//                                                   )}
//                                               </div>
//                                           </div>
//                                       );
//                                   })}
//                               </div>
//                           )}
//                       </div>

//             {/* Applications Section */}
//             {/* <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-gray-800/50 shadow-2xl">
//                 <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8 flex items-center gap-3">
//                     <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
//                         <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
//                     </div>
//                     Mening arizalarim
//                 </h2>
//                 {loadingApps ? (
//                     <p className="text-gray-400">⏳ Yuklanmoqda...</p>
//                 ) : applications.length === 0 ? (
//                     <p className="text-gray-400">❌ Hozircha arizangiz yo'q</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {applications.map((app) => (
//                             <div key={app.id} className="bg-black/40 p-4 lg:p-6 rounded-2xl border border-gray-800/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm" >
//                                 <div className="flex items-center justify-between mb-3">
//                                     <h3 className="text-lg font-bold text-white">{getTournamentName(app.tournament)}</h3>
//                                     <div className="flex items-center gap-2">
//                                         {getStatusIcon(app.status)}
//                                         <span className={`font-semibold ${getStatusColor(app.status)}`}>
//                                             {app.status === "pending" ? "Kutilmoqda" : app.status === "accepted" ? "Qabul qilindi" : "Rad etildi"}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <p className="text-gray-400 text-sm">{getTournamentDescription(app.tournament)}</p>
//                                 <div className="mt-3 text-xs text-gray-500">
//                                     <p>Ariza topshirilgan: {formatDate(app.appliedAt)}</p>
//                                     {app.reviewedAt && <p>Ko'rib chiqilgan: {formatDate(app.reviewedAt)}</p>}
//                                     {app.rejectionReason && (
//                                         <p className="text-red-400">Rad etish sababi: {app.rejectionReason}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>  */}

//             {showRegistrationModal && selectedTournamentForRegistration && (
//                 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-3xl p-6 lg:p-8 max-w-md w-full relative">
//                         <button
//                             onClick={() => {
//                                 setShowRegistrationModal(false)
//                                 setSelectedTournamentForRegistration(null)
//                             }}
//                             className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
//                         >
//                             ✕
//                         </button>

//                         <h3 className="text-2xl font-bold text-white mb-4">Turnirga ro'yxatdan o'tish</h3>

//                         <div className="space-y-4 mb-6">
//                             <p className="text-gray-300">
//                                 <strong>{selectedTournamentForRegistration.name}</strong> turniriga ro'yxatdan o'tmoqchimisiz?
//                             </p>

//                             {selectedTournamentForRegistration.participationFee && (
//                                 <p className="text-yellow-400 font-bold">
//                                     Ishtirok to'lovi: {selectedTournamentForRegistration.participationFee.toLocaleString()} so'm
//                                 </p>
//                             )}

//                             <p className="text-sm text-gray-400">
//                                 Boshlanish vaqti: {formatDate(selectedTournamentForRegistration.startTime)}
//                             </p>

//                             {selectedTournamentForRegistration.currentParticipants !== undefined &&
//                                 selectedTournamentForRegistration.maxParticipants !== undefined && (
//                                     <p className="text-sm text-gray-400">
//                                         Ishtirokchilar: {selectedTournamentForRegistration.currentParticipants}/
//                                         {selectedTournamentForRegistration.maxParticipants}
//                                     </p>
//                                 )}
//                         </div>

//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => {
//                                     setShowRegistrationModal(false)
//                                     setSelectedTournamentForRegistration(null)
//                                 }}
//                                 className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-2xl hover:bg-gray-600 transition-all duration-300 font-semibold"
//                             >
//                                 Bekor qilish
//                             </button>
//                             <button
//                                 onClick={handleConfirmRegistration}
//                                 disabled={registerMutation.isPending}
//                                 className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black px-4 py-3 rounded-2xl hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {registerMutation.isPending ? "Yuklanmoqda..." : "Tasdiqlash"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {selectedTournament && (
//                 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <button
//                             onClick={() => setSelectedTournament(null)}
//                             className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
//                         >
//                             ✕
//                         </button>
//                         <h3 className="text-2xl font-bold text-white mb-4">{selectedTournament.name}</h3>
//                         <p className="text-gray-300 mb-4">{selectedTournament.description}</p>

//                         <div className="space-y-3 mb-6">
//                             <p className="text-sm text-gray-400">
//                                 <strong>Boshlanish:</strong> {formatDate(selectedTournament.startTime)}
//                             </p>
//                             {selectedTournament.endTime && (
//                                 <p className="text-sm text-gray-400">
//                                     <strong>Tugash:</strong> {formatDate(selectedTournament.endTime)}
//                                 </p>
//                             )}
//                             {selectedTournament.participationFee && (
//                                 <p className="text-sm text-gray-400">
//                                     <strong>Ishtirok to'lovi:</strong> {selectedTournament.participationFee.toLocaleString()} so'm
//                                 </p>
//                             )}
//                             {selectedTournament.currentParticipants !== undefined && selectedTournament.maxParticipants !== undefined && (
//                                 <p className="text-sm text-gray-400">
//                                     <strong>Ishtirokchilar:</strong> {selectedTournament.currentParticipants}/{selectedTournament.maxParticipants}
//                                 </p>
//                             )}
//                         </div>

//                         {selectedTournament.regions && selectedTournament.regions.length > 0 && (
//                             <div className="mb-6">
//                                 <h4 className="text-lg font-bold text-white mb-3">Hududlar</h4>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     {selectedTournament.regions.map(region => (
//                                         <div key={region.id} className="bg-gray-800 p-3 rounded-xl">
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span className="text-white font-semibold">{region.name}</span>
//                                                 <span className="text-gray-400 text-sm">
//                                                     {region.currentParticipants}/{region.maxParticipants}
//                                                 </span>
//                                             </div>
//                                             <div className="w-full bg-gray-700 rounded-full h-2">
//                                                 <div
//                                                     className="bg-green-500 h-2 rounded-full"
//                                                     style={{
//                                                         width: `${(region.currentParticipants / region.maxParticipants) * 100}%`
//                                                     }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {selectedTournament.nationalPrizes && selectedTournament.nationalPrizes.length > 0 && (
//                             <div className="mb-6">
//                                 <h4 className="text-lg font-bold text-white mb-3">Milliy mukofotlar</h4>
//                                 <div className="space-y-2">
//                                     {selectedTournament.nationalPrizes.map(prize => (
//                                         <div key={prize.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl">
//                                             <span className="text-white">
//                                                 {prize.place}-o'rin
//                                             </span>
//                                             <span className="text-yellow-400 font-semibold">{prize.prize}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {selectedTournament.regionalPrizes && selectedTournament.regionalPrizes.length > 0 && (
//                             <div>
//                                 <h4 className="text-lg font-bold text-white mb-3">Hududiy mukofotlar</h4>
//                                 <div className="space-y-2">
//                                     {selectedTournament.regionalPrizes.map(prize => (
//                                         <div key={prize.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl">
//                                             <span className="text-white">
//                                                 {prize.place}-o'rin
//                                             </span>
//                                             <span className="text-yellow-400 font-semibold">{prize.prize}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Profile
"use client"

import type React from "react"
import { useState } from "react"
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

const API_URL = import.meta.env.VITE_API_URL

const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "Asadbek",
        lastName: "Umarov",
        phone: "+998901234567",
        email: "asadbek@example.com",
    })

    const [isEditing, setIsEditing] = useState(false)
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const [selectedTournamentForRegistration, setSelectedTournamentForRegistration] = useState<Tournament | null>(null)

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

    if (loadingApps) {
        return <div>Loading applications...</div>
    }

    const profile = {
        username: "asadbek_dev",
        user_id: 101,
        balance: 250000,
        tariff: "Premium",
        status: "Faol",
        lastLogin: "2024-09-23",
        totalTransactions: 48,
        avatar: "AS",
        joinDate: "2022-05-15",
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
        <div className="min-h-screen p-4 lg:p-6" style={{ backgroundColor: '#0e131f' }}>


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