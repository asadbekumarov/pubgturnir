import React, { useState } from "react";
import { User, Edit3, Save, Camera } from "lucide-react";

const Profile: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "Asadbek",
        lastName: "Umarov",
        phone: "+998901234567",
        email: "asadbek@example.com",
        bio: "Frontend Developer",
        location: "Toshkent, O'zbekiston",
    });

    const [isEditing, setIsEditing] = useState(false);

    const profile = {
        username: "asadbek_dev",
        avatar: "AS",
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = () => {
        setIsEditing(false);
        alert("O'zgarishlar saqlandi ✅");
    };

    return (
        <div className="min-h-screen p-4 lg:p-6" style={{ backgroundColor: '##0e131f' }}>
            <div className="mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center text-3xl font-bold text-black shadow-lg">
                                    {profile.avatar}
                                </div>
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                                    <Camera className="h-4 w-4 text-gray-800" />
                                </button>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800 animate-pulse"></div>
                            </div>

                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    {formData.firstName} {formData.lastName}
                                </h1>
                                <p className="text-gray-400 text-lg mt-1">@{profile.username}</p>
                                <div className="flex items-center space-x-2 mt-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-green-400 text-sm font-medium">Online</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${isEditing
                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                    : "bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/20"
                                    }`}
                            >
                                <Edit3 className="h-4 w-4" />
                                {isEditing ? "Bekor qilish" : "Tahrirlash"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        Shaxsiy ma'lumotlar
                    </h2>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing
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
                                    className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                        } outline-none backdrop-blur-sm`}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                        } outline-none backdrop-blur-sm`}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                        } outline-none backdrop-blur-sm`}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Manzil
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                        } outline-none backdrop-blur-sm`}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-300">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                rows={3}
                                className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 font-medium resize-none ${isEditing
                                    ? "bg-black/50 text-white border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                                    : "bg-gray-800/50 text-gray-300 border-gray-800 cursor-not-allowed"
                                    } outline-none backdrop-blur-sm`}
                            />
                        </div>

                        {isEditing && (
                            <div className="flex justify-end pt-8 border-t border-gray-700/50">
                                <button
                                    onClick={handleUpdateProfile}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center gap-3 font-bold transform hover:scale-105"
                                >
                                    <Save className="h-5 w-5" />
                                    O'zgarishlarni saqlash
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;