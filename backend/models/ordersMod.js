import connection from '../database/db.js';

async function createOrder(order) {
  const {
    vacationId,user_id,sum_adult_parcipants,sum_child_parcipants,
    full_board,discount_code_id,final_price,isActive} = order;
  try {
    const sql = `
      INSERT INTO invitations ( package_id,user_id, sum_adult_parcipants,
        sum_child_parcipants, full_board, discount_code_id, final_price,isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
    const values = [ vacationId,user_id, sum_adult_parcipants,sum_child_parcipants,
      full_board,discount_code_id || null,final_price,isActive];
    
    const [result] = await connection.query(sql, values);
    return { insertId: result.insertId };
  } catch (error) {
    throw error;
  }
}
async function getAllOrders() {
  try {
    const sql = ' Select * From user_orders_view';
    const [rows] = await connection.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getOrdersByUserId(id) {
  try {
    const sql = 'SELECT * FROM user_orders_view WHERE user_id = ?';
    const [rows] = await connection.query(sql,[id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function patchOrder(id) {
  try {
    const sql = 'UPDATE invitations SET isActive = false WHERE id = ?';
    const [rows] = await connection.query(sql, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function updateOrder(body) {
  const {
    id,vacationId,user_id, sum_adult_parcipants, sum_child_parcipants,
    full_board,discount_code,final_price, isActive} = body;

  try {
    const sql = `
      UPDATE invitations
      SET vacation_id = ?, user_id = ?, sum_adult_parcipants = ?, sum_child_parcipants = ?,
      full_board = ?, discount_code = ?, final_price = ?, isActive = ?
      WHERE id = ?
    `;
    const [rows] = await connection.query(sql, [ vacationId, user_id,sum_adult_parcipants,
      sum_child_parcipants,full_board,discount_code,final_price,isActive, id
    ]);

    return rows;
  } catch (error) {
    throw error;
  }
}
export default {
     createOrder,getAllOrders,getOrdersByUserId,patchOrder,updateOrder
     };

