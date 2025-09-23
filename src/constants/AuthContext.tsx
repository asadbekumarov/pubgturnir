import React, { createContext, useState, useEffect } from "react"
import apiClient from "../lib/apiClient"

interface User {
    id: string
    email: string
    pubgId: string
    region: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, userData?: User) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load user data from localStorage on initialization
    const getStoredUser = (): User | null => {
        try {
            const storedUser = localStorage.getItem("user")
            return storedUser ? JSON.parse(storedUser) : null
        } catch (error) {
            console.error("Error parsing stored user data:", error)
            return null
        }
    }

    const [user, setUser] = useState<User | null>(getStoredUser())
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

    // refresh bo'lganda userni tekshirish
    useEffect(() => {
        if (token) {
            console.log("Fetching user data with token:", token.substring(0, 10) + "...")
            apiClient.get("/web/v1/user/me")
                .then(res => {
                    console.log("User data fetched successfully:", res.data)
                    setUser(res.data)
                    // Save user data to localStorage
                    localStorage.setItem("user", JSON.stringify(res.data))
                })
                .catch((error) => {
                    console.error("Failed to fetch user data:", error)
                    console.error("Error response:", error.response?.data)
                    setUser(null)
                    setToken(null)
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                })
        }
    }, [token])

    const login = async (newToken: string, userData?: User) => {
        try {
            console.log("Login attempt with token:", newToken.substring(0, 10) + "...")

            // Set token in localStorage first
            localStorage.setItem("token", newToken)
            setToken(newToken)

            // If user data is provided directly, use it and save to localStorage
            if (userData) {
                console.log("Using provided user data:", userData)
                setUser(userData)
                localStorage.setItem("user", JSON.stringify(userData))
            } else {
                // Make the API call with explicit token in headers
                console.log("Making API call to /web/v1/user/me")
                const res = await apiClient.get("/web/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                })
                console.log("Login successful, user data:", res.data)
                setUser(res.data)
                // Save user data to localStorage
                localStorage.setItem("user", JSON.stringify(res.data))
            }
        } catch (error: unknown) {
            console.error("Failed to login:", error)
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: any; status?: number } }
                console.error("Error response:", axiosError.response?.data)
                console.error("Error status:", axiosError.response?.status)
            }
            // Clean up on error
            setUser(null)
            setToken(null)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

