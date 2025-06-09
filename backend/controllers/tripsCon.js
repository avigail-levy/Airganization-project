import tripsMod from '../models/tripsMod.js';

export async function getTripsByIdVacation(req, res) {
    const package_id = req.params.id;
  try {
    const trips = await tripsMod.getTripsByIdVacation(package_id);
    if (!trips) return res.status(404).json({ message: 'trips not found' });
    res.json(trips);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
}
