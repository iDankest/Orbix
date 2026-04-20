import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LandigStats from "./components/LandigStats";
import Astronautas from "./components/Astronautas";

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LandigStats />
        <Astronautas />
      </main>
      <Footer />
    </>
  );
}

export default App;
