import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return <header className="navbar"><Link className="brand" to="/">Medi<span>Link</span></Link><nav><ul className="nav-links"><li><NavLink to="/">Home</NavLink></li><li><NavLink to="/doctors">Doctors</NavLink></li><li><NavLink to="/booking">Book appointment</NavLink></li></ul></nav></header>
}

export default Navbar
