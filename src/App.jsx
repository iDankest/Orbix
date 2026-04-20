
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Card from "./components/Card";
import CardDash from "./components/CardDash";

function App() {


  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Card title="Card Title" />
        <CardDash />
      </main>
      <Footer />
    </>
  );
}

export default App;
