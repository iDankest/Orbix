export default function Header() {
  return (
    <header className="bg-slate-900 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Orbix</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-cyan-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Astronauts</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Launches</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}