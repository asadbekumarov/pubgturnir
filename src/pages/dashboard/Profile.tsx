// import React, { useState } from "react";
// import { User, Edit3, Save, Camera, Loader } from "lucide-react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import apiClient from "../../lib/apiClient";

// const API_URL = import.meta.env.VITE_API_URL;

// const Profile: React.FC = () => {
//     const token = localStorage.getItem("token");
//     const [isEditing, setIsEditing] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const { data: profileData, isLoading, refetch } = useQuery({
//         queryKey: ["profile"],
//         queryFn: async () => {
//             if (!token) throw new Error("Token topilmadi, iltimos qaytadan login qiling");
//             const res = await apiClient.get(`${API_URL}/web/v1/user/profile`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return res.data;
//         },
//     });

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         phone: "+998901234567",
//         email: "",
//         bio: "Frontend Developer",
//         location: "Toshkent, O'zbekiston",
//         pubgId: "",
//         region: "",
//     });

//     React.useEffect(() => {
//         if (profileData?.data) {
//             setFormData({
//                 firstName: profileData.data.firstName || "",
//                 lastName: profileData.data.lastName || "",
//                 phone: profileData.data.phone || "+998901234567",
//                 email: profileData.data.email || "",
//                 bio: profileData.data.bio || "Frontend Developer",
//                 location: profileData.data.location || "Toshkent, O'zbekiston",
//                 pubgId: profileData.data.pubgId || "",
//                 region: profileData.data.region || "",
//             });
//         }
//     }, [profileData]);

//     const mutation = useMutation({
//         mutationFn: async (updateData: typeof formData) => {
//             if (!token) throw new Error("Token topilmadi");
//             const res = await apiClient.put(`${API_URL}/web/v1/user/profile`, updateData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return res.data;
//         },
//         onSuccess: () => {
//             setIsEditing(false);
//             refetch();
//             alert("O'zgarishlar muvaffaqiyatli saqlandi ✅");
//         },
//         onError: (err: any) => {
//             setError(err?.message || "Xatolik yuz berdi");
//             alert("Xatolik yuz berdi: " + (err?.message || "Noma'lum xatolik"));
//         },
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleUpdateProfile = () => {
//         mutation.mutate(formData);
//     };

//     if (isLoading && !formData.firstName) {
//         return (
//             <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0e131f' }}>
//                 <div className="flex items-center gap-3 text-white">
//                     <Loader className="h-6 w-6 animate-spin" />
//                     <span>Profile yuklanmoqda...</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen p-4 lg:p-6" style={{ backgroundColor: '#0e131f' }}>
//             <div className="mx-auto space-y-8">
//                 {/* Error message */}
//                 {error && (
//                     <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4">
//                         <p className="text-red-400">{error}</p>
//                     </div>
//                 )}

//                 {/* Header Section */}
//                 <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
//                     <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
//                         <div className="flex items-center space-x-6">
//                             <div className="relative">
//                                 <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center text-3xl font-bold text-black shadow-lg">
//                                     {formData.firstName ? formData.firstName[0] + (formData.lastName ? formData.lastName[0] : '') : profile.avatar}
//                                 </div>
//                                 <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
//                                     <Camera className="h-4 w-4 text-gray-800" />
//                                 </button>
//                                 <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800 animate-pulse"></div>
//                             </div>

//                             <div>
//                                 <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                                     {formData.firstName || 'Ism'} {formData.lastName || 'Familiya'}
//                                 </h1>
//                                 <p className="text-gray-400 text-lg mt-1">@{profile.username}</p>
//                                 <div className="flex items-center space-x-2 mt-3">
//                                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                                     <span className="text-green-400 text-sm font-medium">Online</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 disabled={isLoading}
//                                 className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${isEditing
//                                     ? "bg-red-500 hover:bg-red-600 text-white"
//                                     : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/20"
//                                     }`}
//                             >
//                                 {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Edit3 className="h-4 w-4" />}
//                                 {isEditing ? "Bekor qilish" : "Tahrirlash"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Profile Form */}
//                 <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
//                     <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
//                         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
//                             <User className="h-6 w-6 text-white" />
//                         </div>
//                         Shaxsiy ma'lumotlar
//                     </h2>

//                     <div className="space-y-8">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     Ism *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleInputChange}
//                                     disabled={!isEditing || isLoading}
//                                     required
//                                     className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing && !isLoading
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                         } outline-none backdrop-blur-sm`}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     Familiya *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleInputChange}
//                                     disabled={!isEditing || isLoading}
//                                     required
//                                     className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing && !isLoading
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                         } outline-none backdrop-blur-sm`}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     Email *
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     disabled={!isEditing || isLoading}
//                                     required
//                                     className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing && !isLoading
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                         } outline-none backdrop-blur-sm`}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     PUBG ID *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="pubgId"
//                                     value={formData.pubgId}
//                                     onChange={handleInputChange}
//                                     disabled={!isEditing || isLoading}
//                                     required
//                                     placeholder="PUBG ID kiriting"
//                                     className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing && !isLoading
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                         } outline-none backdrop-blur-sm`}
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     Region *
//                                 </label>
//                                 <select
//                                     name="region"
//                                     value={formData.region}
//                                     onChange={(e) => handleInputChange(e as any)}
//                                     disabled={!isEditing || isLoading}
//                                     required
//                                     className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing && !isLoading
//                                         ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
//                                         : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
//                                         } outline-none backdrop-blur-sm`}
//                                 >
//                                     <option value="">Region tanlang</option>
//                                     <option value="tashkent">Toshkent</option>
//                                     <option value="samarkand">Samarqand</option>
//                                     <option value="bukhara">Buxoro</option>
//                                     <option value="andijan">Andijon</option>
//                                     <option value="fergana">Farg'ona</option>
//                                     <option value="namangan">Namangan</option>
//                                     <option value="kashkadarya">Qashqadaryo</option>
//                                     <option value="surkhandarya">Surxondaryo</option>
//                                     <option value="jizzakh">Jizzax</option>
//                                     <option value="sirdarya">Sirdaryo</option>
//                                     <option value="navoi">Navoiy</option>
//                                     <option value="khorezm">Xorazm</option>
//                                     <option value="karakalpakstan">Qoraqalpog'iston</option>
//                                 </select>
//                             </div>

