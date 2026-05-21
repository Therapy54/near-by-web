# Verification Process & Stability Protocols

No code change is considered "stable" or "complete" until it has undergone a rigorous testing, verification and documentationprocess.

## 1. Mandatory Build Checks

Before every final delivery, the following commands must be run and verified:

### Frontend
- Must pass with zero type errors.
- Must pass with zero prerender errors.
- All pages must generate successfully.

### Backend
- Must compile with zero TypeScript or any other errors.

## 2. Pre-Change Audit

Before modifying any existing file, the agent must:
1. Read the file in full to understand its current state.
2. Check if the file references any other files that may be affected.
3. Confirm the change does not break the Isolation principle (see `architecture.md`).

## 3. Post-Change Verification

After any code addition or modification:
1. Write tests and verification scripts e.g unit tests, integration tests, api tests etc to verify the changes and that they meet the requirements.
2. Run the relevant build command(s) immediately.
3. If errors occur, fix them before reporting the task as complete.
4. Do NOT leave errors for the next session to fix.

## 4. Convention Audit

Every file touched during a task must be checked for compliance with `coding_standards.md`:
- `let` instead of `const` for variable declarations.
- Newline-before-brace formatting.

Non-compliant code in any **touched** file must be refactored to comply.

## 5. Zero Hallucination Policy

Agents must NEVER assume a file exists or has certain content without verifying it first using `view_file` or `list_dir`.
