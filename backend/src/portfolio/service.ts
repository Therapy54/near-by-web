import { query } from '../shared/db/pool';

export let createPortfolioItem = async (userId: string, data: {
  title: string;
  description?: string | null;
  mediaUrl?: string | null;
  mediaType?: 'image' | 'video' | 'document' | null;
  tags?: string[] | null;
  link?: string | null;
}) => {
  let result = await query(
    `INSERT INTO "Portfolio" (userid, title, description, mediaurl, mediatype, tags, link)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, userid, title, description, mediaurl, mediatype, tags, link, createdat, updatedat`,
    [
      userId,
      data.title,
      data.description || null,
      data.mediaUrl || null,
      data.mediaType || null,
      data.tags || [],
      data.link || null,
    ]
  );
  return result.rows[0];
};

export let getPortfolioItems = async (userId: string) => {
  let result = await query(
    `SELECT id, userid, title, description, mediaurl, mediatype, tags, link, createdat, updatedat
     FROM "Portfolio"
     WHERE userid = $1
     ORDER BY createdat DESC`,
    [userId]
  );
  return result.rows;
};

export let getPortfolioItemById = async (itemId: string) => {
  let result = await query(
    `SELECT id, userid, title, description, mediaurl, mediatype, tags, link, createdat, updatedat
     FROM "Portfolio"
     WHERE id = $1`,
    [itemId]
  );
  return result.rows[0] || null;
};

export let updatePortfolioItem = async (itemId: string, userId: string, data: {
  title?: string;
  description?: string | null;
  mediaUrl?: string | null;
  mediaType?: 'image' | 'video' | 'document' | null;
  tags?: string[] | null;
  link?: string | null;
}) => {
  let fields: string[] = [];
  let values: any[] = [];
  let setIndex = 1;

  if (data.title !== undefined) {
    fields.push(`title = $${setIndex}`);
    values.push(data.title);
    setIndex++;
  }
  if (data.description !== undefined) {
    fields.push(`description = $${setIndex}`);
    values.push(data.description);
    setIndex++;
  }
  if (data.mediaUrl !== undefined) {
    fields.push(`mediaurl = $${setIndex}`);
    values.push(data.mediaUrl);
    setIndex++;
  }
  if (data.mediaType !== undefined) {
    fields.push(`mediatype = $${setIndex}`);
    values.push(data.mediaType);
    setIndex++;
  }
  if (data.tags !== undefined) {
    fields.push(`tags = $${setIndex}`);
    values.push(data.tags);
    setIndex++;
  }
  if (data.link !== undefined) {
    fields.push(`link = $${setIndex}`);
    values.push(data.link);
    setIndex++;
  }

  if (fields.length === 0) {
    return getPortfolioItemById(itemId);
  }

  fields.push(`updatedat = $${setIndex}`);
  values.push(new Date());
  values.push(userId);
  values.push(itemId);

  let result = await query(
    `UPDATE "Portfolio" SET ${fields.join(', ')} WHERE userid = $${setIndex + 1} AND id = $${setIndex + 2}
     RETURNING id, userid, title, description, mediaurl, mediatype, tags, link, createdat, updatedat`,
    values
  );
  return result.rows[0];
};

export let deletePortfolioItem = async (itemId: string, userId: string) => {
  let result = await query(
    `DELETE FROM "Portfolio" WHERE id = $1 AND userid = $2 RETURNING id`,
    [itemId, userId]
  );
  return (result.rowCount ?? 0) > 0;
};