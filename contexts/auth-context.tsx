"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/lib/firebase';

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  googleLogin: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would call your API here
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user for demo purposes
      const mockUser = {
        id: "1",
        email,
        name: "Demo User",
        role: "admin",
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      setUser(mockUser)
    } finally {
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      const idToken = await user.getIdToken();

      // Call your backend API to verify ID token and create session
      const response = await fetch('/api/auth/googleLogin', { // Assuming you create this endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const userData = await response.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData.user)); // Assuming backend returns user data
      }
      setUser(userData.user);

    } catch (error) {
      console.error("Google login error:", error);
      throw new Error("Google authentication failed"); // Re-throw to be caught in LoginPage
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    // In a real app, you would call your API here
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user for demo purposes
      const mockUser = {
        id: "1",
        email,
        name,
        role: "user",
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      setUser(mockUser)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    // In a real app, you would call your API here
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
