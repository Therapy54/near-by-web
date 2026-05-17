# Architecture: Context-Based Organization

The Near-By project uses this basic architecture for inferability and contextual isolation.

## Purpose

This skill defines the official architectural structure, organizational philosophy, and implementation standards for all AI agents working on this project.

Every AI agent must:

* follow this architecture strictly
* preserve contextual organization
* maintain feature boundaries
* avoid architectural drift
* prioritize simplicity and readability

This architecture exists to ensure:

* clean scalability
* intuitive navigation
* fast onboarding
* consistent implementation
* AI-agent clarity
* maintainable codebases

---

## 1. Directory Structure

### Frontend (`frontend`)
### Backend (`backend`)
### Firebase.emulators (`Firebase-emulators`)

## 2. Key Protocols

- **Isolation**: Frontend must NEVER communicate directly with PostgreSQL or Firebase Firestore for sensitive operations. All such operations must go through the Backend API.

## 3. Port Map

| Ports |
|---|---|
| Frontend (Next.js) | 3000 |
| Backend (Express) | 4500 |
| Firebase Auth Emulator | 4100 |
| Firebase Firestore Emulator | 4200 |
| Firebase Storage Emulator | 4300 |
| Firebase Emulator UI | 4000 |

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js@latest (App Router), TypeScript |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Auth | Firebase Authentication |
| Real-time | Firebase Firestore |
| Media Storage | Firebase Cloud Storage |
| Firebase Emulators | - Local Auth (Port 4100), Local Firestore (Port 4200), Local Storage (Port 4300), UI (Port 4000) |
| API Layer | REST (frontend → backend) |

# Core Philosophy

The project architecture must be:

* simple
* intuitive
* self-explanatory
* domain-driven
* visually understandable
* context-oriented

The structure itself should teach:

* how the product works
* how systems relate
* where features belong
* where developers should begin

A developer or AI agent should understand the platform by simply looking at the folder structure.

---

# Primary Architectural Principle

## Structure by DOMAIN, not by TECHNICAL TYPE

BAD:

```txt
components/
hooks/
services/
controllers/
repositories/
```

This separates related logic across unrelated folders.

GOOD:

```txt
auth/
feed/
listings/
profile/
messaging/
```

This groups all related functionality together.

The product domains are the real architectural units.

---

# Core Architecture Rules

## Rule 1 — Contextual Grouping

All logic related to a feature must live together.

Example:

```txt
listings/
```

should contain:

* listing UI
* listing API
* listing state
* listing hooks
* listing validation
* listing types

NOT scattered globally.

---

## Rule 2 — Shared Must Mean Truly Shared

The `shared/` directory is ONLY for:

* reusable UI primitives
* generic utilities
* global configs
* shared libraries
* global types

Business-specific logic MUST NEVER be placed inside shared.

BAD:

```txt
shared/listings/
shared/feed/
```

GOOD:

```txt
shared/ui/
shared/utils/
shared/config/
```

---

## Rule 3 — Frontend Mirrors Product Experience

Frontend structure should visually reflect:

* user journeys
* platform capabilities
* product systems

A developer should immediately understand:

* what users can do
* how the platform flows
* where major features exist

---

## Rule 4 — Backend Mirrors Frontend Domains

Backend domains should match frontend domains whenever possible.

Example:

Frontend:

```txt
listings/
messaging/
profile/
```

Backend:

```txt
listings/
messaging/
profiles/
```

This creates:

* easier navigation
* easier debugging
* easier onboarding
* easier AI-agent implementation

---

## Rule 5 — Avoid Premature Abstraction

DO NOT:

* over-engineer
* create unnecessary layers
* create deep nesting
* introduce complex patterns too early

Avoid:

* repository overengineering
* unnecessary CQRS
* excessive microservices
* architecture ceremony

Prefer:

* pragmatic simplicity
* readable organization
* direct implementation

---

## Rule 6 — Feature Local by Default

Everything should remain local to the feature unless it is truly reusable globally.

Default mindset:

