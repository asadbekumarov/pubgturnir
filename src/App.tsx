// import { Routes, Route, useLocation, Navigate } from "react-router-dom"

// import Header from "./components/layout/Header"
// import Footer from "./components/layout/Footer"
// import Hero from "./components/sections/Hero"
// import Achievements from "./components/sections/Achievements"
// import Tournament from "./components/sections/Tournament"

// import Login from "./components/auth/Login"
// import Register from "./components/auth/Register"

// import Profile from "./pages/dashboard/Profile"
// import DashboardPage from "./pages/dashboard/Dashboard"
// import DashboardLayout from "./components/layout/DashboardLayout"
// import TournamentListPage from './components/sections/Tournament';
// import TournamentDetail from "./pages/tournamentID/tournamentID";
// import ApplicationDetail from "./pages/Application/ApplicationDetail";
// import ParticipationDetail from './pages/participation/Participation';

// function App() {
//   const location = useLocation()

//   // qaysi sahifalarda header/footer ko‘rinmasin
//   const hiddenLayoutRoutes = ["/dashboard", "/login", "/register"]
//   const shouldHideLayout = hiddenLayoutRoutes.some((path) =>
//     location.pathname.startsWith(path)
//   )

//   return (
//     <div>
//       {!shouldHideLayout && <Header />}

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Hero />
//               <section id="results">
//                 <Achievements />
//               </section>
//               <section id="tournaments">
//                 <Tournament />
//               </section>
//               <section>
//                 <Participation />
//               </section>
//             </>
//           }
//         />

//         {/* ✅ Yangi route */}
//         <Route path="/tournaments" element={<TournamentListPage />} />
//         <Route path="/tournaments/:id" element={<TournamentDetail />} />
//         <Route path="/applications/:id" element={<ApplicationDetail />} />

//         <Route path="/participation/:id" element={<ParticipationDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/dashboard" element={<DashboardLayout />}>
//           <Route index element={<Navigate to="/dashboard/profile" replace />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="stats" element={<DashboardPage />} />
//         </Route>
//       </Routes>

//       {!shouldHideLayout && <Footer />}
//     </div>
//   )
// }

// export default App
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

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

  // qaysi sahifalarda header/footer ko‘rinmasin
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
    </div>
  );
}

export default App;
