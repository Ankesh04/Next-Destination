import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all fields before submitting.')
      return
    }

    // Basic email regex
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0d7377] text-xs font-semibold mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>We'd Love to Hear From You</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Contact Our Concierge
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2 leading-relaxed">
          Have a question about custom itineraries, group bookings, or need personalized travel advice? Our specialists are here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thanks, we'll get back to you within 24 hours with all the details you need for your journey.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', subject: '', message: '' })
                }}
                className="mt-4 px-6 py-2.5 bg-[#0d7377] text-white text-xs font-semibold rounded-xl hover:bg-[#095457] transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Send Us a Message</h2>

              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Liam Walker"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="liam@example.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Custom 10-day Bali + Kyoto honeymoon quote"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your dream destination, approximate dates, party size, or specific questions..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0d7377] hover:bg-[#095457] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Company Info & Map */}
        <div className="lg:col-span-5 space-y-6">
          {/* Company Information Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-gray-900">Headquarters & Concierge</h3>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0d7377] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800 block">Global HQ</span>
                  <span>450 Lexington Avenue, Suite 1800, New York, NY 10017, USA</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0d7377] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800 block">Phone Support</span>
                  <span>+1 (800) 555-DEST (3378)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0d7377] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800 block">Email Inquiries</span>
                  <span>hello@nextdestination.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0d7377] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-800 block">Working Hours</span>
                  <span>Mon – Fri: 8:00 AM – 8:00 PM EST</span>
                  <span className="block text-xs text-gray-400">Emergency support available 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map Placeholder */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-64 relative">
            <iframe
              title="Next Destination HQ Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573210344!2d-73.97720232348577!3d40.75253893484224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a41270b9%3A0x7d6f51950d87e07a!2sLexington%20Ave%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
