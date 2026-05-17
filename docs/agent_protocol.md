# Agent Protocol: Instructions for AI Agents

This protocol defines the mandatory workflow for any AI agent interacting with the Near-By project.

## 1. Contextual Awareness

- **READ FIRST**: You MUST read ALL files in `docs/skills/` before proposing or implementing any changes.
- **Check KIs**: The Antigravity system registers these rules as Knowledge Items (KIs). They will be available in your context at session start.
- **Verify State**: NEVER assume the state of any file. Always `view_file` or `list_dir` before editing.

## 2. Mandatory File Order Before Any Work

1. `docs/skills/architecture.md` — Understand the system structure.
2. `docs/skills/coding_standards.md` — Know the formatting rules.
3. `docs/skills/verification_process.md` — Know what "done" means.
4. This file — Confirm your protocol.

## 3. Non-Negotiable Rules

| Rule | Detail |
|---|---|
| `let` over `const` | All variable declarations use `let` unless a library forces `const` |
| New statement blocks | `if`, `else`, `try`, `catch` blocks always start on a new line |
| Build verification | Every session ends with a passing build in both frontend and backend |
| Zero assumption | Never write code without reading the file it modifies first |
| Isolation | Frontend never directly touches PostgreSQL or Firestore |
| Thin routes | Route files only handle validation and response; all logic must belong to their own files

## 4. Prohibited Actions

- ❌ Do NOT introduce `const` for variables you control.
- ❌ Do NOT inline `}` on the same line as `if`/`else`/`try`/`catch`.
- ❌ Do NOT add direct Prisma/PostgreSQL queries in frontend code.
- ❌ Do NOT skip the build verification step.
- ❌ Do NOT leave a session with broken TypeScript errors or code or project errors.

## 5. When in Doubt

If you are unsure about any architectural decision, check the `docs/skills/` files before proceeding. If the answer is still unclear, ask the user rather than guessing.
