import React, { useState, useEffect } from 'react'
import { destinations } from '../data/destinations'
import { Camera, X, Maximize2, MapPin } from 'lucide-react'

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Extra high-resolution photography showcase
  const galleryItems = [
    ...destinations.map((d) => ({
      id: d.id,
      title: d.name,
      country: d.country,
      category: d.category,
      image: d.image
    })),
    {
      id: 'extra-1',
      title: 'Ubud Emerald Terraces',
      country: 'Bali, Indonesia',
      category: 'Beach',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'extra-2',
      title: 'Eiffel Tower at Twilight',
      country: 'Paris, France',
      category: 'Romantic',
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'extra-3',
      title: 'Oia Blue Domes',
      country: 'Santorini, Greece',
      category: 'Romantic',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'extra-4',
      title: 'Matterhorn Alpine Lake',
      country: 'Swiss Alps',
      category: 'Mountain',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'extra-5',
      title: 'Maldives Turquoise Shallows',
      country: 'Maldives',
      category: 'Beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'extra-6',
      title: 'Kyoto Arashiyama Bamboo',
      country: 'Kyoto, Japan',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Inspiration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Destination Photo Gallery
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 leading-relaxed">
          Glimpse stunning landscapes, crystal seas, vibrant cityscapes, and quiet sanctuaries captured across our favorite travel destinations.
        </p>
      </div>

      {/* Responsive Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryItems.map((item, index) => (
          <div
            key={item.id + index}
            onClick={() => setSelectedPhoto(item)}
            className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gray-100"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-300 mb-0.5">
                {item.category}
              </span>
              <h4 className="text-sm font-bold">{item.title}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-300 mt-0.5">
                <MapPin className="w-3 h-3 text-[#ff6b6b]" />
                <span>{item.country}</span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Conditional render, pure local state) */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking image content
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 sm:right-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Enlarged Photo */}
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black max-h-[75vh] w-auto">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Photo Caption */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-lg sm:text-xl font-bold">{selectedPhoto.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b6b]" />
                <span>{selectedPhoto.country}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
