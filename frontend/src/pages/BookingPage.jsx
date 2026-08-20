import { useEffect, useState } from 'react'
import AppointmentCard from '../components/AppointmentCard.jsx'

function BookingPage() {
  const [formData, setFormData] = useState({ patientName: '', doctorName: '', date: '', timeSlot: '' })
  const [doctors, setDoctors] = useState([])
  const [submitted, setSubmitted] = useState(null)
  const [bookingError, setBookingError] = useState('')

  const today = new Date()
  const minimumDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  useEffect(() => { fetch('/api/v1/doctors').then((response) => response.json()).then((result) => setDoctors(result.data)).catch(() => setDoctors([])) }, [])
  const updateField = (event) => setFormData({ ...formData, [event.target.name]: event.target.value })
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (formData.date < minimumDate) {
      setBookingError('Please choose today or a future date.')
      return
    }
    setBookingError('')
    const response = await fetch('/api/v1/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, status: 'pending' }) })
    const result = await response.json()
    if (response.ok) setSubmitted(result.data)
  }

  return <div className="page booking-page"><div className="booking-shell"><aside className="booking-intro"><div className="eyebrow">New appointment</div><h2>Book your visit</h2><p>Choose a doctor and a time that works for you. Your appointment will be saved as pending until it is confirmed.</p><div className="booking-points"><span>01</span><div><strong>Pick your specialist</strong><small>Browse doctors from our care team.</small></div><span>02</span><div><strong>Choose your time</strong><small>Only today and future dates are available.</small></div></div></aside><div><form className="form-panel form-grid" onSubmit={handleSubmit}><div className="form-title"><strong>Appointment details</strong><span>All fields are required</span></div><label>Patient name<input name="patientName" value={formData.patientName} onChange={updateField} required placeholder="e.g. Priya Shah" /></label><label>Doctor<select name="doctorName" value={formData.doctorName} onChange={updateField} required><option value="">Choose a doctor</option>{doctors.map((doctor) => <option key={doctor.id} value={doctor.name}>{doctor.name} - {doctor.specialisation}</option>)}</select></label><div className="form-row"><label>Date<input type="date" name="date" value={formData.date} min={minimumDate} onChange={updateField} required /></label><label>Time slot<select name="timeSlot" value={formData.timeSlot} onChange={updateField} required><option value="">Choose a time</option><option>09:00 AM</option><option>11:30 AM</option><option>02:00 PM</option><option>04:30 PM</option></select></label></div>{bookingError && <p className="message error">{bookingError}</p>}<button className="button booking-submit" type="submit">Confirm booking <span>→</span></button></form>{submitted && <div className="booking-result"><div className="eyebrow">Submitted successfully</div><AppointmentCard {...submitted} /></div>}</div></div></div>
}

export default BookingPage
