import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { seedUsers } from '../data/users'
import { Users, Trash2, ArrowLeft, Shield, Check, AlertCircle } from 'lucide-react'

export default function AdminUsers() {
  const { user: currentUser } = useAuth()

  // Read registered users from localStorage
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('nd_registered_users')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [message, setMessage] = useState('')

  const handleRemoveUser = (userId, userName) => {
    const updated = registeredUsers.filter((u) => u.id !== userId)
    setRegisteredUsers(updated)
    localStorage.setItem('nd_registered_users', JSON.stringify(updated))
    setMessage(`User "${userName}" was removed from localStorage.`)

    setTimeout(() => setMessage(''), 3000)
  }

  // Combined list for display
  const allUsersList = [
    ...seedUsers.map((u) => ({ ...u, isSeed: true })),
    ...registeredUsers.map((u) => ({ ...u, isSeed: false }))
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/admin" className="hover:text-[#0d7377] font-semibold">Admin</Link>
            <span>/</span>
            <span>User Management</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Registered Users ({allUsersList.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse seed demo travelers and browser-registered accounts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Overview
          </Link>
          <Link
            to="/admin/users"
            className="px-4 py-2 text-xs font-bold bg-[#0d7377] text-white rounded-xl shadow-xs"
          >
            Users
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Bookings
          </Link>
          <Link
            to="/admin/packages"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Packages
          </Link>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
              <tr>
                <th className="py-4 px-6">User Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Source</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allUsersList.map((u) => {
                const isCurrentUser = currentUser?.email === u.email

                return (
                  <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0d7377] font-bold text-xs flex items-center justify-center">
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{u.name}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] text-teal-600 font-bold">You (Current session)</span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-xs text-gray-700">
                      {u.email}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-rose-50 text-[#ff6b6b] border border-rose-200'
                            : 'bg-teal-50 text-[#0d7377] border border-teal-200'
                        }`}
                      >
                        {u.role === 'admin' && <Shield className="w-3 h-3" />}
                        {u.role}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs">
                      {u.isSeed ? (
                        <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                          Seed Dataset
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium">
                          Browser (localStorage)
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      {u.isSeed ? (
                        <span className="text-[11px] text-gray-400 italic">
                          Protected seed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(u.id, u.name)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
