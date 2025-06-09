import connection from '../database/db.js';

async function getVacationsPackages() {
  try {
    const sql = 'SELECT * FROM vacation_packages';
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default { getVacationsPackages };

