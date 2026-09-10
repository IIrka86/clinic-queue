# Branch/Task Numbering (CLQ-*)

Branch naming convention: `CLQ-<n>`. Numbers are assigned once, in this fixed order: all epics first (ascending), then all tasks within epics (ascending, in spec order). See `docs/clinic-queue-spec.md` for full task descriptions.

Epic order: Design System (Epic 1) comes right after Infrastructure (Epic 0) and before Auth — base UI components are needed before building any actual pages.

## Epics (CLQ-1 … CLQ-7)

| # | Epic |
|---|---|
| CLQ-1 | Epic 0 — Infrastructure |
| CLQ-2 | Epic 1 — Design System and Polish |
| CLQ-3 | Epic 2 — Auth and Roles |
| CLQ-4 | Epic 3 — Doctor + Ticket Model and Basic Queue |
| CLQ-5 | Epic 4 — Real-time Queue (WebSocket) |
| CLQ-6 | Epic 5 — Doctor Dashboard |
| CLQ-7 | Epic 6 — Admin Panel |

## Tasks (CLQ-8 … CLQ-47)

### Epic 0 — Infrastructure
- CLQ-8 — Backend: Initialize Spring Boot project (Gradle), modules: web, security, data-jpa, websocket
- CLQ-9 — Backend: Set up the database (PostgreSQL), baseline migrations (Flyway)
- CLQ-10 — Backend: Configure CORS and local-dev settings for the frontend
- CLQ-11 — Frontend: Initialize React + TS project (Vite)
- CLQ-12 — Frontend: Set up routing (react-router), base folder structure
- CLQ-13 — Frontend: Wire up STOMP/SockJS client
- CLQ-14 — Shared: Monorepo structure `/server`, `/client`
- CLQ-15 — Shared: `git init`, first commit, GitHub repository
- CLQ-16 — Shared: README with project description and run instructions

### Epic 1 — Design System and Polish
- CLQ-17 — Frontend: Base components (Button, Card, Badge, TicketNumberDisplay, QueueList)
- CLQ-18 — Frontend: Apply color scheme and typography app-wide
- CLQ-19 — Frontend: Responsiveness

### Epic 2 — Auth and Roles
- CLQ-20 — Backend: User entity (username, passwordHash, role), optional link to Doctor
- CLQ-21 — Backend: Spring Security + JWT: `/api/auth/login`
- CLQ-22 — Backend: Role-based endpoint protection (`@PreAuthorize`)
- CLQ-23 — Frontend: Login form
- CLQ-24 — Frontend: Token storage, role-protected routes
- CLQ-25 — Frontend: Post-login redirect based on role

### Epic 3 — Doctor + Ticket Model and Basic Queue
- CLQ-26 — Backend: Doctor, Ticket entities, status enums
- CLQ-27 — Backend: `GET /api/doctors` (active only)
- CLQ-28 — Backend: `POST /api/tickets` — creation + "any available doctor" logic
- CLQ-29 — Backend: `GET /api/tickets/{id}` — status and queue position
- CLQ-30 — Backend: Daily numbering reset logic
- CLQ-31 — Frontend: Public doctor-selection page
- CLQ-32 — Frontend: Name + phone entry form
- CLQ-33 — Frontend: Ticket confirmation page with assigned number

### Epic 4 — Real-time Queue (WebSocket)
- CLQ-34 — Backend: STOMP endpoint configuration, `/topic/queue/{doctorId}`
- CLQ-35 — Backend: Publish `ticket_created`, `ticket_called`, `ticket_completed` events
- CLQ-36 — Backend: `POST /api/doctor/queue/next`, `POST /api/doctor/tickets/{id}/complete`
- CLQ-37 — Frontend: Live-tracking page (subscribe to queue topic)
- CLQ-38 — Frontend: Polling fallback via `GET /api/tickets/{id}`

### Epic 5 — Doctor Dashboard
- CLQ-39 — Backend: `GET /api/doctor/queue` — doctor's queue for today
- CLQ-40 — Frontend: Doctor dashboard (WAITING list, Call next, Complete visit)
- CLQ-41 — Frontend: Visual indicator for currently called patient

### Epic 6 — Admin Panel
- CLQ-42 — Backend: `/api/admin/doctors` CRUD, toggle active
- CLQ-43 — Backend: `GET /api/admin/queues` — aggregated overview
- CLQ-44 — Backend: `PATCH /api/admin/tickets/{id}` — manual adjustment
- CLQ-45 — Frontend: Doctor management page
- CLQ-46 — Frontend: Overview page for all queues
- CLQ-47 — Frontend: Manual-adjustment UI for a single ticket