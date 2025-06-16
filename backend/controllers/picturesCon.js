import picturesMod from '../models/picturesMod.js';

export async function getPicturesByIdVacation(req, res) {
    const vacation_id = req.query.vacationId;
  try {
    const pictures = await picturesMod.getPicturesByIdVacation(vacation_id);
    if (!pictures) return res.status(404).json({ message: 'picture not found' });
    res.json(pictures);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching picture', error });
  }
}
