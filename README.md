# 🎭 Concert Ticket System

A full-stack application for concert ticket management with **Next.js**, **NestJS**, and **PostgreSQL**.

---

## ✨ Features

| User | Admin |
|------|-------|
| Browse concerts | Create concerts |
| Reserve seats | Delete concerts |
| Cancel reservations | Statistics dashboard |

**Security:** JWT authentication + Role-based access control

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Docker & Docker Compose (or Node.js 18+ + PostgreSQL 15+)

### Docker Setup
```bash
git clone <repository-url>
cd concert-ticket-system
cp .env.example .env
docker-compose up --build
```

**Access:** Frontend: http://localhost:3000 | Backend: http://localhost:3001

### Local Setup
```bash
# Backend
cd backend && npm install && npm run start:dev

# Frontend  
cd frontend && npm install && npm run dev

# Database (Docker)
docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=concert_ticket -p 5432:5432 -d postgres:15-alpine
```

---

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** NestJS 10, TypeScript, JWT
- **Database:** PostgreSQL 15 (Docker)
- **ORM:** TypeORM

---

## 📁 Project Structure

```
concert-ticket-system/
├── backend/              # NestJS API (src/auth, concerts, reservations, users)
├── frontend/             # Next.js app (app/auth, user, admin pages)
├── docker-compose.yml    # Docker services
└── README.md            # This file
```

---

## 🔌 API Endpoints

```
Auth:       POST /api/auth/login | register
Concerts:   GET /api/concerts | POST /api/concerts (admin) | DELETE /:id (admin)
Reservations:   GET /api/reservations | POST (reserve) | PUT /:id/cancel
            GET /api/reservations/stats (admin) | history (admin)
```

---

## 🏗️ Architecture

```
Browser → Next.js (port 3000)
  ↓ (HTTP + JWT)
NestJS API (port 3001)
  ↓ (TypeORM)
PostgreSQL (port 5432)
```

**Data Models:**
- `users` (id, email, password, role)
- `concerts` (id, name, totalSeats, description)
- `reservations` (reservation records: id, userId, concertId, status, createdAt)
- `reservation_actions` (reservation action log: id, reservationId, action, timestamp)

---

## 📚 Dependencies

### Core Packages
| Backend | Frontend | Purpose |
|---------|----------|---------|
| `@nestjs/core` | `next` | Framework |
| `@nestjs/jwt` | `react` | JWT/UI |
| `@nestjs/typeorm` | `tailwindcss` | Database/Styling |
| `typeorm` `pg` | - | PostgreSQL |
| `passport-jwt` | - | Authentication |

---

## 🧪 Testing

```bash
# Backend Unit Tests
cd backend && npm run test

# Backend E2E Tests
npm run test:e2e

# Test 1-Seat Constraint
npm run test -- --testNamePattern="not allow reservation twice"
```

---

## 🔑 Environment

**Docker Setup:**
```bash
cp .env.example .env
# Uses: postgres (host), concert_ticket (db)
```

**Local Development:**
```bash
cd backend
cp .env.example .env
# Edit .env with: localhost (host), local postgres credentials
```

See `.env.example` for all variables (JWT, database, ports, etc.)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `docker-compose down` or change port in docker-compose.yml |
| DB connection error | `docker-compose logs postgres` or check .env |
| Module errors | `npm cache clean --force && rm -rf node_modules && npm install` |
| JWT failing | Verify JWT_SECRET in .env is set |

---

## 📖 Common Commands

```bash
# Docker
docker-compose up --build          # Start
docker-compose logs backend        # View logs
docker-compose down -v             # Stop + remove data

# Backend
npm run start:dev                  # Dev server
npm run test                       # Run tests
npm run build                      # Production build

# Frontend
npm run dev                        # Dev server
npm run build                      # Production build
```

---

## ✅ Setup Verification

After setup, verify:
- [ ] `docker-compose ps` shows all running
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend responds: `curl http://localhost:3001/api/health`
- [ ] Can register & login
- [ ] User can reserve (only 1 per concert)
- [ ] Admin can create/delete concerts
- [ ] Reservations appear in history

---

## 📝 Assignment Requirements

| Requirement | Status | Details |
|-----------|--------|---------|
| Full-stack app | ✅ | Next.js + NestJS |
| PostgreSQL + Docker | ✅ | TypeORM + docker-compose |
| User authentication | ✅ | JWT with roles (Admin/User) |
| Concert CRUD | ✅ | Admin create/delete, list |
| Ticket reservation | ✅ | Reserve/cancel with history |
| 1-seat constraint | ✅ | Enforced in ReservationsService |


---
