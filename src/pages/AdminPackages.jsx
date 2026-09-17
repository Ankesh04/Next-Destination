import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { packages as defaultPackages } from '../data/packages'
import { destinations } from '../data/destinations'
import { Package, PlusCircle, Trash2, Clock, DollarSign, Check, Image as ImageIcon } from 'lucide-react'

export default function AdminPackages() {
  const [adminPackages, setAdminPackages] = useState(() => {
    try {
      const stored = localStorage.getItem('nd_admin_packages')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Add Package Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [destinationId, setDestinationId] = useState(destinations[0]?.id || '')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('5 Days / 4 Nights')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleAddPackage = (e) => {
    e.preventDefault()

    if (!title.trim() || !destinationId || !price || !duration.trim()) {
      setError('Please fill in all required fields (title, destination, price, duration)')
      return
    }

    const matchedDest = destinations.find((d) => d.id === destinationId)

    const newPkg = {
      id: 'pkg-admin-' + Date.now(),
      destinationId,
      title: title.trim(),
      duration: duration.trim(),
      price: Number(price),
      image:
        image.trim() ||
        matchedDest?.image ||
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      inclusions: [
        'Luxury boutique accommodation',
        'Private chauffeur and daily airport transfers',
        'Certified English-speaking private guide',
        'All entry tickets and special experiences'
      ],
      itinerary: [
        { day: 1, title: 'Arrival & Welcome Dinner', description: `Check into luxury suites in ${matchedDest?.name || 'destination'}. Enjoy an authentic local welcome dining experience.` },
        { day: 2, title: 'Iconic Landmarks & Culture', description: 'Full day private guided exploration of the region’s most famous historical highlights and viewpoints.' },
        { day: 3, title: 'Hidden Gems & Local Flavors', description: 'Culinary tasting tour, off-the-beaten-path trails, and sunset catamaran or terrace drinks.' },
        { day: 4, title: 'Leisure Day & Shopping', description: 'Free morning to relax by the pool, visit local craft markets, or book signature wellness spa treatments.' },
        { day: 5, title: 'Farewell & Departure', description: 'Gourmet breakfast and private transfer to the airport for your onward journey.' }
      ],
      isAdminAdded: true
    }

    const updated = [newPkg, ...adminPackages]
    setAdminPackages(updated)
    localStorage.setItem('nd_admin_packages', JSON.stringify(updated))

    setMessage(`New package "${title}" successfully added and published to the website!`)
    setTitle('')
    setPrice('')
    setImage('')
    setError('')
    setIsFormOpen(false)

    setTimeout(() => setMessage(''), 3500)
  }

  const handleDeletePackage = (pkgId, pkgTitle) => {
    const updated = adminPackages.filter((p) => p.id !== pkgId)
    setAdminPackages(updated)
    localStorage.setItem('nd_admin_packages', JSON.stringify(updated))
    setMessage(`Package "${pkgTitle}" was deleted.`)

    setTimeout(() => setMessage(''), 3000)
  }

  // Combined package list
  const combinedPackages = [
    ...adminPackages.map((p) => ({ ...p, isAdminCreated: true })),
    ...defaultPackages.map((p) => ({ ...p, isAdminCreated: false }))
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Sub-navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/admin" className="hover:text-[#0d7377] font-semibold">Admin</Link>
            <span>/</span>
            <span>Package Catalog</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Manage Tour Packages ({combinedPackages.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, publish, and manage all-inclusive itineraries available to visitors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 text-xs font-bold bg-[#ff6b6b] hover:bg-[#fa5252] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isFormOpen ? 'Close Form' : 'Add New Package'}</span>
          </button>

          <div className="hidden sm:flex gap-2">
            <Link
              to="/admin"
              className="px-4 py-2 text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl transition-colors"
            >
              Overview
            </Link>
            <Link
              to="/admin/packages"
              className="px-4 py-2 text-xs font-bold bg-[#0d7377] text-white rounded-xl shadow-xs"
            >
              Packages
            </Link>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Add Package Form Card */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#0d7377]" />
            <span>Create New Tour Package</span>
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleAddPackage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Package Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kyoto Cherry Blossom & Castle Odyssey"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Destination *
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377] cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Price ($ USD per person) *
                </label>
                <input
                  type="number"
                  min="50"
                  step="10"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 1150"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 6 Days / 5 Nights"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Cover Photo URL (optional — defaults to destination photo)
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0d7377] hover:bg-[#095457] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Publish Package
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
              <tr>
                <th className="py-4 px-6">Tour Package</th>
                <th className="py-4 px-6">Destination</th>
                <th className="py-4 px-6">Duration</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Origin</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {combinedPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">{pkg.title}</span>
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="text-[11px] text-[#0d7377] hover:underline"
                        >
                          View public page →
                        </Link>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 uppercase font-semibold text-xs text-gray-500">
                    {pkg.destinationId}
                  </td>

                  <td className="py-4 px-6 text-xs text-gray-700">
                    {pkg.duration}
                  </td>

                  <td className="py-4 px-6 font-bold text-gray-900">
                    ${pkg.price}
                  </td>

                  <td className="py-4 px-6 text-xs">
                    {pkg.isAdminCreated ? (
                      <span className="text-[#0d7377] bg-teal-50 px-2 py-0.5 rounded text-[11px] font-bold">
                        Admin Added (localStorage)
                      </span>
                    ) : (
                      <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                        Seed Library
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {pkg.isAdminCreated ? (
                      <button
                        type="button"
                        onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 italic">
                        Permanent seed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
