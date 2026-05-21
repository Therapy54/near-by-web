-- Create the Profile table
-- Extends the User table with profile-specific fields
-- All columns use lowercase per project PostgreSQL naming rules

CREATE TABLE "Profile" (
  id          VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userid      VARCHAR(255) NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE CASCADE,
  bio         TEXT,
  location    TEXT,
  avatarurl   TEXT,
  availability TEXT,
  skills      TEXT[],
  sociallinks JSONB,
  createdat   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updatedat   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_profile_userid ON "Profile"(userid);
CREATE INDEX idx_profile_skills ON "Profile" USING GIN(skills);
