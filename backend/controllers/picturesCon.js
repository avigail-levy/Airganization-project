import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import picturesMod from '../models/picturesMod.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addPicture(req, res) {
  const { package_id, alt_text, fileName, imageBase64 } = req.body;

  if (!package_id || !imageBase64) {
    return res.status(400).json({ message: 'חסרים פרטי תמונה או מזהה חבילה' });
  }

  try {
    const uploadDir = path.join(__dirname, '..', 'public', 'images');
    fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = `${Date.now()}_${(fileName || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);

    fs.writeFileSync(filePath, Buffer.from(imageBase64, 'base64'));

    const image_url = `/images/${safeName}`;
    await picturesMod.addPicture({
      package_id,
      alt_text: alt_text || 'תמונת חבילה',
      image_url,
      sort_order: 1,
    });

    res.status(201).json({ message: 'התמונה נשמרה בהצלחה', image_url });
  } catch (error) {
    console.error('שגיאה בהוספת תמונה:', error);
    res.status(500).json({ message: 'שגיאה בשמירת התמונה', error });
  }
}

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
