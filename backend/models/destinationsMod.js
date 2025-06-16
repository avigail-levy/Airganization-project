import connection from '../database/db.js';

async function getDestinationsByContinentId(continent_id) {
  try {
    const sql = 'SELECT * FROM destinations where continent_id=?';
    const [rows] = await connection.query(sql, [continent_id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {
     getDestinationsByContinentId
     };

