require('dotenv').config()
const express = require('express')
const requestLogger = require('./middleware/requestLogger')
const mongoose = require('mongoose')
const Patient = require('./models/Patient')
const Doctor = require('./models/Doctor')
const Appointment = require('./models/Appointment')

const app = express()
const PORT = process.env.PORT || 5000

const doctors = [
  { id: 'd1', name: 'Dr. Meera Patel', specialisation: 'Cardiology', available: true },
  { id: 'd2', name: 'Dr. Arjun Shah', specialisation: 'Pediatrics', available: true },
  { id: 'd3', name: 'Dr. Kavya Rao', specialisation: 'Dermatology', available: false },
  { id: 'd4', name: 'Dr. Neha Joshi', specialisation: 'Neurology', available: true },
  { id: 'd5', name: 'Dr. Rohan Mehta', specialisation: 'Orthopedics', available: true },
  { id: 'd6', name: 'Dr. Isha Verma', specialisation: 'Gynecology', available: true },
]
const appointments = []
let mongoReady = false
const mongoConnection = process.env.MONGO_URI
  ? mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 2000 }).then(() => {
    mongoReady = true
    console.log('MongoDB connected successfully')
  }).catch((error) => console.error('MongoDB unavailable; using in-memory data:', error.message))
  : Promise.resolve()

app.use(express.json())
app.use(requestLogger)

app.get('/api/v1/doctors', (request, response) => response.status(200).json({ success: true, data: doctors }))
app.get('/api/v1/appointments', async (request, response) => {
  await mongoConnection
  if (!mongoReady) return response.status(200).json({ success: true, data: appointments })

  const savedAppointments = await Appointment.find().populate('patientId doctorId').sort({ _id: -1 })
  const data = savedAppointments.filter((item) => item.patientId && item.doctorId).map((item) => ({
    id: item._id,
    patientName: item.patientId.name,
    doctorName: item.doctorId.name,
    date: item.date,
    timeSlot: item.timeSlot,
    status: item.status,
  }))
  response.status(200).json({ success: true, data })
})
app.post('/api/v1/appointments', async (request, response) => {
  const { patientName, doctorName, date, timeSlot } = request.body
  if (!patientName || !doctorName || !date || !timeSlot) {
    const error = new Error('patientName, doctorName, date and timeSlot are required')
    error.statusCode = 400
    throw error
  }
  const appointment = { id: `a${appointments.length + 1}`, patientName, doctorName, date, timeSlot, status: 'pending' }
  appointments.push(appointment)

  await mongoConnection
  if (mongoReady) {
    const patient = await Patient.create({
      name: patientName,
      email: `patient-${Date.now()}@example.com`,
    })
    const doctor = await Doctor.findOneAndUpdate(
      { name: doctorName },
      { name: doctorName, specialisation: 'General Medicine', available: true },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    )
    const savedAppointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      date,
      timeSlot,
      status: 'pending',
    })
    appointment.id = savedAppointment._id
  }
  response.status(201).json({ success: true, data: appointment })
})

// Error middleware must be registered last and never exposes stack traces.
app.use((error, request, response, _next) => {
  response.status(error.statusCode || 500).json({ success: false, message: error.statusCode ? error.message : 'Internal server error' })
})

app.listen(PORT, () => console.log(`Hospital API running at http://localhost:${PORT}`))
