import React from 'react'
import StarRating from './StarRating'

export default function ReviewCard({ review }) {
  const { userName, rating, comment, date, destinationName } = review

  // Generate initials for avatar
  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U'

  // Pick a subtle pastel color based on name
  const colors = [
    'bg-teal-100 text-teal-800',
    'bg-rose-100 text-rose-800',
    'bg-amber-100 text-amber-800',
    'bg-sky-100 text-sky-800',
    'bg-indigo-100 text-indigo-800'
  ]
  const colorIndex = (userName?.length || 0) % colors.length
  const avatarColor = colors[colorIndex]

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${avatarColor}`}
          >
            {initials}
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">{userName}</h4>
            {destinationName && (
              <span className="text-[11px] text-[#0d7377] font-medium block">
                Trip to {destinationName}
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <StarRating rating={rating} />
          <span className="text-[11px] text-gray-400 mt-1 block">{date}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-grow italic">
        "{comment}"
      </p>
    </div>
  )
}
