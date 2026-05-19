-- Usable view so pgAdmin / unquoted SELECT * works without the named quoting pitfall
CREATE OR REPLACE VIEW users AS
SELECT
  id,
  firebaseuid,
  email,
  displayname,
  createdat,
  updatedat
FROM "User";
