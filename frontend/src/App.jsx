// src/App.jsx

import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import { GoogleOAuthProvider } from "@react-oauth/google"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Chat from "./pages/Chat"
import Quiz from "./pages/Quiz"
import Upload from "./pages/Upload"
import Settings from "./pages/Settings"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

// Shared Workspace layout for internal application pages
function WorkspaceLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const user = await response.json();
          localStorage.setItem('profileName', user.name);
          localStorage.setItem('profileEmail', user.email);
          window.dispatchEvent(new Event('storage'));
        } else if (response.status === 401) {
          // Token is expired or invalid — clear stale auth data
          localStorage.removeItem('token');
          localStorage.removeItem('profileName');
          localStorage.removeItem('profileEmail');
          window.dispatchEvent(new Event('storage'));
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Workspace Frame */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Workspace Top Header */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Dynamic page container */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Workspace Shell */}
            <Route element={<WorkspaceLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App