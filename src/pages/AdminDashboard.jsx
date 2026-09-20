import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { packages as defaultPackages } from '../data/packages'
import { Users, CalendarCheck, Package, DollarSign, ArrowRight, ShieldCheck, TrendingUp, Hotel, Plane } from 'lucide-react'

/**
 * ============================================================================
 * ADMIN DASHBOARD OVERVIEW PAGE
 * ============================================================================
 * Concepts demonstrated:
 * 1. Role-based administration: Consumes user info from useAuth() context.
 * 2. Aggregating analytics from browser localStorage:
 *    - Total registered users (combines hardcoded seedUsers + nd_registered_users).
 *    - Total saved bookings (nd_bookings).
 *    - Active tour packages (defaultPackages + nd_admin_packages).
 *    - Estimated booking revenue sum calculated via Array.reduce().
 * 3. Recent activity snapshot: displays the latest 5 bookings dynamically.
 */
export default function AdminDashboard() {
  // Current logged in administrator and helper to retrieve all users
  const { user, getAllUsers } = useAuth()

  // 1. Total user count
  const allUsers = getAllUsers()

  // 2. Read current bookings from localStorage
  const bookings = useMemo(() => {
    try {
      const stored = localStorage.getItem('nd_bookings')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  // 3. Read admin-created packages from localStorage
  const adminPackages = useMemo(() => {
    try {
      const stored = localStorage.getItem('nd_admin_packages')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  // Total active packages available on the platform
  const totalPackagesCount = defaultPackages.length + adminPackages.length

  // 4. Calculate total revenue sum using Array.reduce()
  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0)
  }, [bookings])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header & Sub-Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#ff6b6b] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Administration</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Next Destination Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Logged in as <span className="font-semibold text-gray-800">{user?.name}</span> ({user?.email}) · Full Administrator privileges
          </p>
        </div>

        {/* Sub-page Quick Navigation Links */}
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin"
            className="px-4 py-2 text-xs font-bold bg-[#0d7377] text-white rounded-xl shadow-xs"
          >
            Overview
          </Link>
          <Link
            to="/admin/users"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Users ({allUsers.length})
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Bookings ({bookings.length})
          </Link>
          <Link
            to="/admin/packages"
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Packages ({totalPackagesCount})
          </Link>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Users */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Users</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d7377] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{allUsers.length}</div>
          <p className="text-xs text-gray-500">Seed & browser-registered profiles</p>
        </div>

        {/* KPI 2: Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ff6b6b] flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{bookings.length}</div>
          <p className="text-xs text-gray-500">Packages, hotels, & flights saved</p>
        </div>

        {/* KPI 3: Packages */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Packages</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900">{totalPackagesCount}</div>
          <p className="text-xs text-gray-500">{adminPackages.length} created by admin</p>
        </div>

        {/* KPI 4: Estimated Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Est. Booking Volume</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">${totalRevenue}</div>
          <p className="text-xs text-gray-500">Simulated value of all orders</p>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/users"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0d7377] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0d7377] transition-colors">
              Manage Users
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              View traveler profiles, inspect user roles, and remove accounts from browser storage.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0d7377]">
            <span>Open User Management</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/bookings"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#ff6b6b] flex items-center justify-center mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#ff6b6b] transition-colors">
              Manage Bookings
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Review active flight, hotel, and tour reservations. Cancel or adjust bookings.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#ff6b6b]">
            <span>Open Bookings Table</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/packages"
          className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
              Manage Packages
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Add new custom tour packages with instant publishing to the live website catalog.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600">
            <span>Add or Edit Packages</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Customer Bookings List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Customer Bookings</h3>
          <Link
            to="/admin/bookings"
            className="text-xs font-semibold text-[#0d7377] hover:underline"
          >
            View All ({bookings.length}) →
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {bookings.slice(0, 5).map((booking, idx) => (
              <div key={booking.id || idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                    {booking.type === 'Hotel' && <Hotel className="w-4 h-4 text-amber-500" />}
                    {booking.type === 'Flight' && <Plane className="w-4 h-4 text-[#0d7377]" />}
                    {booking.type === 'Tour Package' && <Package className="w-4 h-4 text-[#ff6b6b]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{booking.title}</h4>
                    <span className="text-[11px] text-gray-400">
                      {booking.type} · Booked {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-[#0d7377]">
                    ${booking.totalPrice || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 py-4 text-center">
            No bookings recorded in localStorage yet. Book a tour, flight, or hotel to populate.
          </p>
        )}
      </div>
    </div>
  )
}
