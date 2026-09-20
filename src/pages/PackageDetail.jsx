import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { packages as defaultPackages } from '../data/packages'
import { Clock, CheckCircle2, ChevronDown, ChevronUp, Users, ArrowLeft, Check, Sparkles, Calendar } from 'lucide-react'

/**
 * ============================================================================
 * TOUR PACKAGE DETAIL PAGE
 * ============================================================================
 * Concepts demonstrated:
 * 1. useParams(): Extracts dynamic URL segment (:id) from /packages/:id.
 * 2. Merging seed packages with admin-created packages stored in localStorage.
 * 3. Guest count calculation: dynamic price computation (pricePerPerson * travelers).
 * 4. Accordion state pattern:
 *    - openDay stores the number of the currently expanded day.
 *    - Clicking a day toggles it open/closed (setOpenDay(openDay === dayNum ? null : dayNum)).
 * 5. LocalStorage booking flow with temporary success banner.
 */
export default function PackageDetail() {
  // Extract package ID from URL parameter (e.g. 'pkg-bali-escape')
  const { id } = useParams()
  const navigate = useNavigate()

  // Merge seed packages with any admin-created packages from localStorage
  let allPackages = defaultPackages
  try {
    const adminPkgs = JSON.parse(localStorage.getItem('nd_admin_packages') || '[]')
    allPackages = [...defaultPackages, ...adminPkgs]
  } catch {
    allPackages = defaultPackages
  }

  // Find the package matching the URL ID parameter
  const pkg = allPackages.find((p) => p.id === id)

  // Local state for booking configuration
  const [travelers, setTravelers] = useState(2)
  const [openDay, setOpenDay] = useState(1) // Expand Day 1 by default
  const [toastMessage, setToastMessage] = useState('')
  const [isBooked, setIsBooked] = useState(false)

  // 404 Fallback if package is not found
  if (!pkg) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Package Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The requested package could not be found.</p>
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Packages</span>
        </Link>
      </div>
    )
  }

  // Multiply per-person rate by selected number of travelers
  const totalPrice = pkg.price * travelers

  /**
   * Booking handler: constructs a standardized booking record and prepends it
   * to the 'nd_bookings' array in localStorage.
   */
  const handleBookPackage = () => {
    const booking = {
      id: 'bk-pkg-' + Date.now(),
      type: 'Tour Package',
      title: pkg.title,
      destinationId: pkg.destinationId,
      duration: pkg.duration,
      travelers,
      pricePerPerson: pkg.price,
      totalPrice,
      image: pkg.image,
      createdAt: new Date().toISOString()
    }

    try {
      const existing = JSON.parse(localStorage.getItem('nd_bookings') || '[]')
      const updated = [booking, ...existing]
      localStorage.setItem('nd_bookings', JSON.stringify(updated))

      setIsBooked(true)
      setToastMessage(`Success! "${pkg.title}" has been added to your Itinerary.`)
    } catch (e) {
      console.error('Failed to book package', e)
    }
  }

  /**
   * Accordion toggle: if the clicked day is already open, collapse it (null),
   * otherwise open the clicked day.
   */
  const toggleDayAccordion = (dayNum) => {
    setOpenDay(openDay === dayNum ? null : dayNum)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back to Catalog Link */}
      <div>
        <Link
          to="/packages"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0d7377] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tour Packages</span>
        </Link>
      </div>

      {/* Success Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Booking Confirmed!</p>
              <p className="text-xs text-emerald-700">{toastMessage}</p>
            </div>
          </div>
          <Link
            to="/itinerary"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
          >
            View in Itinerary →
          </Link>
        </div>
      )}

      {/* Hero Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hero Image */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96 md:h-[420px] shadow-md">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ff6b6b]" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>

        {/* Right: Booking Details & Guests Selection */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#0d7377] block mb-1">
              Curated Tour
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug">
              {pkg.title}
            </h1>
          </div>

          <div className="flex items-baseline justify-between border-y border-gray-100 py-4">
            <div>
              <span className="text-xs text-gray-400 block font-normal">Price per person</span>
              <span className="text-3xl font-black text-[#0d7377]">${pkg.price}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block font-normal">Trip Duration</span>
              <span className="text-sm font-bold text-gray-800">{pkg.duration}</span>
            </div>
          </div>

          {/* Guest Count Selector (Buttons) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#0d7377]" />
              <span>Select Number of Guests</span>
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTravelers(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    travelers === num
                      ? 'bg-[#0d7377] text-white border-[#0d7377]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>
          </div>

          {/* Total Cost Display */}
          <div className="bg-teal-50/50 p-4 rounded-2xl border border-teal-100 flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Total Package Cost ({travelers} travelers):</span>
            <span className="text-xl font-bold text-[#0d7377]">${totalPrice}</span>
          </div>

          {/* Book Action Button */}
          <button
            type="button"
            onClick={handleBookPackage}
            className="w-full py-3.5 bg-[#0d7377] hover:bg-[#095457] text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#ff6b6b]" />
            <span>Book This Package</span>
          </button>
        </div>
      </div>

      {/* Accordion & Inclusions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        {/* Day-by-Day Accordion Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Day-by-Day Itinerary</h2>
            <p className="text-sm text-gray-500">
              Click on each day below to see planned activities, sights, and tour stops.
            </p>
          </div>

          <div className="space-y-3">
            {pkg.itinerary && pkg.itinerary.length > 0 ? (
              pkg.itinerary.map((dayItem) => {
                const isOpen = openDay === dayItem.day
                return (
                  <div
                    key={dayItem.day}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleDayAccordion(dayItem.day)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-gray-50/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-teal-50 text-[#0d7377] font-bold text-xs flex items-center justify-center shrink-0">
                          D{dayItem.day}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900">
                          {dayItem.title}
                        </h4>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    {/* Accordion Collapsible Body */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-50 leading-relaxed bg-gray-50/30">
                        {dayItem.description}
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-500">
                Detailed day-by-day timeline provided upon reservation confirmation.
              </div>
            )}
          </div>
        </div>

        {/* Inclusions Checklist */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0d7377]" />
              <span>What's Included</span>
            </h3>

            <div className="space-y-3 pt-2">
              {pkg.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <Check className="w-4 h-4 text-[#0d7377] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400">
              * International flights are booked separately via our Flights engine.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
