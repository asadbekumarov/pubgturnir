"use client"

import React, { createContext, useContext, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient()
    const [token, setTokenState] = React.useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setTokenState(storedToken)
        }
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
                // Clear invalid token
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                setTokenState(null)
                throw error
            }
        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        retry: 1,
    })

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
            // Update token state first
            setTokenState(newToken)
            // Then set the query data with the new token key
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
        queryClient.setQueryData(["user", token], null)
        queryClient.invalidateQueries({ queryKey: ["user"] })
    }

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                token,
                login,
                logout,
                isLoading,
                isValidating: isFetching,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within AuthProvider")
    return context
}