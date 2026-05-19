-- Recreate the User table (Prisma-free, raw SQL)
-- Matches the schema previously defined in prisma/schema.prisma

CREATE TABLE "User" (
  id          VARCHAR(255) PRIMARY KEY,
  firebaseUid VARCHAR(255) UNIQUE NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  displayName VARCHAR(255) NOT NULL,
  createdAt   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updatedAt   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
