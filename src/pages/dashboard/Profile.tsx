// import React, { useState } from "react";
// import { User, Edit3, Save, Camera, Loader } from "lucide-react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import apiClient from "../../lib/apiClient";

// const API_URL = import.meta.env.VITE_API_URL;

// const Profile: React.FC = () => {
//     const token = localStorage.getItem("token");
//     const [isEditing, setIsEditing] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // GET user data
//     const { data: profileData, isLoading, refetch } = useQuery({
//         queryKey: ["profile"],
//         queryFn: async () => {
//             if (!token) throw new Error("Token topilmadi, iltimos qaytadan login qiling");
//             const res = await apiClient.get(`${API_URL}/web/v1/user/me`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return res.data;
//         },
//     });

//     const [formData, setFormData] = useState({
//         email: "",
//         pubgId: "",
//         region: "",
//         isActive: false,
//     });

//     React.useEffect(() => {
//         if (profileData?.data) {
//             setFormData({
//                 email: profileData.data.email || "",
//                 pubgId: profileData.data.pubgId || "",
//                 region: profileData.data.region || "",
//                 isActive: profileData.data.isActive || false,
//             });
//         }
//     }, [profileData]);

//     // PUT update
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
//             alert("O‘zgarishlar muvaffaqiyatli saqlandi ✅");
//         },
//         onError: (err: any) => {
//             setError(err?.message || "Xatolik yuz berdi");
//         },
//     });

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleUpdateProfile = () => {
//         mutation.mutate(formData);
//     };

//     if (isLoading || isValidating) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#0e131f]">
//                 <div className="flex items-center gap-3 text-white">
//                     <Loader className="h-6 w-6 animate-spin" />
//                     <span>Tekshirilmoqda...</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen p-6 bg-[#0e131f] text-white">
//             {error && (
//                 <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-4">
//                     <p className="text-red-400">{error}</p>
//                 </div>
//             )}

//             <div className="bg-gray-900/50 rounded-2xl p-6 shadow-lg">
//                 <div className="flex items-center gap-6">
//                     <div className="relative">
//                         <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-black">
//                             <User />
//                         </div>
//                         <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
//                             <Camera className="h-4 w-4 text-gray-800" />
//                         </button>
//                     </div>

//                     <div>
//                         <h1 className="text-2xl font-bold">{formData.email}</h1>
//                         <p className="text-gray-400">PUBG ID: {formData.pubgId}</p>
//                         <p className="text-gray-400">Region: {formData.region}</p>
//                         <p
//                             className={`font-semibold ${formData.isActive ? "text-green-400" : "text-red-400"
//                                 }`}
//                         >
//                             {formData.isActive ? "Active ✅" : "Inactive ❌"}
//                         </p>
//                     </div>
//                 </div>

//                 {isEditing && (
//                     <div className="mt-6 space-y-4">
//                         <input
//                             type="text"
//                             name="pubgId"
//                             value={formData.pubgId}
//                             onChange={handleInputChange}
//                             placeholder="PUBG ID"
//                             className="w-full p-3 rounded-lg bg-gray-800 text-white"
//                         />
//                         <select
//                             name="region"
//                             value={formData.region}
//                             onChange={handleInputChange}
//                             className="w-full p-3 rounded-lg bg-gray-800 text-white"
//                         >
//                             <option value="">Regionni tanlang</option>
//                             <option value="Toshkent">Toshkent</option>
//                             <option value="Sirdaryo">Sirdaryo</option>
//                             <option value="Andijon">Andijon</option>
//                         </select>
//                         <button
//                             onClick={handleUpdateProfile}
//                             className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-semibold hover:opacity-90 transition"
//                         >
//                             Saqlash
//                         </button>
//                     </div>
//                 )}

//                 <div className="mt-6 flex gap-4">
//                     <button
//                         onClick={() => setIsEditing(!isEditing)}
//                         className={`px-6 py-3 rounded-xl font-semibold transition ${isEditing
//                             ? "bg-red-500 hover:bg-red-600"
//                             : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
//                             }`}
//                     >
//                         {isEditing ? "Bekor qilish" : "Tahrirlash"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { User, Edit3, Save, Camera, Loader } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../constants/AuthContext";
import apiClient from "../../lib/apiClient";

const API_URL = import.meta.env.VITE_API_URL;

const Profile: React.FC = () => {
    const { token, user, isLoading: authLoading, isValidating } = useAuth();
    const navigate = useNavigate();

    // 🔒 STRICT AUTH GUARD
    useEffect(() => {
        if (!authLoading && !token) {
            navigate("/login", { replace: true });
        }
    }, [token, authLoading, navigate]);

    // Show loader during auth check
    if (authLoading || isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0e131f]">
                <div className="flex items-center gap-3 text-white">
                    <Loader className="h-6 w-6 animate-spin" />
                    <span>Profil tekshirilmoqda...</span>
                </div>
            </div>
        );
    }

    // Should not happen due to useEffect, but safe guard
    if (!token) return null;

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use user from context as initial data
    const [formData, setFormData] = useState({
        email: user?.email || "",
        pubgId: user?.pubgId || "",
        region: user?.region || "",
        isActive: user?.isActive || false,
    });

    // Fetch fresh data (optional, but good for consistency)
    const { data: profileData, isLoading, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await apiClient.get(`${API_URL}/web/v1/user/me`);
            return res.data;
        },
        enabled: !!token,
    });

    // Update formData when fresh data arrives
    useEffect(() => {
        if (profileData) {
            setFormData({
                email: profileData.email || "",
                pubgId: profileData.pubgId || "",
                region: profileData.region || "",
                isActive: profileData.isActive || false,
            });
        }
    }, [profileData]);

    const mutation = useMutation({
        mutationFn: async (updateData: typeof formData) => {
            const res = await apiClient.put(`${API_URL}/web/v1/user/profile`, updateData);
            return res.data;
        },
        onSuccess: () => {
            setIsEditing(false);
            refetch();
            alert("O‘zgarishlar muvaffaqiyatli saqlandi ✅");
        },
        onError: (err: any) => {
            setError(err?.response?.data?.message || "Xatolik yuz berdi");
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = () => {
        mutation.mutate(formData);
    };

    if (isLoading && !user) {
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
                        <p className={`font-semibold ${formData.isActive ? "text-green-400" : "text-red-400"}`}>
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