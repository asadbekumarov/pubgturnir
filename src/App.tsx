import { Routes, Route, useLocation, Navigate } from "react-router-dom"

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import Achievements from "./components/sections/Achievements"
import Tournament from "./components/sections/Tournament"

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

import Profile from "./pages/dashboard/Profile"
import DashboardPage from "./pages/dashboard/Dashboard"
import DashboardLayout from "./components/layout/DashboardLayout"

function App() {
  const location = useLocation()

  // qaysi sahifalarda header/footer ko‘rinmasin
  const hiddenLayoutRoutes = ["/dashboard"]
  const shouldHideLayout = hiddenLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  )

  return (
    <div>
      {!shouldHideLayout && <Header />}

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <section id="results">
                <Achievements />
              </section>
              <section id="tournaments">
                <Tournament />
              </section>
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* default redirect */}
          <Route index element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<DashboardPage />} />
        </Route>
      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
  )
}

export default App
