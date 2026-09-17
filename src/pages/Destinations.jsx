import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { destinations } from '../data/destinations'
import DestinationCard from '../components/DestinationCard'
import SearchFilterBar from '../components/SearchFilterBar'
import { Compass, Frown } from 'lucide-react'

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState('all')

  // Keep query params in sync if url updates
  useEffect(() => {
    const q = searchParams.get('search')
    if (q !== null && q !== searchTerm) {
      setSearchTerm(q)
    }
  }, [searchParams])

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Search term filter (matches name, country, or category)
      const matchesSearch =
        searchTerm === '' ||
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || dest.category.toLowerCase() === selectedCategory.toLowerCase()

      // Price filter
      let matchesPrice = true
      if (priceRange === 'under-500') {
        matchesPrice = dest.startingPrice < 500
      } else if (priceRange === '500-1000') {
        matchesPrice = dest.startingPrice >= 500 && dest.startingPrice <= 1000
      } else if (priceRange === 'over-1000') {
        matchesPrice = dest.startingPrice > 1000
      }

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchTerm, selectedCategory, priceRange])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Global Destinations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Explore Dream Destinations
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          From tranquil tropical isles and dramatic alpine slopes to bustling cultural capitals, discover your next unforgettable vacation spot.
        </p>
      </div>

      {/* Filter Component */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        placeholder="Filter by destination, country, or keyword..."
      />

      {/* Result stats */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-medium">
        <span>
          Showing <span className="font-bold text-gray-800">{filteredDestinations.length}</span> of {destinations.length} destinations
        </span>
        {(searchTerm || selectedCategory !== 'All' || priceRange !== 'all') && (
          <span className="text-[#0d7377]">Filtered view active</span>
        )}
      </div>

      {/* Grid of Destination Cards */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-rose-50 text-[#ff6b6b] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Frown className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Destinations Found</h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            We couldn't find any destinations matching your current filter settings. Try adjusting your keywords or clearing the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setPriceRange('all')
            }}
            className="px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  )
}
