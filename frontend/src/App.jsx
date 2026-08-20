import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import DoctorsPage from './pages/DoctorsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import './App.css'

function App() {
  return <BrowserRouter><Navbar /><main><Routes><Route path="/" element={<HomePage />} /><Route path="/doctors" element={<DoctorsPage />} /><Route path="/booking" element={<BookingPage />} /></Routes></main></BrowserRouter>
}

export default App
