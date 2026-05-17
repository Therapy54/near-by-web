# Firebase Emulator Configuration

// The emulator suite can be launched in two ways:
// 1. From repo root (recommended): `firebase emulators:start`
// 2. From this directory: `cd firebase.emulators && firebase emulators:start`

// This file documents emulator setup and port assignments.

# Authentication Emulator
AUTH_HOST=localhost
AUTH_PORT=4100

# Firestore Emulator
FIRESTORE_HOST=localhost
FIRESTORE_PORT=4200

# Storage Emulator
STORAGE_HOST=localhost
STORAGE_PORT=4300

# Emulator UI
UI_HOST=localhost
UI_PORT=4000

# Emulator Hub (auto-assigned)
HUB_HOST=localhost
HUB_PORT=4400

# Logging (auto-assigned)
LOGGING_HOST=localhost
LOGGING_PORT=4501

# Export directory for emulator data
EXPORT_DIR=./firebase.emulators/export