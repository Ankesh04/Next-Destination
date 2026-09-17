import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, Heart, Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Blurb */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-gray-900 tracking-tight">
              <span className="text-2xl text-[#0d7377]">✈</span>
              <span>Next<span className="text-[#0d7377]">Destination</span></span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Discover extraordinary travel destinations, handpicked boutique tour packages, luxury hotels, and personalized itineraries curated for the modern wanderer.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#0d7377] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#0d7377] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#0d7377] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-[#0d7377] hover:text-white text-gray-600 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/destinations" className="hover:text-[#0d7377] transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-[#0d7377] transition-colors">Tour Packages</Link></li>
              <li><Link to="/hotels" className="hover:text-[#0d7377] transition-colors">Hotels & Resorts</Link></li>
              <li><Link to="/flights" className="hover:text-[#0d7377] transition-colors">Flights Search</Link></li>
              <li><Link to="/gallery" className="hover:text-[#0d7377] transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/itinerary" className="hover:text-[#0d7377] transition-colors">My Itinerary</Link></li>
              <li><Link to="/reviews" className="hover:text-[#0d7377] transition-colors">Traveler Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-[#0d7377] transition-colors">Contact Concierge</Link></li>
              <li><Link to="/login" className="hover:text-[#0d7377] transition-colors">Traveler Login</Link></li>
              <li><Link to="/admin" className="hover:text-[#0d7377] transition-colors">Staff Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Get Travel Deals</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe to get secret flight drops, curated itineraries, and exclusive seasonal discounts.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200">
                ✓ You're subscribed to secret deals!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:bg-white transition-all text-gray-800"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#0d7377] text-white rounded-lg hover:bg-[#095457] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Next Destination Travel Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#ff6b6b] fill-[#ff6b6b]" />
            <span>for explorers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
