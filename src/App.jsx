import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'

// Page Components
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Packages from './pages/Packages'
import PackageDetail from './pages/PackageDetail'
import Hotels from './pages/Hotels'
import Flights from './pages/Flights'
import Itinerary from './pages/Itinerary'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminBookings from './pages/AdminBookings'
import AdminPackages from './pages/AdminPackages'
import NotFound from './pages/NotFound'

/**
 * ============================================================================
 * SCROLL TO TOP HELPER
 * ============================================================================
 * In single-page applications (SPAs), navigating to a new URL doesn't trigger
 * a full browser reload, meaning the page might remain scrolled down.
 * This component listens for route changes using useLocation() and resets the scroll
 * position to (x: 0, y: 0) on every navigation.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * ============================================================================
 * ROOT APP COMPONENT
 * ============================================================================
 * Configures global providers, browser routing, and shared UI layout
 * (Navbar + Page Content + Footer).
 */
export default function App() {
  return (
    // 1. AuthProvider supplies authentication context to all components
    <AuthProvider>
      {/* 2. BrowserRouter enables HTML5 history API navigation without reloads */}
      <BrowserRouter>
        {/* Reset scroll on page transitions */}
        <ScrollToTop />

        {/* Global sticky layout wrapper (flex column with footer pushed to bottom) */}
        <div className="flex flex-col min-h-screen">
          {/* Global Header */}
          <Navbar />

          {/* Main Content Area: dynamically rendered according to active route */}
          <main className="flex-grow">
            <Routes>
              {/* ================= PUBLIC ROUTES ================= */}
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              {/* Route with URL parameter :id (accessible via useParams hook) */}
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ================= PROTECTED ADMIN ROUTES =================
                  Wrapped with <ProtectedAdminRoute> to verify user is logged in
                  and has the 'admin' role before granting access. */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedAdminRoute>
                    <AdminUsers />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/bookings"
                element={
                  <ProtectedAdminRoute>
                    <AdminBookings />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/packages"
                element={
                  <ProtectedAdminRoute>
                    <AdminPackages />
                  </ProtectedAdminRoute>
                }
              />

              {/* ================= CATCH-ALL / 404 ROUTE =================
                  Matches any URL that wasn't caught by the routes above. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
