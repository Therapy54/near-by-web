// Profile service - business logic for profile operations
import { query } from '../shared/db/pool';

export let getProfileByUserId = async (userId: string) => {
  let result = await query(
    `SELECT p.id, p.userid, p.bio, p.location, p.avatarurl, p.availability, p.skills, p.sociallinks, p.createdat, p.updatedat, u.displayname
     FROM "Profile" p
     LEFT JOIN "User" u ON p.userid = u.id
     WHERE p.userid = $1`,
    [userId]
  );
  let row = result.rows[0];
  if (!row) return null;
  return {
    ...row,
    displayName: row.displayname
  };
};

export let createProfile = async (userId: string, data: {
  bio?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  availability?: string | null;
  skills?: string[] | null;
  socialLinks?: Record<string, string> | null;
}) => {
  let result = await query(
    `INSERT INTO "Profile" (userid, bio, location, avatarurl, availability, skills, sociallinks)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, userid, bio, location, avatarurl, availability, skills, sociallinks, createdat, updatedat`,
    [
      userId,
      data.bio || null,
      data.location || null,
      data.avatarUrl || null,
      data.availability || null,
      data.skills || [],
      data.socialLinks || null,
    ]
  );
  return result.rows[0];
};

export let updateProfile = async (userId: string, data: {
  bio?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  availability?: string | null;
  skills?: string[] | null;
  socialLinks?: Record<string, string> | null;
}) => {
  let fields: string[] = [];
  let values: any[] = [];
  let setIndex = 1;

  if (data.bio !== undefined) {
    fields.push(`bio = $${setIndex}`);
    values.push(data.bio);
    setIndex++;
  }
  if (data.location !== undefined) {
    fields.push(`location = $${setIndex}`);
    values.push(data.location);
    setIndex++;
  }
  if (data.avatarUrl !== undefined) {
    fields.push(`avatarurl = $${setIndex}`);
    values.push(data.avatarUrl);
    setIndex++;
  }
  if (data.availability !== undefined) {
    fields.push(`availability = $${setIndex}`);
    values.push(data.availability);
    setIndex++;
  }
  if (data.skills !== undefined) {
    fields.push(`skills = $${setIndex}`);
    values.push(data.skills);
    setIndex++;
  }
  if (data.socialLinks !== undefined) {
    fields.push(`sociallinks = $${setIndex}`);
    values.push(data.socialLinks);
    setIndex++;
  }

  if (fields.length === 0) {
    return getProfileByUserId(userId);
  }

  fields.push(`updatedat = $${setIndex}`);
  values.push(new Date());
  values.push(userId);

  let result = await query(
    `UPDATE "Profile" SET ${fields.join(', ')} WHERE userid = $${setIndex}
     RETURNING id, userid, bio, location, avatarurl, availability, skills, sociallinks, createdat, updatedat`,
    values
  );
  return result.rows[0];
};

export let upsertProfile = async (userId: string, data: {
  bio?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  availability?: string | null;
  skills?: string[] | null;
  socialLinks?: Record<string, string> | null;
}) => {
  let existing = await getProfileByUserId(userId);
  if (existing) {
    return await updateProfile(userId, data);
  }
  return await createProfile(userId, data);
};
