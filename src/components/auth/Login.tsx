
import React, { useState } from 'react'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useAuth'

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const loginMutation = useLogin(
        () => {
            navigate("/")
        },
        (error: any) => {
            console.error(error?.response?.data?.message || "Login xatosi ❌")
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        loginMutation.mutate(formData)
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
