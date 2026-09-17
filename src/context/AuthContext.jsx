import React, { createContext, useContext, useState, useEffect } from 'react'
import { seedUsers } from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nd_user')
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      console.error('Failed to parse nd_user from localStorage', e)
      return null
    }
  })

  // Synchronize registered users list in localStorage
  const getRegisteredUsers = () => {
    try {
      const registered = localStorage.getItem('nd_registered_users')
      return registered ? JSON.parse(registered) : []
    } catch {
      return []
    }
  }

  // Combined list of users (seed + registered)
  const getAllUsers = () => {
    const registered = getRegisteredUsers()
    // Map registered users so they don't collide with seed IDs
    return [...seedUsers, ...registered]
  }

  const login = (email, password) => {
    const all = getAllUsers()
    const found = all.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )

    if (!found) {
      return { success: false, error: 'Invalid email or password. Hint: admin@nextdestination.com / admin123' }
    }

    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role || 'user'
    }

    setUser(sessionUser)
    localStorage.setItem('nd_user', JSON.stringify(sessionUser))
    return { success: true, user: sessionUser }
  }

  const register = (name, email, password) => {
    const all = getAllUsers()
    const exists = all.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())

    if (exists) {
      return { success: false, error: 'An account with this email already exists' }
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: 'user'
    }

    const currentRegistered = getRegisteredUsers()
    const updatedRegistered = [...currentRegistered, newUser]
    localStorage.setItem('nd_registered_users', JSON.stringify(updatedRegistered))

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }

    setUser(sessionUser)
    localStorage.setItem('nd_user', JSON.stringify(sessionUser))
    return { success: true, user: sessionUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nd_user')
  }

  const removeUser = (userId) => {
    const registered = getRegisteredUsers()
    const updated = registered.filter((u) => u.id !== userId)
    localStorage.setItem('nd_registered_users', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        getAllUsers,
        removeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
