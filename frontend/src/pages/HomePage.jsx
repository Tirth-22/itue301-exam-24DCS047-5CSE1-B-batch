import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppointmentCard from '../components/AppointmentCard.jsx'

function HomePage() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch('/api/v1/appointments').then((response) => response.json()).then((result) => setAppointments(result.data)).catch(() => setAppointments([]))
  }, [])

  return <div className="page home-page"><section className="hero home-hero"><div className="hero-content"><div className="hero-badge"><span>●</span> Trusted care, simpler access</div><h1>Healthcare that fits your life.</h1><p className="lead">Connect with experienced doctors, choose a convenient time, and manage your hospital appointments from one calm, clear place.</p><div className="actions"><Link className="button" to="/booking">Book an appointment <span>→</span></Link><Link className="button secondary" to="/doctors">Explore doctors</Link></div><div className="hero-note"><strong>10,000+</strong><span>patients have started their care journey with us</span></div></div><div className="hero-art"><img src="/hospital-hero.svg" alt="Doctor caring for a patient" /><div className="hero-art-label"><span className="pulse-dot"></span><div><strong>Care starts here</strong><small>Thoughtful support, every step</small></div></div></div></section><section className="trust-strip"><div><strong>6</strong><span>specialist doctors</span></div><div><strong>24/7</strong><span>appointment access</span></div><div><strong>100%</strong><span>simple and secure</span></div><div><strong>1 place</strong><span>for your care journey</span></div></section><section className="services-section"><div className="section-heading"><div className="eyebrow">A better way to care</div><h2>Everything you need to take the next step.</h2></div><div className="service-grid"><article><span className="service-number">01</span><h3>Find the right doctor</h3><p>Browse specialisations and see who is available before you book.</p><Link to="/doctors">View specialists →</Link></article><article><span className="service-number">02</span><h3>Book without the back-and-forth</h3><p>Choose a future date and time slot in just a few simple fields.</p><Link to="/booking">Start booking →</Link></article><article><span className="service-number">03</span><h3>Keep visits in view</h3><p>See your pending and confirmed appointments together on Home.</p><a href="#appointments">See appointments →</a></article></div></section><section className="appointments-section" id="appointments"><div className="section-heading"><div className="eyebrow">Your care timeline</div><h2>Upcoming visits</h2></div>{appointments.length === 0 ? <p className="message">No appointments yet. Book your first visit to see it here.</p> : <div className="appointment-grid">{appointments.map((appointment) => <AppointmentCard key={appointment.id} {...appointment} />)}</div>}</section></div>
}

export default HomePage
