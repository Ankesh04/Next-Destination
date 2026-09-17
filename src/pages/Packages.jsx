import React, { useState, useMemo } from 'react'
import { packages as defaultPackages } from '../data/packages'
import PackageCard from '../components/PackageCard'
import { Search, Compass, Clock, SlidersHorizontal, Frown } from 'lucide-react'

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState('')
  const [maxPrice, setMaxPrice] = useState('all')

  // Load admin packages from localStorage
  const allPackages = useMemo(() => {
    try {
      const stored = localStorage.getItem('nd_admin_packages')
      const adminPkgs = stored ? JSON.parse(stored) : []
      return [...defaultPackages, ...adminPkgs]
    } catch {
      return defaultPackages
    }
  }, [])

  const filteredPackages = useMemo(() => {
    return allPackages.filter((pkg) => {
      const matchesSearch =
        searchTerm === '' ||
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destinationId?.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesPrice = true
      if (maxPrice === 'under-1000') {
        matchesPrice = pkg.price < 1000
      } else if (maxPrice === '1000-1500') {
        matchesPrice = pkg.price >= 1000 && pkg.price <= 1500
      } else if (maxPrice === 'over-1500') {
        matchesPrice = pkg.price > 1500
      }

      return matchesSearch && matchesPrice
    })
  }, [allPackages, searchTerm, maxPrice])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>All-Inclusive Journeys</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Curated Tour Packages
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Complete, hassle-free travel itineraries designed by local specialists. Accommodations, transfers, guided tours, and unforgettable moments included.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="relative md:col-span-8">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search packages by title or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
          />
        </div>

        <div className="relative md:col-span-4">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0d7377] appearance-none text-gray-700 cursor-pointer"
          >
            <option value="all">All Budgets</option>
            <option value="under-1000">Under $1,000</option>
            <option value="1000-1500">$1,000 – $1,500</option>
            <option value="over-1500">Over $1,500</option>
          </select>
        </div>
      </div>

      {/* Grid of Packages */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-rose-50 text-[#ff6b6b] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Frown className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Packages Found</h3>
          <p className="text-xs text-gray-500 mb-6">
            No tour packages match your search criteria. Try modifying your search or clearing filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setMaxPrice('all')
            }}
            className="px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
