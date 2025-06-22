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
    console.log('rowss',rows);
    return rows;
  }
   catch (error) {
    throw error;
  }
}

async function getUserByUserNamePassword(body) {
  const{username,password} = body;
  try {
    const sql = 'SELECT * FROM users WHERE user_name = ? AND  password = ?';
    const [rows] = await connection.query(sql, [username,password]);
    return rows[0];
  }
   catch (error) {
    throw error;
  }
}

async function registerUser(body) {
  const {name,username,phone,email,role,password} = body;
  try {
    const sql = 'INSERT INTO users (name,user_name,phone,email,role,password) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query(sql, [name,username,phone,email,role,password]);
    const id= result.insertId;
    return getUserById(id)
    //return {id,role};
  }
   catch (error) {
    throw error;
  }
}
async function updateUser(body) {
  // console.log("moddddd",body);
  const { id ,name, username, phone, email } = body;
  console.log(id,name, username, phone, email);
  try {
    const sql = `
      UPDATE users
      SET name = ?, user_name = ?, phone = ?, email = ?
      WHERE id = ?
    `;

    const [result] = await connection.query(sql, [name, username, phone, email,id]);

    if (result.affectedRows === 0) {
      return null; // אם לא נמצא משתמש עם id הזה
    }

    return { id, name, username, phone, email };
  } catch (error) {
    throw error;
  }
}

export default {
  getUserById,
  getUserByUserNamePassword,
  getAllUser,
  registerUser,
  updateUser
};