import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { flights } from '../data/flights'
import FlightCard from '../components/FlightCard'
import { Plane, Calendar, ArrowRightLeft, Check, Frown, Sparkles } from 'lucide-react'

export default function Flights() {
  const [origin, setOrigin] = useState('All')
  const [destination, setDestination] = useState('All')
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().split('T')[0]
  })
  const [lastBookedFlight, setLastBookedFlight] = useState(null)

  // Unique origins and destinations
  const origins = ['All', ...new Set(flights.map((f) => f.from))]
  const destinations = ['All', ...new Set(flights.map((f) => f.to))]

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const matchOrigin = origin === 'All' || flight.from === origin
      const matchDest = destination === 'All' || flight.to === destination
      return matchOrigin && matchDest
    })
  }, [origin, destination])

  const handleSelectSuccess = (booking) => {
    setLastBookedFlight(booking)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <Plane className="w-3.5 h-3.5" />
          <span>Flight Finder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Search & Book Flights
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Compare non-stop and partner routes across top international carriers with live simulated browser bookings.
        </p>
      </div>

      {/* Booking Confirmation Alert */}
      {lastBookedFlight && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Flight Reserved!</p>
              <p className="text-xs text-emerald-700">
                {lastBookedFlight.title} ({lastBookedFlight.from} → {lastBookedFlight.to}) has been saved to your trip itinerary.
              </p>
            </div>
          </div>
          <Link
            to="/itinerary"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
          >
            Open Itinerary →
          </Link>
        </div>
      )}

      {/* Flight Search Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Origin Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Flying From
            </label>
            <div className="relative">
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377] cursor-pointer appearance-none"
              >
                {origins.map((orig) => (
                  <option key={orig} value={orig}>
                    {orig}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Flying To
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377] cursor-pointer appearance-none"
              >
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Departure Date */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              Departure Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>
          </div>
        </div>

        {/* Reset button if filtered */}
        {(origin !== 'All' || destination !== 'All') && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Filter active: displaying routes matching selected criteria</span>
            <button
              type="button"
              onClick={() => {
                setOrigin('All')
                setDestination('All')
              }}
              className="text-[#ff6b6b] hover:underline font-semibold"
            >
              Reset Search Fields
            </button>
          </div>
        )}
      </div>

      {/* Flight Search Results */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs font-medium text-gray-500">
          <span>Available Flights ({filteredFlights.length})</span>
          <span>Fares include all estimated government taxes & fees</span>
        </div>

        {filteredFlights.length > 0 ? (
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelectSuccess={handleSelectSuccess}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 bg-rose-50 text-[#ff6b6b] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Frown className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Flights Found</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              No flights found matching {origin} to {destination}. Try selecting "All" to view all active route schedules.
            </p>
            <button
              type="button"
              onClick={() => {
                setOrigin('All')
                setDestination('All')
              }}
              className="px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors cursor-pointer"
            >
              Show All Flights
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
