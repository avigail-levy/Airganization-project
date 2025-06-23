DROP DATABASE IF EXISTS airganization;

CREATE DATABASE airganization;

USE airganization;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  role ENUM('manager', 'customer') NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE continents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_name VARCHAR(50) NOT NULL
);

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_id INT NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (continent_id) REFERENCES continents(id)
);

CREATE TABLE vacation_packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  adult_price DECIMAL(10,2) NOT NULL,
  child_price DECIMAL(10,2) NOT NULL,
  manager_id INT NOT NULL,
  destination_id INT NOT NULL,
  available_slots INT NOT NULL,
  isActive boolean NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id),
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_track TEXT NOT NULL,
  package_id INT NOT NULL,
  exit_time DATETIME NOT NULL,
  return_time DATETIME NOT NULL,
  trip_date DATE NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

CREATE TABLE pictures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  alt_text TEXT,
  image_url VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

CREATE TABLE discount_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_percent INT NOT NULL,
  expire_at DATE NOT NULL,
  max_uses INT NOT NULL,
  used_count INT DEFAULT 0,
  manager_id INT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);

CREATE TABLE invitations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  user_id INT NOT NULL,
  sum_adult_parcipants INT NOT NULL,
  sum_child_parcipants INT NOT NULL,
  full_board BOOLEAN NOT NULL,
  discount_code_id INT,
  final_price DECIMAL(10,2) NOT NULL,
  isActive boolean NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (discount_code_id) REFERENCES discount_codes(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT NOT NULL,
  payment_manner VARCHAR(50) NOT NULL,
  payment_date DATE NOT NULL,
  payment_refernce VARCHAR(100),
  FOREIGN KEY (invitation_id) REFERENCES invitations(id)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  package_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

-- יבשות
INSERT INTO continents (continent_name) VALUES
('Europe'), ('Asia'), ('America'), ('Africa'), ('Oceania');

-- הזנת יעדים
INSERT INTO destinations (continent_id, country_name) VALUES
(1, 'יון'), (1, 'פריז'), (1, 'לונדון'), (1, 'נורווגיה'), (1, 'איסלנד'),
(2, 'דובאי'), (2, 'הודו'), (2, 'יפן'),(2, 'ישראל'),(2, 'נפאל'),
(3, 'ניו יורק'), (3, 'ארגנטינה'), (3, 'מקסיקו'),
(4, 'דרום אפריקה'), (4, 'מצרים');
-- (5, 'Australia'), (5, 'New Zealand'), (5, 'Fiji');

-- משתמשים
INSERT INTO users (name, user_name, phone, email, role, password) VALUES
('Alice Cohen', 'alicec', '0501234567', 'alice@example.com', 'manager', 'hashed_pw1'),
('David Levi', 'davidl', '0507654321', 'david@example.com', 'manager', 'hashed_pw2'),
('Rina Mor', 'rinam', '0509876543', 'rina@example.com', 'customer', 'hashed_pw3');

-- חבילות נופש (Alice = 1, David = 2)
INSERT INTO vacation_packages (name, start_date, end_date, description, adult_price, child_price, manager_id, destination_id, available_slots,isActive) VALUES
('יון הקסומה', '2025-07-01', '2025-07-10', 'להתעורר ביוון ההררית
אזור צפון יוון הוא מרחב עצום של טבע פראי - הרים גבוהים, קניונים עמוקים ויערות ירוקי עד - והוא רק המסגרת לתמונות מרהיבות בדמות המנזרים התלויים של מטאורה, אגמי פרספסשצבעיהם משתנים לפי צבע השמיים, ועוד רבים אחרים. כפרי האבן הקטנים מציעים סיורים שלווים, הטברנות מגישות אוכל ים-תיכוני טרי לצלילי מוזיקה יוונית נוגעת, והערים היפות במדינה הן שער לפלאי הפיסול והארכיטקטורה.
 
היעד שלכם: מדינת יוון שלחופי הים התיכון היא ביתם של כ-3,000 איים. חלקם גדולים ותוססים, אחרים קטנים ומסורתיים, אך כולם נוטפים אווירה יוונית ייחודית. הטיסה לסלוניקי אורכת כ-3 שעות בלבד, והיא נקודת המוצא האזורית למסלולי טיול, אתרים עתיקים, ערים חבויות ושאר הטוב של צפון יוון. חודשים מאי עד אוקטובר מתאימים במיוחד לשהות במקום - מזג האוויר נוח והטבע זוהר מתמיד.

החוויה של יוון ההררית: בשלוש מילים - טבע, מיתולוגיה וטעמים. בשעות היום יש סיורים מרתקים בין הצוקים המחודדים, המנזרים העתיקים ובהם "מנזרי השמיים" במטאורה שסוד בנייתם הוא בגדר חידה עד היום, האגמים ושדרות הדלבים. כשהערב יירד, בעלי הטברנות יזמינו אתכם לרקוד לצלילי הבוזוקי, או להזיל דמעה עם הזמרים השרים על אהבה.

האנשים שתכירו: התושבים הידועים בשמחת החיים שלהם חוגגים מדי יום את המסורת, האוכל והשמש - ולכם נותר רק להצטרף. לצידם תוכלו לחוות את התרבות הקדומה, הפולקלור הגאה ואורח החיים הפשוט אך המטופח שמתגלה מבעד לשקיעות יפות וזריחות זהובות של דייגים משכימי קום.
תיהנו לעשות: להיסחף בעקבות סיפורי המקום שעוברים בין הדורות, לבקר בבתי האבן המרצפים את הכפרים, לצעוד לאורך החוף היווני, לטעום מנות מהים ולצפות בפלאי טבע מיתולוגיים. כמובן, לשתות כוס אוזו אחת לפחות.

הסודות של יוון ההררית

ערי הצפון הסודיות: רובנו מכירים את איי הנופש המפורסמים ביוון, אבל במדינה הגדולה פי 6 מישראל שוכנות גם ערים יפות ומרתקות. אחת מהן היא יואנינה (Ioanina) שבאזור החוף המערבי של אגם פאמבוטיס (Pamvotis).פעם היא הייתה מוקד סחר עשיר ונוצץ בזכות אמני הכסף שחיו בה, וכיום חומותיה העתיקות מחבקות סמטאות ציוריות. אי אפשר שלא להזכיר את קסטוריה (Kastoria)שנבנתה על מורדות גבעה החודרת למי האגם. צפונית אליה שוכן מראה יפה לא פחות - אגמי פרספס (Prespes)החולקים גבול משותף עם אלבניה.

ים-יבשה: יוון נהנית משילוב של נופי אדמה ומים, וביטוי מקסים לכך נמצא בסלוניקי - עיר נמל חשובה, השנייה בגודלה אחרי אתונה. היא נוסדה בשנת 316 לפני הספירה ומאז נבנו בה כנסיות ביזנטיות, אנדרטאות רומיות וגם מגדל לבן הניצב זקוף על שפת הים עוד מהמאה ה-15.

לגעת בשמיים במנזרי השמיים: מצוקי מטאורה העצומים (Meteora), הנראים תלויים מהעננים, הם תופעת טבע של ממש שאף הוכרזו כאתר מורשת עולמית. עשרות עמודי אבן תלולים שמעליהם נבנו מנזרים מבודדים - איש עדיין לא יודע בדיוק כיצד. העירקלמבקה (Kalmbaka) שנבנתה למרגלות המצוקים משובצת בשלל מסעדות טובות וחנויות המוכרות תוצרת מקומית.

', 3000.00, 1500.00, 1, 1, 20,true),
('Venice Escape', '2025-08-05', '2025-08-12', 'Gondola rides in Venice.', 2800.00, 1400.00, 2, 2, 25,true),
('Barcelona Fiesta', '2025-09-01', '2025-09-08', 'Gaudi and tapas.', 2700.00, 1300.00, 1, 3, 30,true),
('Tokyo Highlights', '2025-07-15', '2025-07-22', 'Temples and tech.', 3100.00, 1550.00, 2, 4, 25,false),
('Bangkok Adventure', '2025-08-10', '2025-08-20', 'Markets and Thai food.', 2500.00, 1200.00, 1, 5, 30,true),
('Vietnam Discovery', '2025-09-20', '2025-09-28', 'Culture and scenery.', 2400.00, 1100.00, 2, 6, 18,true);


-- טיולים
INSERT INTO trips (trip_track, package_id, exit_time, return_time, trip_date) VALUES
('Eiffel Tower, Louvre', 1, '2025-07-02 09:00:00', '2025-07-02 17:00:00', '2025-07-02'),
('Grand Palace, Floating Market', 2, '2025-08-16 10:00:00', '2025-08-16 18:00:00', '2025-08-16'),
('Statue of Liberty, Times Square', 3, '2025-09-06 11:00:00', '2025-09-06 19:00:00', '2025-09-06');

-- תמונות
 INSERT INTO pictures (package_id, alt_text, image_url, sort_order)VALUES
(1, 'יוון', '/Greece/Greece.jpg', 1),
(1, 'יוון', '/images/greece/greece1.jpg', 2),
(1, 'יוון', '/images/greece/greece2.jpg', 3),
(1, 'יוון', '/images/greece/greece3.jpg', 4),
(1, 'יוון', '/images/greece/greece4.jpg', 5);
-- קודי הנחה
INSERT INTO discount_codes (code, discount_percent, expire_at, max_uses, used_count, manager_id) VALUES
('SUMMER10', 10, '2025-07-01', 100, 5, 1),
('BANGKOK15', 15, '2025-08-10', 50, 3, 2),
('NY20', 20, '2025-09-01', 30, 0, 1);

-- הזמנות (Rina = 3)
INSERT INTO invitations (package_id, user_id, sum_adult_parcipants, sum_child_parcipants, full_board, discount_code_id, final_price,isActive) VALUES
(1, 3, 2, 1, TRUE, 1, 6750.00,true),
(2, 3, 1, 2, FALSE, 2, 4900.00,false),
(3, 3, 2, 0, TRUE, NULL, 7000.00,true);

-- תשלומים
INSERT INTO payments (invitation_id, payment_manner, payment_date, payment_refernce) VALUES
(1, 'Credit Card', '2025-06-10', 'REF123456'),
(2, 'PayPal', '2025-07-20', 'PAY987654'),
(3, 'Bank Transfer', '2025-08-15', 'BNK112233');

-- חוות דעת
INSERT INTO reviews (user_id, package_id, rating, comment, created_at) VALUES
(3, 1, 5, 'Amazing trip to Paris!', '2025-07-15'),
(3, 2, 4, 'Nice experience but a bit hot.', '2025-08-30'),
(3, 3, 5, 'Loved NYC!', '2025-09-20');



CREATE OR REPLACE VIEW vacation_package_view AS
SELECT 
  vp.*, 
  p.image_url, 
  p.alt_text, 
  d.country_name, 
  c.continent_name
FROM vacation_packages vp
LEFT JOIN pictures p 
  ON vp.id = p.package_id AND p.sort_order = 1
JOIN destinations d 
  ON vp.destination_id = d.id
JOIN continents c 
  ON d.continent_id = c.id
WHERE vp.isActive = TRUE;

  
CREATE OR REPLACE VIEW user_orders_view AS
SELECT 
  inv.id AS invitation_id,
  inv.user_id,
  u.name AS user_name,
  vp.name AS vacation_name,
  vp.description,
  vp.start_date,
  vp.end_date,
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
WHERE inv.isActive = TRUE;

-- בדיקה
SELECT * FROM users;
SELECT * FROM continents;
select * from destinations;
select * from vacation_packages;
SELECT * FROM destinations where continent_id=1;
select * from invitations;
select * from user_orders_view;
SELECT * FROM user_orders_view WHERE user_id =3;