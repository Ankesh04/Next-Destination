import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Lock, Mail, ShieldAlert, Sparkles, Check } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Where to redirect after login (e.g. /admin if tried to access protected route)
  const fromPath = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!password) {
      setError('Please enter your password')
      return
    }

    const result = login(email, password)
    if (result.success) {
      navigate(fromPath, { replace: true })
    } else {
      setError(result.error || 'Invalid credentials')
    }
  }

  // Quick fill helper for tester convenience
  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError('')
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-teal-50 text-[#0d7377] rounded-2xl flex items-center justify-center mx-auto mb-2">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Welcome Back</h1>
          <p className="text-xs text-gray-500">
            Sign in to access your saved itineraries and bookings.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0d7377] hover:bg-[#095457] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Demo Quick-Fill Buttons */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block text-center">
            Quick Demo Accounts
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('admin@nextdestination.com', 'admin123')}
              className="py-1.5 px-2 bg-white hover:bg-rose-50 text-[#ff6b6b] border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
            >
              Demo Admin 🛡️
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('sarah@traveler.com', 'password123')}
              className="py-1.5 px-2 bg-white hover:bg-teal-50 text-[#0d7377] border border-teal-200 rounded-lg text-xs font-semibold transition-colors"
            >
              Demo Traveler ✈️
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#0d7377] font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
