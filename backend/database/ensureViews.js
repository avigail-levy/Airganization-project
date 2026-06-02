import connection from './db.js';

const USER_ORDERS_VIEW_SQL = `
  CREATE OR REPLACE VIEW user_orders_view AS
  SELECT
    inv.id AS invitation_id,
    inv.package_id,
    inv.user_id,
    u.name AS user_name,
    vp.name AS vacation_name,
    vp.description,
    vp.start_date,
    vp.end_date,
    vp.adult_price,
    vp.child_price,
    d.country_name,
    c.continent_name,
    inv.sum_adult_parcipants,
    inv.sum_child_parcipants,
    inv.full_board,
    inv.final_price,
    p.image_url,
    p.alt_text
  FROM invitations inv
  JOIN users u ON inv.user_id = u.id
  JOIN vacation_packages vp ON inv.package_id = vp.id
  JOIN destinations d ON vp.destination_id = d.id
  JOIN continents c ON d.continent_id = c.id
  LEFT JOIN pictures p ON vp.id = p.package_id AND p.sort_order = 1
  WHERE inv.isActive = TRUE
`;

export async function ensureViews() {
  try {
    await connection.query(USER_ORDERS_VIEW_SQL);
    console.log('user_orders_view is up to date');
  } catch (error) {
    console.error('Failed to update user_orders_view:', error.message);
  }
}
