require('dotenv').config()
const mongoose = require('mongoose')
const Patient = require('./models/Patient')
const Doctor = require('./models/Doctor')
const Appointment = require('./models/Appointment')

function validationErrors(error) {
  return Object.values(error.errors).map((item) => ({ field: item.path, message: item.message }))
}

async function runMongoDemo() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required in backend/.env')
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully')
    const patient = await Patient.create({ name: 'Asha Patel', email: `asha-${Date.now()}@example.com`, bloodGroup: 'O+', age: 21 })
    const doctor = await Doctor.create({ name: 'Dr. Demo Doctor', email: 'demo@example.com', specialisation: 'General Medicine' })
    const appointment = await Appointment.create({ patientId: patient._id, doctorId: doctor._id, date: '2026-09-01', timeSlot: '10:00 AM', reason: 'Routine check-up' })
    console.log('Created patient:', patient)
    console.log('Created doctor:', doctor)
    console.log('Created appointment:', appointment)

    // These examples demonstrate the requested validation failures.
    const examples = [
      new Patient({ email: 'missing-name@example.com' }),
      new Patient({ name: 'Test', email: 'invalid-group@example.com', bloodGroup: 'X' }),
      new Appointment({ patientId: patient._id, doctorId: doctor._id, date: '2026-09-01', timeSlot: '11:00 AM', status: 'waiting' }),
      new Appointment({ patientId: patient._id, doctorId: doctor._id, date: '2026-09-01', timeSlot: '11:00 AM', reason: 'x'.repeat(301) }),
    ]
    examples.forEach((example) => { const error = example.validateSync(); if (error) console.log(JSON.stringify({ success: false, message: 'Validation failed', errors: validationErrors(error) }, null, 2)) })
  } catch (error) {
    if (error.name === 'ValidationError') console.error(JSON.stringify({ success: false, message: 'Validation failed', errors: validationErrors(error) }, null, 2))
    else console.error('MongoDB operation failed:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}

runMongoDemo()
