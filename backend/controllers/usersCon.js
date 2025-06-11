import usersMod from '../models/usersMod.js';
import jwt from 'jsonwebtoken';

export async function getUserById(req, res) {
const userId = req.user.id;
  try {
    const user = await usersMod.getUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}

export async function getAllUser(req, res) {
  try { // בדיקת הרשאה - רק מנהל יכול להמשיך
    if (req.user.role !== 'manager') {
      return res.status(401).json({ message: 'Access denied. Managers only.' });
    }
    const users = await usersMod.getAllUser();
    if (!users) return res.status(404).json({ message: 'Users not found' });
    res.json(users);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
}

export async function getUserByUserNamePassword(req, res) {
  const {username,password} = req.body;
  try {
    const user = await usersMod.getUserByUserNamePassword(username,password);
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found' });

      // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
        process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // שליחת פרטי המשתמש + הטוקן
    res.json({ user: { id: user.id, role: user.role }, token });


  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}
export async function registerUser(req, res) {
  const {id,name,username,phone,email,role,password} = req.body;
  console.log('req.body',req.body);
  try {
    const user = await usersMod.registerUser(id,name,username,phone,email,role,password);
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found' });

      // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
        process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // שליחת פרטי המשתמש + הטוקן
    res.json({ user: { id: user.id, role: user.role }, token });


  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}