```txt
feature-local first
shared only when necessary
```

---

# Official Frontend Structure

```txt
src/app/
│
├── auth/
│   ├── pages/
│   ├── ui/
│   ├── api/
│   ├── state/
│   └── hooks/
│
├── onboarding/
│
├── feed/
│   ├── ui/
│   ├── api/
│   ├── state/
│   └── hooks/
│
├── listings/
│   ├── create/
│   ├── details/
│   ├── edit/
│   ├── search/
│   └── ui/
│
├── profile/
│   ├── portfolio/
│   ├── skills/
│   ├── settings/
│   └── ui/
│
├── messaging/
│   ├── chat/
│   ├── calls/
│   ├── sockets/
│   └── ui/
│
├── notifications/
│
├── search/
│
├── shared/
│   ├── ui/
│   ├── lib/
│   ├── types/
│   ├── config/
│   └── utils/
│
└── styles/
```

---

# Frontend Responsibilities

## auth/

Responsible for:

* login
* signup
* sessions
* authentication state
* protected routes

---

## feed/

Responsible for:

* local feed
* global feed
* recommendations
* feed ranking state
* feed rendering

---

## listings/

Responsible for:

* products
* services
* jobs
* rentals
* requests
* listing creation
* listing editing
* listing discovery

---

## profile/

Responsible for:

* user profile
* portfolio
* skills
* settings
* public user identity

---

## messaging/

Responsible for:

* direct messaging
* sockets
* calls
* real-time communication

---

## shared/

Responsible ONLY for:

* reusable UI
* reusable utilities
* global libraries
* configs
* global types

---

# Official Backend Structure

```txt
src/
│
├── auth/
│   ├── routes.ts
│   ├── controller.ts
│   ├── service.ts
│   ├── middleware.ts
│   └── validation.ts
│
├── users/
│
├── profiles/
│
├── listings/
│   ├── routes.ts
│   ├── controller.ts
│   ├── service.ts
│   ├── queries.ts
│   ├── validation.ts
│   └── search.ts
│
├── search/
│
├── feed/
│
├── messaging/
│   ├── websocket.ts
│   ├── service.ts
│   ├── queries.ts
│   └── routes.ts
│
├── notifications/
│
├── moderation/
│
├── shared/
│   ├── db/
│   ├── auth/
│   ├── errors/
│   ├── utils/
│   ├── config/
│   └── middleware/
│
└── server.ts
```

---

# Backend Responsibilities

## routes.ts

Defines API routes.

---

## controller.ts

Handles request/response flow.

---

## service.ts

Contains business logic.

---

## queries.ts

Handles database queries.

---

## validation.ts

Handles schema validation.

---

## websocket.ts

Handles realtime socket logic.

---

# AI Agent Implementation Rules

## Always preserve feature boundaries

Never place unrelated logic inside another feature domain.

BAD:

```txt
messaging/listingSearch.ts
```

GOOD:

```txt
search/
listings/
messaging/
```

---

## Never create random global folders

Avoid:

* misc/
* helpers/
* random/
* commonStuff/

All folders must have:

* clear ownership
* clear responsibility
* clear context

---

## Never duplicate shared systems unnecessarily

Before creating shared utilities:

* confirm multiple domains require them
* confirm they are truly generic

---

## Keep navigation shallow

Avoid excessive nesting.

BAD:

```txt
features/listings/components/forms/create/mobile/
```

GOOD:

```txt
listings/create/
```

---

## Prioritize readability over cleverness

Code organization should optimize:

* understanding
* navigation
* onboarding
* maintainability

NOT architectural impressiveness.

---

# Scaling Philosophy

The architecture should scale naturally by:

* adding domains
* expanding feature folders
* extending existing contexts

NOT by:

* restructuring entire systems
* introducing unnecessary abstractions

---

# Final Principle

The architecture itself is documentation.

A developer or AI agent should:

* open the project
* inspect the structure
* instantly understand the platform

without needing extensive explanation.

This is the official architectural implementation standard for the Global Discovery Platform.

