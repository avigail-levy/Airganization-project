import usersMod from '../models/usersMod.js';

export async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await usersMod.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}
