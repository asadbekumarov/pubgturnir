// import React, { useState } from 'react'
// import { Eye, EyeOff, Lock, User, UserPlus, MapPin, Gamepad2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useRegister } from '../../hooks/useAuth'

// // Form payload type is local state only; mutation uses hook's types

// const REGIONS = [
//     "Toshkent",
//     "Samarqand",
//     "Fargʻona",
//     "Andijon",
//     "Namangan",
//     "Buxoro",
//     "Xorazm",
//     "Navoiy",
//     "Qashqadaryo",
//     "Surxondaryo",
//     "Jizzax",
//     "Sirdaryo",
//     "Qoraqalpogʻiston"
// ];

// const Register: React.FC = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         pubgId: '',
//         region: '',
//     })
//     const [showPassword, setShowPassword] = useState(false)

//     // Regions are static for now; remove unused regions fetching

//     // 📌 Register mutation
//     const registerMutation = useRegister(
//         () => {
//             // window.location.href = "/login"
//         },
//         (error: any) => {
//             alert(error?.response?.data?.message || "Xatolik yuz berdi ❌")
//         }
//     )

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()

//         registerMutation.mutate({
//             email: formData.email,
//             password: formData.password,
//             pubgId: formData.pubgId,
//             region: formData.region,
//         })
//     }

//     return (
//         <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center p-3 sm:p-4 lg:p-6">
//             <div className="w-full max-w-md">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold text-white">
//                         PUBG <span className="text-[#f3aa01]">Tournament</span>
//                     </h1>
//                 </div>

//                 <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-xl border border-[#f3aa01]/20 p-6">
//                     <form onSubmit={handleSubmit} className="space-y-4">

//                         {/* Username */}
//                         <div>
//                             <label className="text-sm font-medium text-white block mb-1">Email</label>
//                             <div className="relative">
//                                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     placeholder="Emailingizni kiriting"
//                                     className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <label className="text-sm font-medium text-white block mb-1">Parol</label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     placeholder="Parolni kiriting"
//                                     className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
//                                     required
//                                 />
//                                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
//                                     {showPassword ? <EyeOff /> : <Eye />}
//                                 </button>
//                             </div>
//                         </div>



//                         {/* PUBG ID */}
//                         <div>
//                             <label className="text-sm font-medium text-white block mb-1">PUBG ID</label>
//                             <div className="relative">
//                                 <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
//                                 <input
//                                     type="text"
//                                     name="pubgId"
//                                     value={formData.pubgId}
//                                     onChange={handleInputChange}
//                                     placeholder="PUBG ID ni kiriting"
//                                     className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         {/* Region */}
//                         <div>
//                             <label className="text-sm font-medium text-white block mb-1">Region</label>
//                             <div className="relative">
//                                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
//                                 <select
//                                     name="region"
//                                     value={formData.region}
//                                     onChange={handleInputChange}
//                                     className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
//                                     required
//                                 >
//                                     <option value="">Regionni tanlang</option>
//                                     {REGIONS.map((region, index) => (
//                                         <option key={index} value={region}>
//                                             {region}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Submit */}
//                         <button
//                             type="submit"
//                             disabled={registerMutation.isPending}
//                             className="w-full bg-[#f3aa01] hover:bg-[#da9902] text-black font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
//                         >
//                             <UserPlus className="h-5 w-5" />
//                             {registerMutation.isPending ? "Ro'yxatdan o'tmoqda..." : "Ro'yxatdan o'tish"}
//                         </button>
//                     </form>

//                     <div className="mt-6 text-center">
//                         <p className="text-sm text-gray-400">
//                             Allaqachon hisobingiz bormi?{" "}
//                             <Link to="/login" className="text-[#f3aa01] hover:text-yellow-400 font-medium">
//                                 Kirish
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Register
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRegister } from '../../hooks/useAuth'

const REGIONS = [
    "Toshkent", "Samarqand", "Fargʻona", "Andijon", "Namangan",
    "Buxoro", "Xorazm", "Navoiy", "Qashqadaryo", "Surxondaryo",
    "Jizzax", "Sirdaryo", "Qoraqalpogʻiston"
]

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        pubgId: '',
        region: '',
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const registerMutation = useRegister(
        () => {
            setMessage({ type: 'success', text: "Muvaffaqiyatli ro‘yxatdan o‘tdingiz ✅" })
            // window.location.href = "/login"
        },
        (error: any) => {
            setMessage({ type: 'error', text: error?.response?.data?.message || "Xatolik yuz berdi ❌" })
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.email) {
            newErrors.email = "Email kiritilishi shart"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email formati noto‘g‘ri"
        }

        if (!formData.password) {
            newErrors.password = "Parol kiritilishi shart"
        } else if (formData.password.length < 6) {
            newErrors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak"
        }

        if (!formData.pubgId) {
            newErrors.pubgId = "PUBG ID kiritilishi shart"
        } else if (!/^\d{11}$/.test(formData.pubgId)) {
            newErrors.pubgId = "PUBG ID faqat 11 ta raqamdan iborat bo‘lishi kerak"
        }

        if (!formData.region) {
            newErrors.region = "Region tanlanishi shart"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setMessage(null)
        registerMutation.mutate(formData)
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center p-3 sm:p-4 lg:p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        PUBG <span className="text-[#f3aa01]">Tournament</span>
                    </h1>
                </div>

                <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-xl border border-[#f3aa01]/20 p-6">
                    {message && (
                        <div
                            className={`mb-4 p-2 rounded text-sm ${message.type === 'success'
                                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                                    : 'bg-red-600/20 text-red-400 border border-red-600/30'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Emailingizni kiriting"
                                className="w-full pl-3 pr-3 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">Parol</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Parolni kiriting"
                                    className="w-full pl-3 pr-10 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* PUBG ID */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">PUBG ID</label>
                            <input
                                type="text"
                                name="pubgId"
                                value={formData.pubgId}
                                onChange={handleInputChange}
                                placeholder="PUBG ID ni kiriting"
                                className="w-full pl-3 pr-3 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                            />
                            {errors.pubgId && <p className="text-red-500 text-sm mt-1">{errors.pubgId}</p>}
                        </div>

                        {/* Region */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">Region</label>
                            <select
                                name="region"
                                value={formData.region}
                                onChange={handleInputChange}
                                className="w-full pl-3 pr-3 py-2 border rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                            >
                                <option value="">Regionni tanlang</option>
                                {REGIONS.map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full bg-[#f3aa01] hover:bg-[#da9902] text-black font-bold py-2.5 rounded-lg transition-colors"
                        >
                            {registerMutation.isPending ? "Ro'yxatdan o'tmoqda..." : "Ro'yxatdan o'tish"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Allaqachon hisobingiz bormi?{" "}
                            <Link to="/login" className="text-[#f3aa01] hover:text-yellow-400 font-medium">
                                Kirish
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
