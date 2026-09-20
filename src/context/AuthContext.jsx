import React, { createContext, useContext, useState, useEffect } from 'react'
import { seedUsers } from '../data/users'

/**
 * ============================================================================
 * AUTH CONTEXT
 * ============================================================================
 * React Context allows us to share state (like the currently logged-in user)
 * across the entire component tree without having to pass props down manually
 * through every level (prop drilling).
 */
const AuthContext = createContext(null)

/**
 * AuthProvider wraps the application and provides user authentication state
 * and helper functions (login, register, logout) to any child component.
 */
export function AuthProvider({ children }) {
  // Initialize user state from browser localStorage.
  // Using a function inside useState ensures this read runs only once on initial render.
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nd_user')
      return stored ? JSON.parse(stored) : null
    } catch (e) {
      console.error('Failed to parse nd_user from localStorage', e)
      return null
    }
  })

  /**
   * Reads any users registered during the current browser session.
   * Stored under the 'nd_registered_users' localStorage key.
   */
  const getRegisteredUsers = () => {
    try {
      const registered = localStorage.getItem('nd_registered_users')
      return registered ? JSON.parse(registered) : []
    } catch {
      return []
    }
  }

  /**
   * Returns a combined list of default seed users and locally registered users.
   */
  const getAllUsers = () => {
    const registered = getRegisteredUsers()
    return [...seedUsers, ...registered]
  }

  /**
   * Log in a user by matching email and password against all known users.
   * On success: stores the session user in localStorage under 'nd_user'.
   */
  const login = (email, password) => {
    const all = getAllUsers()
    const found = all.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )

    if (!found) {
      return {
        success: false,
        error: 'Invalid email or password. Hint: admin@nextdestination.com / admin123'
      }
    }

    // Never store plain passwords in the active session object
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

  /**
   * Register a new user:
   * 1. Checks if the email is already in use.
   * 2. Saves the new user to 'nd_registered_users' in localStorage.
   * 3. Sets the newly created user as the active logged-in user.
   */
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

  /**
   * Log out: clears session from React state and removes 'nd_user' from localStorage.
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem('nd_user')
  }

  /**
   * Admin helper: removes a browser-registered user from localStorage.
   */
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

/**
 * Custom hook to easily consume the AuthContext in any component:
 * const { user, login, logout } = useAuth()
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
