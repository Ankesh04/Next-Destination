import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { hotels } from '../data/hotels'
import HotelCard from '../components/HotelCard'
import SearchFilterBar from '../components/SearchFilterBar'
import { Hotel as HotelIcon, Check, Frown } from 'lucide-react'

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('All')
  const [priceRange, setPriceRange] = useState('all')
  const [lastBookedHotel, setLastBookedHotel] = useState(null)

  const cityOptions = ['All', 'Bali', 'Paris', 'Santorini', 'Dubai', 'Kyoto', 'Swiss Alps', 'Maldives', 'New York']

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Search matches name, city, or amenities
      const matchesSearch =
        searchTerm === '' ||
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.amenities.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))

      // City filter
      const matchesCity =
        selectedCity === 'All' || hotel.city.toLowerCase() === selectedCity.toLowerCase()

      // Price filter (per night)
      let matchesPrice = true
      if (priceRange === 'under-500') {
        matchesPrice = hotel.pricePerNight < 250
      } else if (priceRange === '500-1000') {
        matchesPrice = hotel.pricePerNight >= 250 && hotel.pricePerNight <= 400
      } else if (priceRange === 'over-1000') {
        matchesPrice = hotel.pricePerNight > 400
      }

      return matchesSearch && matchesCity && matchesPrice
    })
  }, [searchTerm, selectedCity, priceRange])

  const handleBookSuccess = (booking) => {
    setLastBookedHotel(booking)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <HotelIcon className="w-3.5 h-3.5" />
          <span>Boutique Accommodations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Hotels & Luxury Resorts
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          From overwater Maldivian bungalows to Alpine ski chalets and historic Parisian suites, choose your perfect stay with transparent nightly rates.
        </p>
      </div>

      {/* Global Booking Notification */}
      {lastBookedHotel && (
        <div className="mb-6 bg-teal-50 border border-teal-200 text-teal-900 p-4 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0d7377] text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Reservation Added!</p>
              <p className="text-xs text-teal-800">
                {lastBookedHotel.title} ({lastBookedHotel.nights} nights) is saved to your itinerary.
              </p>
            </div>
          </div>
          <Link
            to="/itinerary"
            className="px-4 py-2 bg-[#0d7377] hover:bg-[#095457] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
          >
            Go to Itinerary →
          </Link>
        </div>
      )}

      {/* Search and Filters */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCity}
        onCategoryChange={setSelectedCity}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        categories={cityOptions}
        placeholder="Search hotel name, city, or amenity (e.g. pool, spa, ski)..."
      />

      {/* Hotel Results Stats */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-medium">
        <span>
          Showing <span className="font-bold text-gray-800">{filteredHotels.length}</span> luxury properties
        </span>
      </div>

      {/* Grid of Hotel Cards */}
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onBookSuccess={handleBookSuccess}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-rose-50 text-[#ff6b6b] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Frown className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Hotels Found</h3>
          <p className="text-xs text-gray-500 mb-6">
            We couldn't find any hotel matching your search filters. Try clearing your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setSelectedCity('All')
              setPriceRange('all')
            }}
            className="px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
