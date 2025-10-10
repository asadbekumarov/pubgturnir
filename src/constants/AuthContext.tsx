"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useLocation } from "react-router-dom"
import apiClient from "../lib/apiClient"

export interface User {
    id: string
    email: string
    pubgId: string
    region: string
    isActive?: boolean
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, userData?: User) => Promise<void>
    logout: () => void
    isLoading: boolean
    isValidating: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/"]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
    const [token, setTokenState] = useState<string | null>(null)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setTokenState(storedToken)
        }
        setIsInitialized(true)
    }, [])

    const {
        data: user,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["user", token],
        queryFn: async () => {
            if (!token) return null

            try {
                const res = await apiClient.get("/web/v1/user/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const userData = res.data
                localStorage.setItem("user", JSON.stringify(userData))
                return userData as User
            } catch (error) {
                console.error("Token validation failed", error)
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                setTokenState(null)
                throw error
            }
        },
        enabled: !!token && isInitialized,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })

    useEffect(() => {
        if (!isInitialized) return

        const isPublicRoute = PUBLIC_ROUTES.some(route =>
            location.pathname === route || location.pathname.startsWith(route + "/")
        )

        if (!token && !isPublicRoute) {
            navigate("/login", { replace: true })
        }
    }, [token, location.pathname, isInitialized, navigate])

    const loginMutation = useMutation({
        mutationFn: async ({ newToken, userData }: { newToken: string; userData?: User }) => {
            localStorage.setItem("token", newToken)

            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData))
                return { token: newToken, user: userData }
            }

            // Validate token by fetching user data
            const res = await apiClient.get("/web/v1/user/me", {
                headers: { Authorization: `Bearer ${newToken}` },
            })
            const fetchedUserData = res.data
            localStorage.setItem("user", JSON.stringify(fetchedUserData))
            return { token: newToken, user: fetchedUserData as User }
        },
        onSuccess: ({ token: newToken, user: userData }) => {
            setTokenState(newToken)
            queryClient.setQueryData(["user", newToken], userData)
        },
        onError: (error) => {
            console.error("Login failed", error)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setTokenState(null)
        },
    })

    const login = async (newToken: string, userData?: User) => {
        await loginMutation.mutateAsync({ newToken, userData })
    }

    const logout = () => {
        setTokenState(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        queryClient.removeQueries({ queryKey: ["user"] })
        navigate("/login", { replace: true })
    }

    const value = {
        user: user ?? null,
        token,
        login,
        logout,
        isLoading: isLoading || !isInitialized,
        isValidating: isFetching,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}

// Optional: Protected Route Component
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, isLoading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !token) {
            navigate("/login", { replace: true })
        }
    }, [token, isLoading, navigate])

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Loading...
            </div>
        )
    }

    if (!token) {
        return null
    }

    return <>{children}</>
}