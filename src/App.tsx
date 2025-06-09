import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function Home() {
  return <h1 className="text-3xl font-bold">Página Home</h1>
}

function About() {
  return <h1 className="text-3xl font-bold">Página Sobre</h1>
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">Sobre</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
