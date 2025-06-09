import connection from '../database/db.js';

async function getTripsByIdVacation(vacation_id) {
  try {
    const sql = 'SELECT * FROM trips where package_id = ?';
    const [rows] = await connection.query(sql, [vacation_id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {
     getTripsByIdVacation
     };

