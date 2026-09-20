import React, { useState } from 'react'
import { Star } from 'lucide-react'

/**
 * ============================================================================
 * REUSABLE STAR RATING COMPONENT
 * ============================================================================
 * Supports two operating modes:
 * 1. Read-Only Mode (interactive = false): Displays a numeric score (e.g. 4.8).
 * 2. Interactive Picker Mode (interactive = true): Allows user to hover over
 *    and click stars to submit a rating in reviews.
 * 
 * Props:
 * - rating: Current numeric score (1 to 5)
 * - maxStars: Total number of stars to render (default 5)
 * - interactive: Boolean enabling hover & click listeners
 * - onChange: Callback fired with the clicked star value (1 to 5)
 * - size: Tailwind icon sizing class (e.g. 'w-4 h-4' or 'w-6 h-6')
 */
export default function StarRating({
  rating = 5,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'w-4 h-4'
}) {
  // Temporary rating while hovering over stars
  const [hoverRating, setHoverRating] = useState(0)

  // Commit selected rating
  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index)
    }
  }

  // Preview rating on mouse hover
  const handleMouseEnter = (index) => {
    if (interactive) {
      setHoverRating(index)
    }
  }

  // Reset to original rating when cursor leaves
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  // Active rating: prioritizes hover state over committed rating
  const activeRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1">
      {/* Create an array of length maxStars [0, 1, 2, 3, 4] */}
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
            {/* Lucide Star icon with conditional fill color */}
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
