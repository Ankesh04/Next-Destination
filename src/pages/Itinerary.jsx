import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItineraryBuilder from '../components/ItineraryBuilder'
import { Calendar, Trash2, Hotel, Plane, Package, Sparkles, MapPin, DollarSign, ArrowRight, Printer } from 'lucide-react'

export default function Itinerary() {
  const [items, setItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  // Sync with localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nd_bookings')
      const bookings = stored ? JSON.parse(stored) : []
      setItems(bookings)
    } catch (e) {
      console.error('Failed to load itinerary from localStorage', e)
    }
  }, [])

  // Recalculate cost when items change
  useEffect(() => {
    const sum = items.reduce((acc, curr) => {
      const price = Number(curr.totalPrice) || 0
      return acc + price
    }, 0)
    setTotalCost(sum)
  }, [items])

  // Save to localStorage whenever items state changes
  const saveItems = (newItems) => {
    setItems(newItems)
    try {
      localStorage.setItem('nd_bookings', JSON.stringify(newItems))
    } catch (e) {
      console.error('Failed to update nd_bookings', e)
    }
  }

  const handleAddItem = (newItem) => {
    const updated = [newItem, ...items]
    saveItems(updated)
  }

  const handleDeleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id)
    saveItems(updated)
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire itinerary?')) {
      saveItems([])
    }
  }

  const getItemIcon = (type) => {
    switch (type) {
      case 'Hotel':
        return <Hotel className="w-5 h-5 text-amber-500" />
      case 'Flight':
        return <Plane className="w-5 h-5 text-[#0d7377]" />
      case 'Tour Package':
        return <Package className="w-5 h-5 text-[#ff6b6b]" />
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gray-200 gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Trip Planner & Bookings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            My Travel Itinerary
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your saved tours, hotel stays, flights, and personal activity notes.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Itinerary</span>
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors border border-rose-200 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Itinerary Custom Activity Builder */}
      <ItineraryBuilder onAddItem={handleAddItem} />

      {/* Summary Card */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs text-gray-400 block font-normal">Total Saved Items</span>
              <span className="text-xl font-bold text-gray-900">{items.length} Activities / Bookings</span>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div>
              <span className="text-xs text-gray-400 block font-normal">Estimated Trip Total</span>
              <span className="text-2xl font-black text-[#0d7377]">${totalCost}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            * Stored locally in your browser
          </div>
        </div>
      )}

      {/* Timeline of Items */}
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden group"
            >
              {/* Type indicator stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  item.type === 'Hotel'
                    ? 'bg-amber-400'
                    : item.type === 'Flight'
                    ? 'bg-[#0d7377]'
                    : item.type === 'Tour Package'
                    ? 'bg-[#ff6b6b]'
                    : 'bg-teal-400'
                }`}
              ></div>

              <div className="flex items-start gap-4 pl-2">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  {getItemIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        item.type === 'Hotel'
                          ? 'bg-amber-50 text-amber-700'
                          : item.type === 'Flight'
                          ? 'bg-teal-50 text-[#0d7377]'
                          : item.type === 'Tour Package'
                          ? 'bg-rose-50 text-[#ff6b6b]'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {item.type}
                    </span>
                    {item.day && (
                      <span className="text-[11px] font-semibold text-gray-500">
                        Day {item.day}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Context info per type */}
                  {item.type === 'Hotel' && (
                    <p className="text-xs text-gray-500">
                      Stay in {item.city} · {item.checkIn} to {item.checkOut} ({item.nights} nights)
                    </p>
                  )}

                  {item.type === 'Flight' && (
                    <p className="text-xs text-gray-500">
                      {item.from} → {item.to} · Departs {item.departTime}, Arrives {item.arriveTime}
                    </p>
                  )}

                  {item.type === 'Tour Package' && (
                    <p className="text-xs text-gray-500">
                      Duration: {item.duration} · {item.travelers} Guests
                    </p>
                  )}

                  {item.type === 'Custom Activity' && item.description && (
                    <p className="text-xs text-gray-600 italic">
                      "{item.description}"
                    </p>
                  )}
                </div>
              </div>

              {/* Price and Delete action */}
              <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 pl-2 sm:pl-0">
                {item.totalPrice !== undefined && item.totalPrice > 0 ? (
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Estimated</span>
                    <span className="text-lg font-bold text-gray-900">${item.totalPrice}</span>
                  </div>
                ) : (
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-400 font-medium">Personal Note</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  title="Remove from itinerary"
                  className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-teal-50 text-[#0d7377] rounded-3xl flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Your Itinerary is Empty</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
            Browse our tour packages, reserve hotels, or select flights to start filling your personal vacation schedule!
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/packages"
              className="px-4 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors"
            >
              Browse Packages
            </Link>
            <Link
              to="/hotels"
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Find Hotels
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
