# Spec: Live Queue System for a Walk-in Clinic

**Portfolio project.** Stack: Java + Spring Boot (backend) · React + TypeScript (frontend) · WebSocket (STOMP/SockJS) for real-time updates.

---

## 1. Concept

A small commercial clinic with general practitioners who see patients **without prior appointments** (walk-in only). A patient takes a ticket online, gets a live queue view, and an estimate of when to arrive. The doctor calls the next patient from their queue. An admin manages the doctor list and can manually adjust the queue.

---

## 2. Roles

| Role | Access | Key actions |
|---|---|---|
| **Patient** | no login, public section | take a ticket, track the live queue |
| **Doctor** | login (JWT) | view own queue, call next patient, complete visit |
| **Admin** | login (JWT) | manage doctor list, manually adjust the queue |

One shared login form for doctor and admin — role is determined after login (same pattern as the windows-configurator project).

---

## 3. Domain Model

### Doctor
| Field | Type | Notes |
|---|---|---|
| id | UUID | |
| firstName, lastName | String | |
| specialization | String | defaults to "General Practitioner" |
| room | String | office/room number |
| active | Boolean | seeing patients today / disabled from the queue |

### Ticket
| Field | Type | Notes |
|---|---|---|
| id | UUID | |
| number | Int | queue number per doctor, **resets daily** |
| doctorId | FK → Doctor | doctor this ticket is assigned to |
| patientName | String | entered by the patient |
| patientPhone | String | entered by the patient |
| selectionType | Enum: SPECIFIC / ANY | how the patient chose a doctor |
| status | Enum: WAITING, CALLED, IN_PROGRESS, DONE, NO_SHOW | |
| createdAt | DateTime | |
| calledAt | DateTime, nullable | |

> No separate Patient entity for the MVP — denormalized fields on Ticket are enough. Extracting a Patient entity (with visit history) is Post-MVP.

**"Any available doctor" logic**: when a ticket is created with `selectionType = ANY`, the backend picks the active doctor with the fewest WAITING tickets and assigns `doctorId` automatically.

---

## 4. Key Flows

### 4.1 Patient takes a ticket
1. Opens the public page
2. Chooses either a specific doctor from a list OR "any available doctor"
3. Enters name + phone number
4. Receives a ticket with a number and a link/redirect to the tracking page
5. On the tracking page — live status: currently-called number, own position, updated over WebSocket

### 4.2 Doctor sees patients
1. Logs in → sees today's queue (WAITING list)
2. "Call next" → ticket moves to CALLED → WS event broadcast
3. "Start visit" → IN_PROGRESS (can be merged with CALLED for MVP)
4. "Complete visit" → DONE → next available patient can be called

### 4.3 Admin
1. Logs in → sees the doctor list, can toggle active on/off
2. Sees an aggregated overview of all doctors' queues
3. Can manually adjust: skip a ticket, return it to the queue, mark as no-show (NO_SHOW), reassign to another doctor

---

## 5. API

### Public endpoints
- `GET /api/doctors` — list of active doctors
- `POST /api/tickets` — create a ticket `{ doctorId?: UUID, selectionType, patientName, patientPhone }`
- `GET /api/tickets/{id}` — ticket status and queue position
- WS: `SUBSCRIBE /topic/queue/{doctorId}` — live updates for a doctor's queue

### Auth
- `POST /api/auth/login` → JWT

### Doctor (role DOCTOR)
- `GET /api/doctor/queue` — own queue for today
- `POST /api/doctor/queue/next` — call the next patient
- `POST /api/doctor/tickets/{id}/complete` — complete the visit

### Admin (role ADMIN)
- `GET/POST/PATCH /api/admin/doctors` — doctor CRUD, toggle active
- `GET /api/admin/queues` — overview of all doctors' queues
- `PATCH /api/admin/tickets/{id}` — manual status change / reassignment

### WebSocket events
- `ticket_created` — a new ticket entered the queue
- `ticket_called` — next patient called
- `ticket_completed` — visit completed
- `queue_updated` — general queue state update (fallback event)

---

## 6. MVP / Post-MVP Split

**MVP:**
- Taking a ticket (specific doctor or "any available", name + phone)
- Public live queue-tracking page (WebSocket)
- Doctor dashboard: login, call next, complete visit
- Admin: doctor list (on/off) + manual queue adjustment

