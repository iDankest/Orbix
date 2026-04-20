export default function HeroSection() {
  return (
    <section className="hero font-typography-scale" >
      <div className="hero-bg"></div>
      <div className="container mx-auto px-4 text-center ">
        <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          ORBIX
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Explore the cosmos with real-time data from NASA and SpaceX
        </p>
      </div>
    </section>
  );
}