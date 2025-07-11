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
  try { 
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
  const body = req.body;
  try {
    const user = await usersMod.getUserByUserNamePassword(body);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    // שליחת פרטי המשתמש + הטוקן
    res.json({user, token });


  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}
export async function registerUser(req, res) {
  const body = req.body;
  try {
    const user = await usersMod.registerUser(body);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    // שליחת פרטי המשתמש + הטוקן
    res.json({ user, token });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}
export async function updateUser(req, res) {
  const { body } = req;
  try {
    const updatedUser = await usersMod.updateUser(body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}