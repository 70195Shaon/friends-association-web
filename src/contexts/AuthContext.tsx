/**
 * Authentication Context for user management
 * Handles login, logout, and user state management with password change logging
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, PasswordChangeLog } from '../types'

interface AuthContextType {
  user: User | null
  login: (userId: string, password: string) => Promise<boolean>
  logout: () => void
  updatePassword: (newPassword: string) => Promise<boolean>
  loading: boolean
  passwordChangeLogs: PasswordChangeLog[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users data with Super Admin (মুহিব্বুর রহমান শাওন)
const demoUsers: User[] = [
  {
    id: 'super_admin001',
    userId: 'admin',
    password: 'admin123',
    name: 'মুহিব্বুর রহমান শাওন',
    role: 'super_admin', // প্রধান এডমিন
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2023-08-01')
  },
  {
    id: 'member001',
    userId: 'member001',
    password: 'pass123',
    name: 'মো: আকতার হোসেন',
    role: 'member',
    memberNumber: 1,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'member002',
    userId: 'member002',
    password: 'pass123',
    name: 'মো: সালমানুর রহমান',
    role: 'member',
    memberNumber: 2,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-01')
  }
]

// Password change logs
let passwordChangeLogs: PasswordChangeLog[] = []

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (userId: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const foundUser = demoUsers.find(u => u.userId === userId && u.password === password)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem('user', JSON.stringify(foundUser))
        setLoading(false)
        return true
      }
      setLoading(false)
      return false
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updatePassword = async (newPassword: string): Promise<boolean> => {
    if (!user) return false
    
    try {
      // Log password change
      const changeLog: PasswordChangeLog = {
        id: Date.now().toString(),
        userId: user.userId,
        userName: user.name,
        userRole: user.role === 'super_admin' ? 'admin' : user.role as 'admin' | 'member',
        oldPassword: user.password,
        newPassword: newPassword,
        changedAt: new Date(),
        ipAddress: 'localhost' // In production, get real IP
      }
      passwordChangeLogs.push(changeLog)
      
      const updatedUser = { 
        ...user, 
        password: newPassword, 
        passwordChangedAt: new Date(),
        updatedAt: new Date()
      }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      // Update in demo users array
      const userIndex = demoUsers.findIndex(u => u.id === user.id)
      if (userIndex !== -1) {
        demoUsers[userIndex] = updatedUser
      }
      
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updatePassword, 
      loading,
      passwordChangeLogs 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
