# Clinic Queue

Live queue system for a walk-in clinic: patients take a ticket online and track the live queue, doctors call the next patient, admins manage the doctor list and adjust the queue.

Portfolio project. Full spec: [`docs/clinic-queue-spec.md`](docs/clinic-queue-spec.md).

## Stack

- **Backend** (`/server`) — Java + Spring Boot, PostgreSQL, WebSocket (STOMP)
- **Frontend** (`/client`) — React + TypeScript, WebSocket (SockJS)

## Status

🚧 In progress — see the task breakdown in the spec (Epic 0–6).

## Running locally

### Prerequisites

- JDK 21
- Node.js 20+
- A running PostgreSQL instance with a `clinic_queue` database and a `clinic_queue_app` user, reachable on `localhost:5433` (adjust `server/src/main/resources/application.properties` if yours differs). Flyway manages the schema inside it on startup, but doesn't create the database/user themselves — create those first.

### Backend

```
cd server
DB_PASSWORD=<password> ./gradlew bootRun   # Windows PowerShell: $env:DB_PASSWORD="<password>"; .\gradlew.bat bootRun
```

Starts on `http://localhost:8080`; migrations under `server/src/main/resources/db/migration` apply automatically.

### Frontend

```
cd client
npm install
npm run dev
```

Starts on `http://localhost:5173`. CORS on the backend is already configured to allow this origin.