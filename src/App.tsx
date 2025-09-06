import Achievements from "./components/Achievements"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
// import Schedule from "./components/Schedule"
// import Schedule from "./components/Schedule"
// import Teams from "./components/Teams"
import Tournament from "./components/Tournament"

function App() {
  return (
    <div>
      <Header />
      <Hero />

      {/* Natijalar section */}
      <section id="results">
        <Achievements />
      </section>

      {/* Komandalar section */}
      {/* <section id="teams">
        <Teams />
      </section> */}

      {/* Turnirlar section */}
      <section id="tournaments">
        <Tournament />
      </section>

      {/* Jadval (hozircha yo‘q, keyin qo‘shasan) */}
      {/* <section id="schedule">
        <Schedule />
      </section> */}

      <Footer />
    </div>
  )
}

export default App
