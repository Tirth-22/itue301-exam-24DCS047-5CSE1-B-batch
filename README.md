# Hospital Appointment System - Set A

`frontend/` is the React/Vite application. `backend/` is the Express API and separate Mongoose demonstration.

## Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal. The Vite proxy forwards `/api` requests to `http://localhost:5000`.

## Backend
```powershell
cd backend
npm install
npm start
```
The backend also starts with `node server.js`.

## MongoDB setup
Copy `.env.example` values into `backend/.env` and set `MONGO_URI` to a MongoDB Atlas or local connection string. Verify the same database name in MongoDB Compass or Atlas. Run the separate demonstration with `npm run mongo-demo`; it creates a Patient, Doctor, and Appointment using Mongoose references and prints them. It also prints safe validation examples for missing name, invalid blood group/status, and a reason over 300 characters.

## API endpoints
- `GET /api/v1/doctors` - list in-memory doctors (200)
- `GET /api/v1/appointments` - list in-memory appointments (200)
- `POST /api/v1/appointments` - create an in-memory pending appointment (201)

Example POST body for Postman/Thunder Client:
```json
{"patientName":"Asha Patel","doctorName":"Dr. Meera Patel","date":"2026-09-01","timeSlot":"10:00 AM"}
```

Sample MongoDB documents use Patient `{ "name": "Asha Patel", "bloodGroup": "O+" }`, Doctor `{ "name": "Dr. Demo Doctor", "specialisation": "General Medicine" }`, and Appointment `{ "patientId": "<Patient ObjectId>", "doctorId": "<Doctor ObjectId>", "status": "pending" }`.

## Viva map
Task 1 uses reusable components and status classes. Task 2 uses `BrowserRouter`, `Link`, `useState`, and controlled form inputs. Tasks 3-4 use Express, a request logger, in-memory arrays, and `useEffect`/`fetch`. Task 5 uses dotenv, Mongoose schemas, references, inserts, and validation handling separately from the API.
