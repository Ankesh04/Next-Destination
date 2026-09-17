import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user || user.role !== 'admin') {
    // Redirect unauthenticated or non-admin visitors to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
