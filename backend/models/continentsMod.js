import connection from '../database/db.js';

async function getAllContinents() {
  try {
    const sql = 'SELECT * FROM continents';
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {
     getAllContinents
     };

