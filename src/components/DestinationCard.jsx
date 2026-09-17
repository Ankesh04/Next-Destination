import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, ArrowRight } from 'lucide-react'

export default function DestinationCard({ destination }) {
  const { id, name, country, category, shortBlurb, startingPrice, rating, image } = destination

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Destination Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-xs text-[#0d7377] font-semibold text-xs px-3 py-1 rounded-full shadow-xs">
          {category}
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#ff6b6b] text-[#ff6b6b]" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#0d7377]" />
          <span>{country}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0d7377] transition-colors">
          {name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
          {shortBlurb}
        </p>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 block font-normal">Starting from</span>
            <span className="text-lg font-bold text-[#0d7377]">${startingPrice}</span>
          </div>

          <Link
            to={`/destinations/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 bg-[#0d7377] hover:bg-[#095457] text-white rounded-xl shadow-xs transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
