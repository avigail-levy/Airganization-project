import connection from '../database/db.js';

async function getPicturesByPackageId(packageId) {
  try {
    const sql = `
      SELECT image_url, alt_text, sort_order
      FROM pictures
      WHERE package_id = ?
      ORDER BY sort_order ASC
    `;
    const [rows] = await connection.query(sql, [packageId]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function addPicture({ package_id, alt_text, image_url, sort_order = 1 }) {
  try {
    const sql = `
      INSERT INTO pictures (package_id, alt_text, image_url, sort_order)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await connection.query(sql, [
      package_id,
      alt_text,
      image_url,
      sort_order,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
}

export default { getPicturesByPackageId, addPicture };
