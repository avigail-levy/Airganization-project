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
async function createVacation(vacation) {
  const{name ,start_date ,end_date ,description,adult_price ,
  child_price,manager_id ,destination_id,available_slots}=vacation;
  try {
   const sql = `
      INSERT INTO vacation_packages
      (name, start_date, end_date, description, adult_price, child_price, manager_id, destination_id, available_slots)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [rows] = await connection.query(sql,
      [name,start_date,end_date,description,adult_price,
      child_price,manager_id,destination_id,available_slots]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
async function updateVacation(vacation) {
  const{id,name ,start_date ,end_date ,description,adult_price ,
    child_price,manager_id ,destination_id,available_slots} = vacation;
    console.log('vacation',id,name,start_date ,end_date ,description,adult_price );
  try {
   const sql = `
      UPDATE  vacation_packages 
      SET name=?, start_date=?, end_date=?, description=?, adult_price=?, child_price=?, manager_id=?,
      destination_id=?, available_slots=?
      WHERE id=?`;
      const [rows] = await connection.query(sql, 
      [name,start_date,end_date,description,adult_price,
      child_price,manager_id,destination_id,available_slots,id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
async function getVacationsPackagesForHome() {
  try {
    const sql = `SELECT * FROM vacation_package_view` ;
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
async function deleteVacationPackage(id) {
  try {
    const sql = `DELETE FROM vacation_packages WHERE id = ?`;
    const [rows] = await connection.query(sql, [id]);
    return rows;
  }
   catch (error) {
    throw error;
  }
}
export default {getVacationsPackages,createVacation,getVacationPackageById,updateVacation
    ,deleteVacationPackage,getVacationsPackagesForHome};

