import connection from '../database/db.js';

async function getTripsByIdVacation(package_id) {
  try {
    const sql = 'SELECT * FROM trips where package_id = ?';
    const [rows] = await connection.query(sql, [package_id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {
     getTripsByIdVacation
     };

