// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/chat"
                element={<Chat />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App