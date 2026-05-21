-- Create Portfolio table for user project showcases
-- Users can upload portfolio items to showcase their work

CREATE TABLE "Portfolio" (
  id          VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  userid      VARCHAR(255) NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  mediaurl    TEXT,
  mediatype   TEXT CHECK (mediatype IN ('image', 'video', 'document')),
  tags        TEXT[],
  link        TEXT,
  createdat   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updatedat   TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_portfolio_userid ON "Portfolio"(userid);
CREATE INDEX idx_portfolio_tags ON "Portfolio" USING GIN(tags);