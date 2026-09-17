import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react'

export default function PackageCard({ pkg }) {
  const { id, title, duration, price, inclusions = [], image } = pkg

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image & Duration badge */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-xs text-white font-medium text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#ff6b6b]" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#0d7377] transition-colors leading-snug">
          {title}
        </h3>

        {/* Inclusions summary */}
        <div className="space-y-1.5 mb-5 flex-grow">
          {inclusions.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0d7377] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
          {inclusions.length > 3 && (
            <div className="text-xs text-gray-400 pl-5">
              +{inclusions.length - 3} more experiences included
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 block font-normal">Per person</span>
            <span className="text-xl font-bold text-[#0d7377]">${price}</span>
          </div>

          <Link
            to={`/packages/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 bg-[#0d7377] hover:bg-[#095457] text-white rounded-xl shadow-xs transition-colors"
          >
            <span>Explore Tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
