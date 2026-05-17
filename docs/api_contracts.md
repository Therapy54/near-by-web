---
name: api-contracts
description: Defines the complete API  request/response  system between frontend and backend.
---

# API Contract System

This file is the single source of truth for all API communicatio.

It defines how frontend and backend interact and MUST be strictly followed by all implementations.

---

# Core Principle

The API is a strict contract boundary.
No implementation may deviate from this specification.

---

# Contract Scope

This file defines:

- HTTP endpoints
- Request structure
- Response structure
- Authentication rules
- Versioning rules

It does NOT define:

- Business logic implementation
- Database schema
- UI behavior

---

# Global API Rules

- All endpoints require authentication
- All requests must be validated before execution
- All responses must follow the standard format below
- Clients cannot directly mutate system state

---

# Standard API Response (Single Contract)

All API responses MUST follow this structure regardless of success or failure.

```json
{
  "success": "boolean",
  "data": "object | null",
  "error": "object | null",
  "request_id": "string"
}

