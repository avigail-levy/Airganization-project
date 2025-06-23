import picturesMod from '../models/picturesMod.js';

export async function getPicturesByPackageId(req, res) {
  const { packageId } = req.params;

  try {
    const pictures = await picturesMod.getPicturesByPackageId(packageId);
    if (!pictures || pictures.length === 0) {
      return res.status(404).json({ message: 'לא נמצאו תמונות לחבילה' });
    }
    res.json(pictures);
  } catch (error) {
    console.error('שגיאה בשליפת תמונות:', error);
    res.status(500).json({ message: 'שגיאה בשרת', error });
  }
}
