import React, { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({
  rating = 5,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'w-4 h-4'
}) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index)
    }
  }

  const handleMouseEnter = (index) => {
    if (interactive) {
      setHoverRating(index)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  const activeRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1
        const isFilled = activeRating >= starValue
        const isHalf = !isFilled && activeRating >= starValue - 0.5

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform ${
              interactive ? 'cursor-pointer hover:scale-125 focus:outline-none' : 'cursor-default'
            }`}
          >
            <Star
              className={`${size} ${
                isFilled
                  ? 'fill-[#ff6b6b] text-[#ff6b6b]'
                  : isHalf
                  ? 'fill-[#ff6b6b]/50 text-[#ff6b6b]'
                  : 'fill-transparent text-gray-300'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
