Audio Transcription Web App(Speech To Text)
A full-stack web application that allows users to upload or record audio, fetch AI-generated transcriptions, manage transcription history, and handle user authentication with JWT-based login and registration.

Project Structure
```bash
/
├── client/         # React frontend (Vite + TailwindCSS + Redux)
├── server/         # Express.js backend (Node.js + MongoDB + JWT)
```
Features:
User Authentication (Login / Register with JWT)

Audio Upload & Transcription

Audio History Management (View / Delete)

Record and Transcribe audio in-browser

Token Refresh with Access/Refresh JWT

Responsive UI with Tailwind CSS

Secure HTTP-only cookies & CORS setup

Tech Stack:
Frontend:
React 19 + Vite

Redux Toolkit

TailwindCSS

React Router v7

Axios

React Hot Toast

Backend:
Node.js + Express

MongoDB with Mongoose

JWT for Authentication

Cloudinary for audio storage (optional)

Helmet, Morgan, CORS, dotenv

Getting Started:
Clone the Repository:
```bash
git clone https://github.com/ErRahulPanchta/SpeechToText-Frontend
cd SpeechToText-Frontend
```

Frontend Setup (client/):
Install Dependencies
```bash
cd client
npm install
```

Create .env File
VITE_BACKEND_URL=http://localhost:8080

Run Development Server:
```bash
npm run dev
```
Backend Setup (server/):
Install Dependencies
```bash
cd server
npm install
```

Create .env File
PORT=8080
MONGO_URL=mongodb://localhost:27017/your-db-name
SECRET_KEY_ACCESS_TOKEN=yourAccessSecret
SECRET_KEY_REFRESH_TOKEN=yourRefreshSecret
FRONTEND_URL=http://localhost:5173

Run Development Server
```bash
npm run dev
```
API Endpoints:
Auth (/user)
Method	Endpoint	      Description
POST	/register	      Register a new user
POST	/login	Login     user
GET	    /user-details	  Get logged-in user info
GET	    /refresh-token	  Refresh access token
POST	/logout	Logout    user

Audio (/audio):
Method	  Endpoint	         Description
POST	  /upload	         Upload audio file
GET	      /:id	             Get transcript by audio ID
GET	      /all	             Get all audio history
DELETE	  /delete/:audioId	 Delete audio by ID

Deployment:
Frontend (Vercel / Netlify)
Build the project:

```bash
npm run build
```
Deploy dist/ folder.

Backend (Render / Railway / VPS):
Set environment variables in deployment dashboard.

Make sure MongoDB is accessible remotely (e.g. use MongoDB Atlas).

Start the server normally.

Token Logic:
Access Token (expires in 1 hour)

Refresh Token (long-lived)

Tokens stored in localStorage (can be moved to HttpOnly cookies for better security)

Auto-refresh handled via Axios interceptor

To-Do:
 Add recording functionality in frontend

 Better error UI and loading states

 File format validation

 Role-based user handling (future scope)

Author:
Made with ❤️ by [Er Rahul Panchta]