import React, { useState } from 'react'
import { Plane, ArrowRight, Check } from 'lucide-react'

export default function FlightCard({ flight, onSelectSuccess }) {
  const { id, from, to, airline, flightNumber, departTime, arriveTime, duration, price, stops } = flight
  const [isBooked, setIsBooked] = useState(false)

  const handleSelectFlight = () => {
    const booking = {
      id: 'bk-flt-' + Date.now(),
      type: 'Flight',
      title: `${airline} (${flightNumber})`,
      from,
      to,
      departTime,
      arriveTime,
      duration,
      totalPrice: price,
      createdAt: new Date().toISOString()
    }

    try {
      const existing = JSON.parse(localStorage.getItem('nd_bookings') || '[]')
      const updated = [booking, ...existing]
      localStorage.setItem('nd_bookings', JSON.stringify(updated))
      setIsBooked(true)
      if (onSelectSuccess) onSelectSuccess(booking)

      setTimeout(() => {
        setIsBooked(false)
      }, 2500)
    } catch (e) {
      console.error('Failed to save flight booking', e)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 mb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Airline & Route Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d7377] flex items-center justify-center shrink-0">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{airline}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                {flightNumber}
              </span>
            </div>
            <span className="text-xs text-gray-500">{stops} · {duration}</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-center justify-between md:justify-center gap-6 md:gap-8 flex-grow max-w-md">
          <div className="text-left">
            <div className="text-xl font-bold text-gray-900">{departTime}</div>
            <div className="text-xs text-gray-500">{from}</div>
          </div>

          <div className="flex flex-col items-center flex-grow px-2">
            <span className="text-[11px] text-gray-400 mb-1">{duration}</span>
            <div className="w-full flex items-center gap-1">
              <div className="h-0.5 bg-gray-200 flex-grow rounded-full"></div>
              <Plane className="w-3.5 h-3.5 text-[#0d7377] rotate-90 shrink-0" />
              <div className="h-0.5 bg-gray-200 flex-grow rounded-full"></div>
            </div>
            <span className="text-[10px] text-[#0d7377] font-medium mt-1">{stops}</span>
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">{arriveTime}</div>
            <div className="text-xs text-gray-500">{to}</div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block md:text-right">One way</span>
            <span className="text-2xl font-bold text-[#0d7377]">${price}</span>
          </div>

          <button
            type="button"
            disabled={isBooked}
            onClick={handleSelectFlight}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isBooked
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0d7377] hover:bg-[#095457] text-white shadow-xs'
            }`}
          >
            {isBooked ? (
              <>
                <Check className="w-4 h-4" />
                <span>Flight Added!</span>
              </>
            ) : (
              <>
                <span>Select Flight</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
