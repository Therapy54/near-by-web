# Coding Standards & Conventions

These are the personal coding standards established for the Near-By project. They must be followed in all files (TypeScript, JavaScript).

## 1. Variable Declarations

- **Prefer `let` over `const`**: Unless a library or third-party API strictly requires `const` (e.g., enum-like objects), always use `let` for variable declarations.
- **No `var`**: `var` is never used. Only `let` is permitted for mutable bindings.

### ✅ Correct
```typescript
let PORT = process.env.PORT || 4500;
let user = await prisma.user.findUnique({ where: { id } });
```

### ❌ Incorrect
```typescript
const PORT = process.env.PORT || 4500;
const user = await prisma.user.findUnique({ where: { id } });
```

## 2. Statement Blocks Formatting

`if`, `else`, `for`, `while`, `try`, `catch`, and `finally` e.t.c.

### ✅ Correct and Prefered
```typescript
if (useEmulators) {
  admin.initializeApp({ projectId: 'demo' });
}
else {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

try {
  console.log("Codes!");
}
catch(err) {
  console.log("Error occured");
}
```

### ❌ Incorrect
```typescript
if (useEmulators) {
  admin.initializeApp({ projectId: 'demo' });
} else {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
```

## 3. Function Declarations

- Use `let` with arrow functions for exported service functions and utilities.

### ✅ Correct
```typescript
export let getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

### ❌ Incorrect
```typescript
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

## 4. Enforcement

All code added or modified in this project — by humans or AI agents — must conform to these standards. Agents must refactor any non-compliant code they encounter to match these rules during their work.
