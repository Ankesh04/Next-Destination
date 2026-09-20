import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * ============================================================================
 * PROTECTED ADMIN ROUTE WRAPPER
 * ============================================================================
 * Higher-Order Component / Route Guard that wraps sensitive admin components.
 * 
 * How it works:
 * 1. Checks if a user is currently logged in via AuthContext.
 * 2. Checks if user.role === 'admin'.
 * 3. If NOT an admin: redirects the user to /login using React Router's <Navigate>.
 *    Passing state={{ from: location }} remembers the original URL so the user
 *    can be returned back to the intended page after logging in.
 * 4. If an admin: renders the child component (children) normally.
 */
export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  // Guard check: must be logged in with role 'admin'
  if (!user || user.role !== 'admin') {
    // replace replaces the current history entry so pressing browser Back doesn't loop
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Authorized: render the protected page
  return children
}
