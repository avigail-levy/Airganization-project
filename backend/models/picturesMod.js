import connection from '../database/db.js';

async function getPicturesByIdVacation(vacation_id) {
  try {
    const sql = 'SELECT * FROM pictures where package_id = ?';
    const [rows] = await connection.query(sql, [vacation_id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {
     getPicturesByIdVacation
     };

