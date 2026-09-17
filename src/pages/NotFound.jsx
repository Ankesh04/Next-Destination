import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 text-[#0d7377] flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-10 h-10 animate-spin duration-3000" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-[#0d7377]">404</span>
          <h1 className="text-2xl font-bold text-gray-900">Destination Off The Map</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            The page or route you're looking for doesn't exist or has been relocated to another continent.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#0d7377] hover:bg-[#095457] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/destinations"
            className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  )
}