//                             <div className="space-y-3">
//                                 <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
//                                     <User className="h-4 w-4" />
//                                     Telefon
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleInputChange}
//                                     disabled={true}
//                                     className="w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed outline-none backdrop-blur-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-3">
//                             <label className="text-sm font-semibold text-gray-300">Bio</label>
//                             <textarea
//                                 name="bio"
//                                 value={formData.bio}
//                                 onChange={handleInputChange}
//                                 disabled={true}
//                                 rows={3}
//                                 className="w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium resize-none bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed outline-none backdrop-blur-sm"
//                             />
//                         </div>

//                         {isEditing && (
//                             <div className="flex justify-end pt-8 border-t border-gray-700/50">
//                                 <button
//                                     onClick={handleUpdateProfile}
//                                     disabled={isLoading}
//                                     className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                                 >
//                                     {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
//                                     {isLoading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;


import React, { useState } from "react";
import { User, Edit3, Save, Camera, Loader } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../../lib/apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const Profile: React.FC = () => {
    const token = localStorage.getItem("token");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // GET user data
    const { data: profileData, isLoading, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            if (!token) throw new Error("Token topilmadi, iltimos qaytadan login qiling");
            const res = await apiClient.get(`${API_URL}/web/v1/user/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    const [formData, setFormData] = useState({
        email: "",
        pubgId: "",
        region: "",
        isActive: false,
    });

    React.useEffect(() => {
        if (profileData?.data) {
            setFormData({
                email: profileData.data.email || "",
                pubgId: profileData.data.pubgId || "",
                region: profileData.data.region || "",
                isActive: profileData.data.isActive || false,
            });
        }
    }, [profileData]);

    // PUT update
    const mutation = useMutation({
        mutationFn: async (updateData: typeof formData) => {
            if (!token) throw new Error("Token topilmadi");
            const res = await apiClient.put(`${API_URL}/web/v1/user/profile`, updateData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
        onSuccess: () => {
            setIsEditing(false);
            refetch();
            alert("O‘zgarishlar muvaffaqiyatli saqlandi ✅");
        },
        onError: (err: any) => {
            setError(err?.message || "Xatolik yuz berdi");
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = () => {
        mutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0e131f]">
                <div className="flex items-center gap-3 text-white">
                    <Loader className="h-6 w-6 animate-spin" />
                    <span>Profil yuklanmoqda...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-[#0e131f] text-white">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            <div className="bg-gray-900/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-black">
                            <User />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <Camera className="h-4 w-4 text-gray-800" />
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{formData.email}</h1>
                        <p className="text-gray-400">PUBG ID: {formData.pubgId}</p>
                        <p className="text-gray-400">Region: {formData.region}</p>
                        <p
                            className={`font-semibold ${formData.isActive ? "text-green-400" : "text-red-400"
                                }`}
                        >
                            {formData.isActive ? "Active ✅" : "Inactive ❌"}
                        </p>
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            name="pubgId"
                            value={formData.pubgId}
                            onChange={handleInputChange}
                            placeholder="PUBG ID"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white"
                        />
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg bg-gray-800 text-white"
                        >
                            <option value="">Regionni tanlang</option>
                            <option value="Toshkent">Toshkent</option>
                            <option value="Sirdaryo">Sirdaryo</option>
                            <option value="Andijon">Andijon</option>
                        </select>
                        <button
                            onClick={handleUpdateProfile}
                            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            Saqlash
                        </button>
                    </div>
                )}

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-3 rounded-xl font-semibold transition ${isEditing
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                            }`}
                    >
                        {isEditing ? "Bekor qilish" : "Tahrirlash"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
