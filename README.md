# Support CRM

A full-stack customer support ticketing CRM built with React, FastAPI, and SQLite.

## Live Application

**Frontend:**
https://frontend-production-34f8.up.railway.app

**Backend API:**
https://customer-support-crm-production-6de4.up.railway.app

**API Documentation:**
https://customer-support-crm-production-6de4.up.railway.app/docs

---

## Features

- Create support tickets
- Automatically generate ticket IDs and timestamps
- View all support tickets
- Search tickets by customer name, ticket ID, email, and description
- Filter tickets by status
- View detailed ticket information
- Update ticket status
- Add notes/comments to tickets
- View ticket activity history
- Persistent data storage using SQLite

### Ticket Statuses

- Open
- In Progress
- Closed

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- REST API

### Database

- SQLite

### Deployment

- Railway

---

## Project Structure

```text
CRM/
│
├── Backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── tickets.py
│   │   │
│   │   ├── __init__.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .env.example
│
├── .env.example
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Python 3.11+
- Node.js
- npm
- Git

---

## Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Create a virtual environment:

### Windows

```bash
python -m venv .venv
```

Activate it:

```bash
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI development server:

```bash
fastapi dev main.py
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Environment Variables

The frontend uses the following environment variable:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For production, the Railway frontend service uses the deployed backend URL:

```env
VITE_API_URL=https://customer-support-crm-production-6de4.up.railway.app
```

The `.env` file should **not** be committed to GitHub.

Use `.env.example` to document required environment variables.

---

## API Endpoints

### Create Ticket

```http
POST /api/tickets/
```

Creates a new support ticket.

### List Tickets

```http
GET /api/tickets/
```

Returns all tickets.

Supports search and status filtering.

### Get Ticket Details

```http
GET /api/tickets/{ticket_id}
```

Returns detailed information for a specific ticket, including activity/notes.

### Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

Updates the ticket status and/or adds a note.

---

## Example Ticket Data

A ticket contains information such as:

```text
Ticket ID
Customer Name
Customer Email
Issue Title
Description
Status
Created At
Updated At
Notes / Activity
```

---

## Deployment

The application is deployed using Railway.

The project uses separate Railway services for:

1. **Backend**
   - Root directory: `/Backend`
   - FastAPI application
   - Uvicorn production server

2. **Frontend**
   - Root directory: `/frontend`
   - React/Vite application
   - Served using `serve`

### Production Backend Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Production Frontend

The frontend is built using:

```bash
npm run build
```

and served using:

```bash
npm start
```

The `start` script uses:

```bash
serve --single --listen $PORT dist
```

The `--single` option allows React Router routes to work correctly in the deployed single-page application.

---

## Database

The application uses SQLite for persistent ticket data.

The database is managed through SQLAlchemy models and CRUD operations in the FastAPI backend.

---

## API Documentation

When the backend is running, FastAPI provides interactive API documentation through Swagger UI:

```text
http://127.0.0.1:8000/docs
```

The deployed API documentation is available at:

https://customer-support-crm-production-6de4.up.railway.app/docs

---

## Development Workflow

### Start Backend

```bash
cd Backend
.venv\Scripts\activate
fastapi dev main.py
```

### Start Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## GitHub Repository

Source code:

https://github.com/AmanVarma1/Customer-Support-CRM

---

## Project Goal

This project was built as a full-stack Support CRM to demonstrate:

- REST API development
- Database design and persistence
- React frontend development
- Search and filtering
- Ticket status management
- Activity tracking
- Frontend/backend integration
- Production deployment
  s
