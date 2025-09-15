// import React, { useState } from 'react'
// import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom'

// type FieldErrors = { [key: string]: string }

// const Login: React.FC = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     })
//     const [showPassword, setShowPassword] = useState(false)
//     const [errors, setErrors] = useState<FieldErrors>({})
//     const [isSubmitting, setIsSubmitting] = useState(false)

//     const navigate = useNavigate()

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//         if (errors[name]) {
//             setErrors(prev => ({ ...prev, [name]: '' }))
//         }
//     }

//     const validateForm = () => {
//         const newErrors: FieldErrors = {}
//         if (!formData.username.trim()) newErrors.username = 'Foydalanuvchi nomi majburiy'
//         if (!formData.password) newErrors.password = 'Parol majburiy'
//         else if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 belgidan iborat boʼlishi kerak'
//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         if (!validateForm()) return
//         setIsSubmitting(true)
//         try {
//             const usersRaw = localStorage.getItem('users') || '[]'
//             const users: Array<{ username: string; password: string }> = JSON.parse(usersRaw)
//             const user = users.find(u => u.username.toLowerCase() === formData.username.toLowerCase())
//             if (!user) {
//                 setErrors({ general: 'Foydalanuvchi topilmadi. Iltimos, roʼyxatdan oʼting.' })
//                 setIsSubmitting(false)
//                 return
//             }
//             if (user.password !== formData.password) {
//                 setErrors({ general: 'Parol notoʼgʼri' })
//                 setIsSubmitting(false)
//                 return
//             }
//             localStorage.setItem('username', user.username)
//             navigate('/') // login muvaffaqiyatli bo‘lsa, home page ga yo‘naltirish
//         } catch {
//             setErrors({ general: 'Xatolik yuz berdi. Qayta urinib koʼring.' })
//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-950 to-black flex items-center justify-center p-3 sm:p-4 lg:p-6">
//             <div className="w-full max-w-xs sm:max-w-md lg:max-w-md">
//                 <div className="text-center mb-4 sm:mb-6 lg:mb-4">
//                     <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white">
//                         PUBG <span className="text-[#f3aa01]">Tournament</span>
//                     </h1>
//                 </div>
//                 <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-xl border border-[#f3aa01]/20 p-4 sm:p-6 lg:p-7">
//                     <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//                         {errors.general && (
//                             <p className="text-red-500 text-sm text-center">{errors.general}</p>
//                         )}
//                         <div className="space-y-1 sm:space-y-2">
//                             <label className="text-sm sm:text-base font-medium text-white block">
//                                 Foydalanuvchi nomi
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
//                                     <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
//                                 </div>
//                                 <input
//                                     id="username"
//                                     name="username"
//                                     type="text"
//                                     value={formData.username}
//                                     onChange={handleInputChange}
//                                     className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3aa01] focus:border-transparent transition-all ${errors.username ? 'border-red-500' : 'border-gray-700'}`}
//                                     placeholder="Foydalanuvchi nomini kiriting"
//                                     required
//                                 />
//                             </div>
//                             {errors.username && (
//                                 <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>
//                             )}
//                         </div>

//                         <div className="space-y-1 sm:space-y-2">
//                             <label className="text-sm sm:text-base font-medium text-white block">
//                                 Parol
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
//                                     <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
//                                 </div>
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type={showPassword ? 'text' : 'password'}
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f3aa01] focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-gray-700'}`}
//                                     placeholder="Parolni kiriting"
//                                     required
//                                 />
//                                 <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="text-gray-400 hover:text-gray-300 transition-colors"
//                                         aria-label={showPassword ? 'Parolni yashirish' : 'Parolni koʼrsatish'}
//                                     >
//                                         {showPassword ? (
//                                             <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
//                                         ) : (
//                                             <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                             {errors.password && (
//                                 <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
//                             )}
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="w-full bg-[#f3aa01] hover:bg-[#da9902] disabled:bg-[#6b5a1f] text-black font-bold py-2.5 sm:py-3 px-4 h-11 text-sm sm:text-base rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//                         >
//                             <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
//                             {isSubmitting ? 'Kirish...' : 'Kirish'}
//                         </button>
//                     </form>

//                     <div className="mt-6 text-center">
//                         <p className="text-xs sm:text-sm text-gray-400">
//                             Hisobingiz yoʼqmi?{' '}
//                             <Link to="/register" className="text-[#f3aa01] hover:text-yellow-400 transition-colors font-medium">
//                                 Roʼyxatdan oʼtish
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//                 <div className="text-center mt-4 sm:mt-6">
//                     <p className="text-xs sm:text-sm text-gray-400">
//                         © 2025 PUBG Tournament
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login
import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type LoginPayload = {
    email: string
    password: string
}

const baseURL = "https://ab061b7f801b.ngrok-free.app"

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    // 📌 Login mutation (React Query)
    const loginMutation = useMutation({
        mutationFn: async (payload: LoginPayload) => {
            const res = await axios.post(`${baseURL}/api/v1/auth/login`, payload, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                }
            })
            return res.data
        },
        onSuccess: (data) => {
            // Token saqlash (agar backend qaytarsa)
            if (data.token) {
                localStorage.setItem("token", data.token)
            }
            alert("Muvaffaqiyatli kirdingiz ✅")
            navigate("/") // Home pagega yo‘naltirish
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || "Login xatosi ❌")
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate({
            email: formData.email,
            password: formData.password
        })
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Emailingizni kiriting"
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-white block mb-1">Parol</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Parolni kiriting"
                                    className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#f3aa01] border-gray-700"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-[#f3aa01] hover:bg-[#da9902] text-black font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn className="h-5 w-5" />
                            {loginMutation.isPending ? "Kirilmoqda..." : "Kirish"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Hisobingiz yo‘qmi?{" "}
                            <Link to="/register" className="text-[#f3aa01] hover:text-yellow-400 font-medium">
                                Ro‘yxatdan o‘tish
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
