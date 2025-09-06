import { Header, Footer, Hero, Achievements, Tournament } from "./components"

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

      {/* Jadval section */}
      {/* <section id="schedule">
        <Schedule />
      </section> */}

      <Footer />
    </div>
  )
}

export default App
