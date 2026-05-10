# Concert Ticket System

A full-stack web application for managing concert tickets, built with Next.js (frontend) and NestJS (backend).

## Requirements

Based on the assignment specifications, this system includes the following key features:

### User Features
- User registration and authentication (JWT-based)
- Browse and search concerts/events
- View concert details (venue, date, ticket types)
- Book and purchase tickets
- User dashboard for managing bookings
- Payment integration (Stripe/PayPal)
- Digital ticket generation (QR codes)

### Admin Features
- Admin panel for managing concerts
- User management
- Ticket inventory management
- Sales analytics and reports

### Technical Stack
- **Frontend**: Next.js with TypeScript, Tailwind CSS, ESLint
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL (recommended)
- **Authentication**: JWT
- **Payment**: Stripe integration
- **Deployment**: Docker, Vercel/AWS

## Design
View the UI/UX design on Figma: [Full-Stack Developer Design](https://www.figma.com/design/fYPlbS6c5i7tlx6buHWY5w/Full-Stack-Developer?node-id=0-1&t=E8VNeo0nAayAfbiL-1)

## Project Structure
```
concert-ticket-system/
├── backend/          # NestJS API server
├── frontend/         # Next.js web application
├── spec requirements/ # Assignment specifications
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL (for database)

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000 and backend on http://localhost:3001 (or as configured).

## Development
- Follow the requirements in the spec requirements folder
- Implement features incrementally
- Ensure proper error handling and validation
- Add unit and integration tests
- Use TypeScript for type safety

## Deployment
- Frontend: Deploy to Vercel or Netlify
- Backend: Deploy to Heroku, AWS, or similar
- Database: Use managed PostgreSQL service