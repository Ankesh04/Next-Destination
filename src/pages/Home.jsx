import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { packages } from '../data/packages'
import { initialReviews } from '../data/reviews'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'
import ReviewCard from '../components/ReviewCard'
import { Search, Compass, ShieldCheck, Award, Headphones, ArrowRight, Sparkles, MapPin } from 'lucide-react'

export default function Home() {
  const [heroSearch, setHeroSearch] = useState('')
  const navigate = useNavigate()

  const handleHeroSearch = (e) => {
    e.preventDefault()
    if (heroSearch.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(heroSearch.trim())}`)
    } else {
      navigate('/destinations')
    }
  }

  const featuredDestinations = destinations.slice(0, 4)
  const featuredPackages = packages.slice(0, 3)
  const featuredReviews = initialReviews.slice(0, 3)

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[620px] flex items-center justify-center rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-xl">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
            alt="Travel Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-teal-200 text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6b6b]" />
            <span>Discover Unforgettable Journeys</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Explore the World, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-200 to-[#ff6b6b]">
              One Destination at a Time
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Curated tours, boutique hotels, flight reservations, and flexible itineraries crafted for seekers of extraordinary memories.
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-white/40"
          >
            <div className="relative flex-grow w-full flex items-center">
              <MapPin className="w-5 h-5 text-[#0d7377] absolute left-3.5" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Where do you want to go? (e.g. Bali, Paris, Swiss Alps)"
                className="w-full pl-11 pr-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0d7377] hover:bg-[#095457] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Trending Searches Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs text-gray-300">
            <span className="font-medium text-teal-200">Trending:</span>
            {['Bali', 'Santorini', 'Maldives', 'Swiss Alps', 'Kyoto'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/destinations?search=${tag}`)}
                className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Value Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d7377] flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">50+</div>
              <div className="text-xs text-gray-500">Handcrafted Tours</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#ff6b6b] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">4.9 / 5</div>
              <div className="text-xs text-gray-500">Traveler Rating</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">100%</div>
              <div className="text-xs text-gray-500">Verified Bookings</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">24/7</div>
              <div className="text-xs text-gray-500">Travel Concierge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0d7377] mb-2">
              Top Destinations
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Places to Visit</h2>
            <p className="text-sm text-gray-500 mt-1">Explore our most booked and beloved getaway spots across the globe.</p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d7377] hover:text-[#095457] transition-colors self-start md:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Featured Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#ff6b6b] mb-2">
              Curated Escapes
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Tour Packages</h2>
            <p className="text-sm text-gray-500 mt-1">All-inclusive guided itineraries taking care of every luxury detail.</p>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d7377] hover:text-[#095457] transition-colors self-start md:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-teal-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 py-16 px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#ff6b6b]">Why Next Destination</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">Travel Smarter, Dream Bigger, Worry Less</h2>
          <p className="text-teal-100 text-sm leading-relaxed">
            We curate hand-picked experiences, negotiate best boutique rates, and organize custom itineraries so you can immerse yourself fully in the magic of travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ff6b6b] font-bold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold">Boutique Local Guides</h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              Every package pairs you with trusted local experts who unlock hidden alleys, secret eateries, and authentic stories.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ff6b6b] font-bold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold">Transparent Fair Pricing</h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              No hidden resort fees or surprise charges. What you see is exactly what your journey costs, guaranteed.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ff6b6b] font-bold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold">Interactive Itinerary Tool</h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              Seamlessly combine hotel bookings, flights, and personal notes into a single cohesive trip timeline in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Traveler Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0d7377] mb-2">
            Real Stories
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Loved by Travelers Everywhere</h2>
          <p className="text-sm text-gray-500 mt-2">Read honest feedback from travelers who booked their adventures with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:border-[#0d7377] text-gray-800 hover:text-[#0d7377] rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Read All Traveler Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0d7377] to-teal-800 rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready for Your Next Escape?</h2>
            <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
              Explore our curated tours or build your custom dream itinerary right now.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/destinations"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#ff6b6b] hover:bg-[#fa5252] text-white font-semibold text-sm rounded-xl shadow-lg transition-all"
              >
                Browse Destinations
              </Link>
              <Link
                to="/itinerary"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
              >
                Build Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
