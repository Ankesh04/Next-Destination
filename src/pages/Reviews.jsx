import React, { useState, useEffect } from 'react'
import { initialReviews } from '../data/reviews'
import { destinations } from '../data/destinations'
import { useAuth } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import StarRating from '../components/StarRating'
import { Star, MessageSquare, Send, Check, Sparkles } from 'lucide-react'

export default function Reviews() {
  const { user } = useAuth()

  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('nd_reviews')
      const localReviews = stored ? JSON.parse(stored) : []
      return [...localReviews, ...initialReviews]
    } catch {
      return initialReviews
    }
  })

  // Review Form State
  const [userName, setUserName] = useState(user?.name || '')
  const [selectedDestId, setSelectedDestId] = useState(destinations[0]?.id || '')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  // Keep name synced if user logs in/out
  useEffect(() => {
    if (user?.name) {
      setUserName(user.name)
    }
  }, [user])

  // Compute average rating
  const avgRating = (
    reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / (reviews.length || 1)
  ).toFixed(1)

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      setFormError('Please enter your name')
      return
    }

    if (!comment.trim()) {
      setFormError('Please share your thoughts or travel feedback')
      return
    }

    const matchedDest = destinations.find((d) => d.id === selectedDestId)

    const newReview = {
      id: 'rev-' + Date.now(),
      destinationId: selectedDestId,
      destinationName: matchedDest ? `${matchedDest.name}, ${matchedDest.country}` : 'Global Tour',
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    }

    // Save to localStorage
    try {
      const stored = localStorage.getItem('nd_reviews')
      const localReviews = stored ? JSON.parse(stored) : []
      const updatedLocal = [newReview, ...localReviews]
      localStorage.setItem('nd_reviews', JSON.stringify(updatedLocal))
    } catch (err) {
      console.error('Failed to save review', err)
    }

    setReviews([newReview, ...reviews])
    setComment('')
    setFormError('')
    setFormSuccess(true)

    setTimeout(() => {
      setFormSuccess(false)
    }, 4000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-gray-200 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Voice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Traveler Stories & Reviews
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-xl">
            Read real experiences from wanderers worldwide and share your own travel story with our community.
          </p>
        </div>

        {/* Global Rating Badge */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4 self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#ff6b6b] flex items-center justify-center font-black text-xl">
            ★
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-gray-900">{avgRating}</span>
              <span className="text-xs text-gray-400">/ 5.0</span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Based on {reviews.length} authentic reviews
            </span>
          </div>
        </div>
      </div>

      {/* Leave a Review Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm max-w-3xl mx-auto">
        <div className="flex items-center gap-2.5 mb-6 text-[#0d7377]">
          <Sparkles className="w-5 h-5 text-[#ff6b6b]" />
          <h2 className="text-xl font-bold text-gray-900">Leave a Review</h2>
        </div>

        {formSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thank you! Your review has been posted and added to the community feed.</span>
          </div>
        )}

        {formError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmitReview} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Maya Lin"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>

            {/* Destination select */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Destination Visited *
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377] cursor-pointer"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Your Rating (Click to rate)
            </label>
            <div className="flex items-center gap-3">
              <StarRating
                rating={rating}
                interactive={true}
                onChange={(val) => setRating(val)}
                size="w-6 h-6"
              />
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Your Review / Experience *
            </label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What made this destination or trip unforgettable? Share tips for future travelers..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#0d7377] hover:bg-[#095457] text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Review</span>
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Experiences ({reviews.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </div>
    </div>
  )
}
