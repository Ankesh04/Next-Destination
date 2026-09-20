import React, { useState } from 'react'
import { MapPin, Star, Calendar, Check, Sparkles } from 'lucide-react'

/**
 * ============================================================================
 * HOTEL CARD COMPONENT
 * ============================================================================
 * Demonstrates:
 * 1. Controlled date inputs using native HTML5 <input type="date">.
 * 2. Client-side math: calculating day difference between dates and multiplying by price.
 * 3. Conditional rendering: displaying a custom modal without external UI libraries.
 * 4. Storing complex booking objects in localStorage under 'nd_bookings'.
 */
export default function HotelCard({ hotel, onBookSuccess }) {
  const { id, name, city, pricePerNight, rating, amenities = [], image } = hotel

  // Pre-calculate default dates: check-in tomorrow, check-out in 4 days
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const defaultCheckout = new Date(today)
  defaultCheckout.setDate(defaultCheckout.getDate() + 4)

  // Format Date object to 'YYYY-MM-DD' format required by <input type="date">
  const formatDateForInput = (d) => d.toISOString().split('T')[0]

  // State for check-in / check-out dates
  const [checkIn, setCheckIn] = useState(formatDateForInput(tomorrow))
  const [checkOut, setCheckOut] = useState(formatDateForInput(defaultCheckout))

  // Modal open/close state and booking feedback status
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  /**
   * Helper to compute total nights between checkIn and checkOut dates.
   * Converts date strings to timestamps and divides milliseconds into full 24-hour days.
   */
  const calcNights = () => {
    if (!checkIn || !checkOut) return 1
    const d1 = new Date(checkIn)
    const d2 = new Date(checkOut)
    const diffTime = d2 - d1
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 1
  }

  const nights = calcNights()
  const totalPrice = nights * pricePerNight

  const handleOpenBookModal = () => {
    setIsModalOpen(true)
  }

  /**
   * Confirms reservation and appends booking object to localStorage ('nd_bookings')
   */
  const handleConfirmBooking = () => {
    const booking = {
      id: 'bk-htl-' + Date.now(),
      type: 'Hotel',
      title: name,
      city: city,
      checkIn,
      checkOut,
      nights,
      pricePerNight,
      totalPrice,
      image,
      createdAt: new Date().toISOString()
    }

    try {
      const existing = JSON.parse(localStorage.getItem('nd_bookings') || '[]')
      const updated = [booking, ...existing]
      localStorage.setItem('nd_bookings', JSON.stringify(updated))
      setBookingSuccess(true)

      // Notify parent component (if callback provided)
      if (onBookSuccess) onBookSuccess(booking)

      // Auto-close modal after displaying success state
      setTimeout(() => {
        setIsModalOpen(false)
        setBookingSuccess(false)
      }, 1600)
    } catch (e) {
      console.error('Failed to save hotel booking', e)
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        {/* Hotel Thumbnail Image & Badges */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {/* Rating Badge */}
          <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#ff6b6b] text-[#ff6b6b]" />
            <span>{rating.toFixed(1)}</span>
          </div>
          {/* City Badge */}
          <div className="absolute bottom-3.5 left-3.5 bg-white/90 backdrop-blur-xs text-gray-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#0d7377]" />
            <span>{city}</span>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
            {name}
          </h3>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="bg-gray-50 border border-gray-200/60 text-gray-600 text-[11px] px-2 py-0.5 rounded-md font-medium"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 4 && (
              <span className="text-[11px] text-gray-400 self-center">
                +{amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Date Picker & Price Preview Box */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-gray-500 text-[10px] uppercase font-semibold mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0d7377]"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-[10px] uppercase font-semibold mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0d7377]"
                />
              </div>
            </div>
            {/* Dynamic night count and total estimation */}
            <div className="flex justify-between items-center text-xs text-gray-500 pt-1 border-t border-gray-200/60">
              <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              <span className="font-semibold text-gray-800">Est. Total: ${totalPrice}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
            <div>
              <span className="text-xs text-gray-400 block font-normal">Per night</span>
              <span className="text-xl font-bold text-[#0d7377]">${pricePerNight}</span>
            </div>

            <button
              type="button"
              onClick={handleOpenBookModal}
              className="px-4 py-2.5 bg-[#0d7377] hover:bg-[#095457] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL BACKDROP & DIALOG =================
          Conditionally rendered in the DOM when isModalOpen is true */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            {bookingSuccess ? (
              // 1. Success confirmation state
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Hotel Booked!</h3>
                <p className="text-sm text-gray-600">
                  Your reservation at <span className="font-semibold">{name}</span> has been saved to your itinerary.
                </p>
              </div>
            ) : (
              // 2. Pre-booking confirmation breakdown
              <>
                <div className="flex items-center gap-2 mb-4 text-[#0d7377]">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-gray-900">Confirm Hotel Booking</h3>
                </div>

                <div className="space-y-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Property:</span>
                    <span className="font-semibold text-gray-900">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Destination:</span>
                    <span className="font-semibold text-gray-900">{city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-semibold">{checkIn} to {checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 text-base font-bold text-[#0d7377]">
                    <span>Total Due:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="px-5 py-2 text-sm bg-[#0d7377] hover:bg-[#095457] text-white font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    Confirm & Reserve
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
