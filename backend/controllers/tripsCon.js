import tripsMod from '../models/tripsMod.js';

export async function getTripsByIdVacation(req, res) {
    const vacation_id = req.params.vacationId;
  try {
    const trips = await tripsMod.getTripsByIdVacation(vacation_id);
    if (!trips) return res.status(404).json({ message: 'trips not found' });
    res.json(trips);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
}
