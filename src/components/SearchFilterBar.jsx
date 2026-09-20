import React from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

/** Default category tags available across the app */
const DEFAULT_CATEGORIES = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Romantic']

/**
 * ============================================================================
 * SEARCH & FILTER BAR
 * ============================================================================
 * Reusable controlled filter component used in Destinations and Hotels catalogs.
 * 
 * Props:
 * - searchTerm: Current text query entered by the user
 * - onSearchChange: Callback fired when text changes
 * - selectedCategory: Active category pill ('All', 'Beach', etc.)
 * - onCategoryChange: Callback fired when a pill is clicked
 * - priceRange: Selected dropdown option ('all', 'under-500', etc.)
 * - onPriceRangeChange: Callback fired when price range changes
 * - categories: Array of category labels to render
 * - placeholder: Search input placeholder text
 */
export default function SearchFilterBar({
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'All',
  onCategoryChange,
  priceRange = 'all',
  onPriceRangeChange,
  categories = DEFAULT_CATEGORIES,
  placeholder = 'Search by destination or country...'
}) {
  // Determine if any filters are currently active
  const hasFilters = searchTerm !== '' || selectedCategory !== 'All' || priceRange !== 'all'

  // Reset all criteria back to default state
  const handleClearFilters = () => {
    onSearchChange('')
    onCategoryChange('All')
    onPriceRangeChange('all')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* 1. TEXT SEARCH INPUT */}
        <div className="relative md:col-span-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:bg-white transition-all text-gray-800 placeholder-gray-400"
          />
          {/* Quick-clear button inside the search input */}
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. PRICE RANGE DROPDOWN */}
        <div className="relative md:col-span-4">
          <div className="relative">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:bg-white text-gray-700 cursor-pointer appearance-none transition-all"
            >
              <option value="all">Any Price Range</option>
              <option value="under-500">Under $500</option>
              <option value="500-1000">$500 – $1,000</option>
              <option value="over-1000">Over $1,000</option>
            </select>
            {/* Custom downward chevron indicator */}
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* 3. RESET BUTTON */}
        <div className="md:col-span-2 flex justify-end">
          {hasFilters ? (
            <button
              onClick={handleClearFilters}
              className="w-full md:w-auto px-4 py-3 text-xs font-semibold text-[#ff6b6b] hover:bg-[#ff6b6b]/10 rounded-xl transition-colors border border-dashed border-[#ff6b6b]/40 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          ) : (
            <span className="text-xs text-gray-400 hidden md:inline-block">Filter options</span>
          )}
        </div>
      </div>

      {/* 4. CATEGORY PILLS (Horizontally scrollable on small screens) */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-medium text-gray-500 mr-1 flex-shrink-0">Category:</span>
        {categories.map((category) => {
          const isActive = selectedCategory === category
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0d7377] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}
