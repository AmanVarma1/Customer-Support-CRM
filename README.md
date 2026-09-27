# Support CRM

A full-stack customer support ticketing CRM

## Tech Stack

- Frontend: React + Vite
- Backend: Python + FastAPI
- Database: SQLite
- API: REST
- Backend Deployment: Railway
- Frontend Deployment: Vercel

## Features

- Create support tickets
- Automatically generate ticket IDs
- View all support tickets
- Search tickets
- Filter tickets by status
- View ticket details
- Update ticket status
- Add notes/activity to tickets
- View ticket activity history

## Project Structure

```text
CRM/
├── Backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .env.example
└── README.md
```
