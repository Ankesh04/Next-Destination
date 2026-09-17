import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, Trash2, Hotel, Plane, Package, Sparkles, Check, AlertCircle } from 'lucide-react'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nd_bookings')
      setBookings(stored ? JSON.parse(stored) : [])
    } catch {
      setBookings([])
    }
  }, [])

  const handleCancelBooking = (bookingId, title) => {
    const updated = bookings.filter((b) => b.id !== bookingId)
    setBookings(updated)
    localStorage.setItem('nd_bookings', JSON.stringify(updated))
    setMessage(`Booking "${title}" was successfully cancelled.`)

    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Admin Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/admin" className="hover:text-[#0d7377] font-semibold">Admin</Link>
            <span>/</span>
            <span>Bookings Management</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Customer Bookings ({bookings.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review all reservation requests recorded across the client session.
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
            className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Users
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2 text-xs font-bold bg-[#0d7377] text-white rounded-xl shadow-xs"
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

      {/* Bookings Table */}
      {bookings.length > 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                <tr>
                  <th className="py-4 px-6">Reservation Type</th>
                  <th className="py-4 px-6">Item / Title</th>
                  <th className="py-4 px-6">Specific Details</th>
                  <th className="py-4 px-6">Date Placed</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          b.type === 'Hotel'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : b.type === 'Flight'
                            ? 'bg-teal-50 text-[#0d7377] border border-teal-200'
                            : b.type === 'Tour Package'
                            ? 'bg-rose-50 text-[#ff6b6b] border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {b.type}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-bold text-gray-900">
                      {b.title}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-500">
                      {b.type === 'Hotel' && (
                        <span>{b.city} ({b.checkIn} to {b.checkOut}, {b.nights} nights)</span>
                      )}
                      {b.type === 'Flight' && (
                        <span>{b.from} → {b.to} ({b.duration})</span>
                      )}
                      {b.type === 'Tour Package' && (
                        <span>{b.duration} · {b.travelers || 1} Travelers</span>
                      )}
                      {b.type === 'Custom Activity' && (
                        <span>Day {b.day}: {b.description || 'Self-planned'}</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'N/A'}
                    </td>

                    <td className="py-4 px-6 font-bold text-[#0d7377]">
                      ${b.totalPrice || 0}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(b.id, b.title)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-teal-50 text-[#0d7377] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Bookings Recorded</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Customers have not created any flight, hotel, or package reservations in this browser session yet.
          </p>
          <Link
            to="/packages"
            className="px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors"
          >
            Create a Test Booking
          </Link>
        </div>
      )}
    </div>
  )
}
