import vacationsMod from '../models/vacationsMod.js';

export async function getVacationsPackages(req, res) {
  try {
    const vacations = await vacationsMod.getVacationsPackages();
    if (!vacations) return res.status(404).json({ message: 'vacations not found' });
    res.json(vacations);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching vacations', error });
  }
}
export async function getVacationPackageById(req, res) {
  const id = req.params.id;
  try {
    const vacation = await vacationsMod.getVacationPackageById(id);
    if (!vacation) return res.status(404).json({ message: 'vacation not found' });
    res.json(vacation);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching vacations', error });
  }
}
export async function postVacation(req, res) {
  console.log('vacation',req.body);
  const vacation = req.body;
  console.log('vacation',vacation);
  
  try {
    const vacations = await vacationsMod.postVacation(vacation);
    if (!vacations) return res.status(404).json({ message: 'vacations not found' });
    res.json(vacations);
  }
   catch (error) {
    res.status(500).json({ message: 'Error fetching vacations', error });
  }
}
