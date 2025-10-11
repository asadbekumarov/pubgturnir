import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Toaster import qo'shildi

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Achievements from "./components/sections/Achievements";
import Tournament from "./components/sections/Tournament";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Profile from "./pages/dashboard/Profile";
import DashboardPage from "./pages/dashboard/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import TournamentListPage from "./components/sections/Tournament";
import TournamentDetail from "./pages/tournamentID/tournamentID";
import ApplicationDetail from "./pages/Application/ApplicationDetail";
import ParticipationDetail from "./pages/participation/Participation";

function App() {
  const location = useLocation();

  // qaysi sahifalarda header/footer ko'rinmasin
  const hiddenLayoutRoutes = ["/dashboard", "/login", "/register"];
  const shouldHideLayout = hiddenLayoutRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {!shouldHideLayout && <Header />}

      <Routes>
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

        <Route path="/tournaments" element={<TournamentListPage />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/participation/:id" element={<ParticipationDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stats" element={<DashboardPage />} />
        </Route>
      </Routes>

      {!shouldHideLayout && <Footer />}

      {/* Toaster komponentini App oxiriga qo'shing */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          // Common toast options
          className: '',
          duration: 4000,
          style: {
            background: '#0f172a', // slate-900 sizning dizayningizga mos
            color: '#fff',
            border: '1px solid #334155', // slate-600
            borderRadius: '8px',
            fontSize: '14px',
            maxWidth: '420px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          // Success toast styling
          success: {
            style: {
              background: '#10b981', // green-500
              border: '1px solid #059669', // green-600
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          // Error toast styling
          error: {
            style: {
              background: '#ef4444', // red-500
              border: '1px solid #dc2626', // red-600
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          // Loading toast styling
          loading: {
            style: {
              background: '#f3aa01', // sizning gradient rangingiz
              border: '1px solid #d97706',
              color: '#000',
            },
            iconTheme: {
              primary: '#000',
              secondary: '#f3aa01',
            },
          },
        }}
      />
    </div>
  );
}

export default App;