import connection from '../database/db.js';

async function getVacationsPackages() {
  try {
    const sql = `SELECT * FROM vacation_package_view` ;
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
async function getVacationPackageById(id) {
  try {
    const sql = `SELECT * FROM vacation_packages where id=?` ;
    const [rows] = await connection.query(sql,[id]);
    return rows[0];
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
export default { getVacationsPackages,postVacation,getVacationPackageById};

