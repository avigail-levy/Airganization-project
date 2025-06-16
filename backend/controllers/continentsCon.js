import continentsMod from '../models/continentsMod.js';

export async function getAllContinents(req, res) {
  try {
    const continents = await continentsMod.getAllContinents();
    if (!continents) return res.status(404).json({ message: 'continents not found' });
    res.json(continents);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching continents', error });
  }
}
