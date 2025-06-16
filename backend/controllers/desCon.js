import destinationsMod from '../models/destinationsMod.js';

export async function getDestinationsByContinentId(req, res) {
    const{continentId} = req.params;
    console.log(continentId);
  try {
    const destinations = await destinationsMod.getDestinationsByContinentId(continentId);
    if (!destinations) return res.status(404).json({ message: 'destinations not found' });
    res.json(destinations);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error });
  }
}
