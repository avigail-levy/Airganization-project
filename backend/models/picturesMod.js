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

export default { getPicturesByPackageId };
