import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { packages as defaultPackages } from '../data/packages'
import PackageCard from '../components/PackageCard'
import { MapPin, Star, Calendar, Sun, CheckCircle2, ArrowLeft, Hotel, Plane } from 'lucide-react'

export default function DestinationDetail() {
  const { id } = useParams()

  const destination = destinations.find((d) => d.id.toLowerCase() === id?.toLowerCase())

  // Merge default packages with any admin packages in localStorage
  let allPackages = defaultPackages
  try {
    const adminPackages = JSON.parse(localStorage.getItem('nd_admin_packages') || '[]')
    allPackages = [...defaultPackages, ...adminPackages]
  } catch {
    allPackages = defaultPackages
  }

  if (!destination) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          We couldn't locate the destination you requested. It might have been moved or removed.
        </p>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </Link>
      </div>
    )
  }

  const relatedPackages = allPackages.filter(
    (pkg) => pkg.destinationId?.toLowerCase() === destination.id.toLowerCase()
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0d7377] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden h-[420px] md:h-[500px] shadow-lg">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#ff6b6b] text-white text-xs font-semibold uppercase tracking-wider">
                {destination.category}
              </span>
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#ff6b6b] text-[#ff6b6b]" />
                <span>{destination.rating.toFixed(1)} traveler rating</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {destination.name}
            </h1>

            <div className="flex items-center gap-1.5 text-sm sm:text-base text-gray-200">
              <MapPin className="w-4 h-4 text-[#ff6b6b]" />
              <span>{destination.country}</span>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-right self-start md:self-auto">
            <span className="text-xs text-gray-200 block">Starting from</span>
            <span className="text-3xl font-black text-white">${destination.startingPrice}</span>
            <span className="text-xs text-gray-300 block">avg / person</span>
          </div>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: About & Highlights */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0d7377]" />
              <span>Trip Highlights & Must-See Sights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {destination.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-[#0d7377] mt-2 shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Weather & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Best Time & Weather */}
          <div className="bg-gradient-to-br from-teal-50/80 to-emerald-50/50 p-6 rounded-2xl border border-teal-100">
            <div className="flex items-center gap-2.5 text-[#0d7377] mb-3">
              <Sun className="w-5 h-5" />
              <h3 className="text-base font-bold text-gray-900">Best Time to Visit</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {destination.weatherBestTime}
            </p>
          </div>

          {/* Quick Book Services */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-gray-900">Plan Your Visit</h4>
            <div className="space-y-2.5">
              <Link
                to="/hotels"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#0d7377] hover:bg-teal-50/30 transition-all text-xs font-semibold text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <Hotel className="w-4 h-4 text-[#0d7377]" />
                  <span>Book Hotels in {destination.name}</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
              <Link
                to="/flights"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#0d7377] hover:bg-teal-50/30 transition-all text-xs font-semibold text-gray-700"
              >
                <div className="flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-[#0d7377]" />
                  <span>Find Flights to {destination.country}</span>
                </div>
                <span className="text-gray-400">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tour Packages */}
      <section className="pt-8 border-t border-gray-200">
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0d7377] mb-1">
            Handcrafted Itineraries
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tour Packages for {destination.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Choose from all-inclusive curated packages designed specifically for {destination.name}.
          </p>
        </div>

        {relatedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500 text-sm">
            <p>No dedicated packaged tours currently listed for {destination.name}.</p>
            <p className="text-xs mt-1 text-gray-400">
              You can still book independent hotels and flights or add a custom itinerary note!
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
