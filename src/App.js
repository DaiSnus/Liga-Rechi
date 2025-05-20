import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Showcase from "./components/Showcase/Showcase"
import AdminPanel from "./components/AdminPanel/AdminPanel"
import AboutUs from "./components/Showcase/AboutUs/AboutUs"
import "./App.css"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Showcase />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
    </Router>
  )
}

export default App
