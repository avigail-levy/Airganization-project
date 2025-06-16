import connection from '../database/db.js';

async function getVacationsPackages() {
  try {
    const sql = `SELECT vp.*, p.image_url, p.alt_text 
                 FROM vacation_packages vp LEFT JOIN pictures p
                 ON vp.id = p.package_id AND p.sort_order = 1` ;
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
async function postVacation(vacation) {
  const{
  name ,
  start_date ,
  end_date ,
  description,
  adult_price ,
  child_price,
  manager_id ,
  destination_id,
  available_slots}=vacation;
  try {
   const sql = `
      INSERT INTO vacation_packages
      (name, start_date, end_date, description, adult_price, child_price, manager_id, destination_id, available_slots)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [rows] = await connection.query(sql, [
      name,
      start_date,
      end_date,
      description,
      adult_price,
      child_price,
      manager_id,
      destination_id,
      available_slots
    ]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default { getVacationsPackages,postVacation};

