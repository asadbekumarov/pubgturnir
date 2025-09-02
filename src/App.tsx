import Achievements from "./components/Achievements"
import Footer from "./components/Footer"
import Header from "./components/header"
import Hero from "./components/Hero"
import Teams from "./components/Teams"
import Tournament from "./components/Tournament"

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Achievements />
      <Teams />
      <Tournament />
      <Footer />
    </div>
  )
}

export default App