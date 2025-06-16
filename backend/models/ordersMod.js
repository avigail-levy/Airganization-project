import connection from '../database/db.js';

async function createOrder(order) {
  console.log('orderr',order.user_id);
  const {
    vacationId,user_id,sum_adult_parcipants,sum_child_parcipants,
    full_board,discount_code_id,final_price} = order;
  try {
    const sql = `
      INSERT INTO invitations (
        package_id,
        user_id,
        sum_adult_parcipants,
        sum_child_parcipants,
        full_board,
        discount_code_id,
        final_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [ vacationId,user_id, sum_adult_parcipants,sum_child_parcipants,
      full_board,discount_code_id || null,final_price];
    
    const [result] = await connection.query(sql, values);
    return { insertId: result.insertId };
  } catch (error) {
    throw error;
  }
}
async function getAllOrders() {
  try {
    const sql = ' Select * From invitations';
    const [rows] = await connection.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getOrdersByUserId(id) {
  try {
    const sql = ' Select * From invitations Where user_id=?';
    const [rows] = await connection.query(sql,[id]);
    return rows;
  } catch (error) {
    throw error;
  }
}
export default {
     createOrder,getAllOrders,getOrdersByUserId
     };

