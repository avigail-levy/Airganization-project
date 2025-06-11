import connection from '../database/db.js';

async function getUserById(id) {
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
  }
   catch (error) {
    throw error;
  }
}

async function getAllUser() {
  try {
    const sql = 'SELECT * FROM users ';
    const [rows] = await connection.query(sql);
    return rows;
  }
   catch (error) {
    throw error;
  }
}

async function getUserByUserNamePassword(username,password) {
  try {
    const sql = 'SELECT * FROM users WHERE user_name = ? AND  password = ?';
    const [rows] = await connection.query(sql, [username,password]);
    return rows[0];
  }
   catch (error) {
    throw error;
  }
}

async function registerUser(id,name,username,phone,email,role,password) {
  console.log('id',id);
  console.log('name',name);
  console.log('username',username);
  console.log('phone',phone);
  console.log('email',email);
  console.log('role',role);
  console.log('password',password);
  try {
    const sql = 'INSERT INTO users (id,name,user_name,phone,email,role,password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [rows] = await connection.query(sql, [id,name,username,phone,email,role,password]);
    return rows[0];
  }
   catch (error) {
    throw error;
  }
}
export default {
  getUserById,
  getUserByUserNamePassword,
  getAllUser,
  registerUser
};