**Post-MVP:**
- Multiple doctor specializations
- SMS/push notifications ("please come in")
- Priority patients (elderly, urgent cases)
- Statistics (average visit time, daily load)
- Extract Patient into its own entity + visit history
- Hybrid model with scheduled appointments for other specialists

---

## 7. Design System (lightweight starting point for Claude Code)

- **Colors**: neutral base (white/light gray background), one accent color (a calm blue/teal fits the medical theme), separate colors for ticket status (green — "you're up soon", yellow — "waiting", gray — "done")
- **Typography**: one sans-serif font, large size for the ticket number on the tracking page — that's the focal point of the screen
- **Buttons**: primary (take a ticket, call next), secondary (cancel/back), large tap targets — front desk staff may work from a tablet
- **Components**: Card (doctor card in the selection list), Badge (ticket status), Ticket Number Display (large number), Queue List (table for doctor/admin views)

*The final design system as React components is a task for Claude Code at the start of the frontend epic.*

---

## 8. Task Breakdown

### Epic 0 — Infrastructure
**Backend**
- [ ] Initialize Spring Boot project (Gradle/Maven), modules: web, security, data-jpa, websocket
- [ ] Set up the database (PostgreSQL/H2 to start), baseline migrations (Flyway/Liquibase)
- [ ] Configure CORS and basic local-dev settings for the frontend

**Frontend**
- [ ] Initialize React + TS project (Vite)
- [ ] Set up routing (react-router), base folder structure
- [ ] Wire up STOMP/SockJS client

**Shared**
- [ ] Monorepo structure: `/server`, `/client`
- [ ] `git init`, first commit, GitHub repository
- [ ] README with project description and run instructions

---

### Epic 1 — Auth and Roles
**Backend**
- [ ] User entity (username, passwordHash, role: DOCTOR/ADMIN), optional link to Doctor
- [ ] Spring Security + JWT: `/api/auth/login`
- [ ] Role-based endpoint protection (`@PreAuthorize`)

**Frontend**
- [ ] Login form
- [ ] Token storage, role-protected routes
- [ ] Post-login redirect based on role (doctor/admin)

---

### Epic 2 — Doctor + Ticket Model and Basic Queue
**Backend**
- [ ] Doctor, Ticket entities, status enums
- [ ] `GET /api/doctors` (active only)
- [ ] `POST /api/tickets` — ticket creation, including "any available doctor" logic
- [ ] `GET /api/tickets/{id}` — status and queue position
- [ ] Daily numbering reset logic (scheduled job or computed on the fly by date)

**Frontend**
- [ ] Public doctor-selection page (specific / "any available")
- [ ] Name + phone entry form
- [ ] Ticket confirmation page with the assigned number

---

### Epic 3 — Real-time Queue (WebSocket)
**Backend**
- [ ] STOMP endpoint configuration, `/topic/queue/{doctorId}` topics
- [ ] Publish `ticket_created`, `ticket_called`, `ticket_completed` events
- [ ] `POST /api/doctor/queue/next`, `POST /api/doctor/tickets/{id}/complete`

**Frontend**
- [ ] Live-tracking page: subscribe to the queue topic, show current number and patient's position
- [ ] Polling fallback via `GET /api/tickets/{id}` if WS is unavailable

---

### Epic 4 — Doctor Dashboard
**Backend**
- [ ] `GET /api/doctor/queue` — doctor's queue for today

**Frontend**
- [ ] Doctor dashboard: WAITING list, "Call next", "Complete visit" buttons
- [ ] Visual indicator for the currently called patient

---

### Epic 5 — Admin Panel
**Backend**
- [ ] `/api/admin/doctors` CRUD, toggle active
- [ ] `GET /api/admin/queues` — aggregated overview
- [ ] `PATCH /api/admin/tickets/{id}` — manual adjustment (skip, no-show, reassign)

**Frontend**
- [ ] Doctor management page (list, toggle, add)
- [ ] Overview page for all queues
- [ ] Manual-adjustment UI for a single ticket

---

### Epic 6 — Design System and Polish
**Frontend**
- [ ] Base components: Button, Card, Badge, TicketNumberDisplay, QueueList
- [ ] Apply color scheme and typography app-wide
- [ ] Responsiveness (public section — mobile-first, doctor/admin dashboards — desktop/tablet)

---

## 9. Next Steps

1. Bring this file into Claude Code
2. Ask it to scaffold the monorepo structure and `git init` + push to GitHub
3. Work through the epics in order: 0 → 1 → 2 → 3 → 4 → 5 → 6
