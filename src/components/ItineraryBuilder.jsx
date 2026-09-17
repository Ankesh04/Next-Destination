import React, { useState } from 'react'
import { PlusCircle, Calendar, FileText } from 'lucide-react'

export default function ItineraryBuilder({ onAddItem }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dayNumber, setDayNumber] = useState('1')
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter an activity title or stop name')
      return
    }

    const newItem = {
      id: 'custom-' + Date.now(),
      type: 'Custom Activity',
      title: title.trim(),
      description: description.trim(),
      day: parseInt(dayNumber, 10) || 1,
      createdAt: new Date().toISOString()
    }

    onAddItem(newItem)
    setTitle('')
    setDescription('')
    setError('')
    setIsExpanded(false)
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full py-3 px-4 border-2 border-dashed border-[#0d7377]/30 hover:border-[#0d7377] rounded-xl text-[#0d7377] font-semibold text-sm flex items-center justify-center gap-2 transition-all bg-teal-50/40 hover:bg-teal-50 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Custom Note or Activity to Itinerary</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#0d7377]" />
              <span>Add Custom Day Activity</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Day Number
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={dayNumber}
                  onChange={(e) => setDayNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Activity / Location Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Sunset drinks at Rock Bar Bali"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Notes / Special Instructions (optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <textarea
                rows="2"
                placeholder="e.g. Bring swimwear, book cab at 4:30 PM, reservation under name David."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-[#0d7377] hover:bg-[#095457] text-white rounded-xl shadow-xs transition-colors"
            >
              Add to Itinerary
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
