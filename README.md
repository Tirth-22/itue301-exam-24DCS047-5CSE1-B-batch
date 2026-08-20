# Hospital Appointment System - Set A

A beginner-friendly hospital appointment application built for the Set A practical examination.

- Frontend: React, Vite, React Router, Fetch
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose, dotenv

## Project structure

```text
frontend/   React and Vite application
backend/    Express API and Mongoose models/demo
.env.example
.gitignore
README.md
```

## Frontend setup

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal. The Vite development proxy forwards `/api` requests to `http://localhost:5000`.

## Backend setup

Open a second terminal:

```powershell
cd backend
npm install
npm start
```

The backend can also be started with:

```powershell
node server.js
```

## MongoDB setup

Copy the example environment file value into `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/hospital_appointment_db
```

For MongoDB Atlas, replace the value with the Atlas connection string. Never commit `backend/.env`.

The Express API starts with the in-memory doctors list and in-memory fallback appointments. When `MONGO_URI` is available, new appointments submitted through the API are also saved as linked Patient, Doctor, and Appointment documents in MongoDB. The appointments returned to the frontend are read from MongoDB.

## Required environment variables

The backend requires this variable in `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

## API endpoints

Base URL:

```text
http://localhost:5000
```

| Method | Endpoint | Success |
| --- | --- | --- |
| GET | `/api/v1/doctors` | 200 |
| GET | `/api/v1/appointments` | 200 |
| POST | `/api/v1/appointments` | 201 |

Postman or Thunder Client POST body:

```json
{
	"patientName": "Asha Patel",
	"doctorName": "Dr. Meera Patel",
	"date": "2026-09-01",
	"timeSlot": "10:00 AM"
}
```

The server logs every request using this format:

```text
[GET] /api/v1/doctors [2026-08-20T10:15:20.000Z]
```

## MongoDB demonstration

Run the separate Task 5 demonstration:

```powershell
cd backend
npm run mongo-demo
```

It connects using `MONGO_URI`, creates a Patient, Doctor, and Appointment using Mongoose references, and prints the created documents. In MongoDB Compass, refresh `hospital_appointment_db` and open the `patients`, `doctors`, and `appointments` collections.

The demonstration also shows validation failures for:

- Missing patient name
- Invalid blood group
- Invalid appointment status
- Reason longer than 300 characters

## Viva summary

- Task 1: reusable React pages/components and status-based appointment cards.
- Task 2: React Router navigation and controlled booking form state.
- Task 3: Express REST endpoints, global request logger, and structured error middleware.
- Task 4: Doctors page loads API data with `useEffect`, `fetch`, loading, and error states.
- Task 5: dotenv, Mongoose schemas, ObjectId references, database inserts, and validation.
