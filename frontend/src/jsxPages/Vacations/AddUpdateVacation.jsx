import { useState ,useEffect } from 'react';
import '../css/AddUpdateVacation.css';
import { useUserContext } from "../UserContext";
import fetchData from "../../service/FetchData";
import { useLocation ,useNavigate} from 'react-router-dom';

const formatDateForInput = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value.substring(0, 10);
  if (value instanceof Date) return value.toISOString().substring(0, 10);
  return String(value).substring(0, 10);
};

const mapVacationToFormData = (vacation) => ({
  id: vacation.id,
  name: vacation.name ?? '',
  start_date: formatDateForInput(vacation.start_date),
  end_date: formatDateForInput(vacation.end_date),
  description: vacation.description ?? '',
  adult_price: vacation.adult_price ?? '',
  child_price: vacation.child_price ?? '',
  manager_id: vacation.manager_id,
  destination_id: String(vacation.destination_id ?? ''),
  available_slots: vacation.available_slots ?? '',
  isActive: vacation.isActive ?? true,
});

const AddUpdateVacation = () => {
  const { currentUser } = useUserContext();
  const [ continents, setContinents ] = useState([]);
  const [ selectedContinent, setSelectedContinent ] = useState('');
  const [ destinations, setDestinations ] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate=useNavigate();
  const location = useLocation();
  const vacationId = location.state?.id;
  const [ formData, setFormData ] = useState({
    id: vacationId ||'',
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    adult_price: '',
    child_price: '',
    manager_id: currentUser.id,
    destination_id: '',
    available_slots: '',
    isActive:true
  });
  const loadDestinationsForContinent = async (continentId, keepDestinationId = null) => {
    try {
      const response = await fetchData(`destinations/${continentId}`);
      setDestinations(response);
      setFormData(prev => ({
        ...prev,
        destination_id: keepDestinationId != null
          ? String(keepDestinationId)
          : (response.length > 0 ? String(response[0].id) : '')
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations([]);
    }
  };

  const findContinentForDestination = async (destinationId, continentsList) => {
    const targetId = String(destinationId);
    for (const continent of continentsList) {
      const dests = await fetchData(`destinations/${continent.id}`);
      if (dests.some((d) => String(d.id) === targetId)) {
        return { continentId: String(continent.id), destinations: dests };
      }
    }
    return null;
  };

  useEffect(() => {
    const initForm = async () => {
      try {
        const continentsResponse = await fetchData('continents');
        setContinents(continentsResponse);

        if (vacationId) {
          const vacation = await fetchData(`vacationPackages/${vacationId}`);
          let continentId = vacation.continent_id != null ? String(vacation.continent_id) : null;
          let destinationsList = [];

          if (continentId) {
            destinationsList = await fetchData(`destinations/${continentId}`);
          } else {
            const found = await findContinentForDestination(vacation.destination_id, continentsResponse);
            if (found) {
              continentId = found.continentId;
              destinationsList = found.destinations;
            }
          }

          setDestinations(destinationsList);
          setSelectedContinent(continentId ?? '');
          setFormData(mapVacationToFormData(vacation));
        } else if (continentsResponse.length > 0) {
          const defaultContinentId = String(continentsResponse[0].id);
          setSelectedContinent(defaultContinentId);
          await loadDestinationsForContinent(defaultContinentId);
        }
      } catch (error) {
        console.error('Error initializing vacation form:', error);
      }
    };

    initForm();
  }, [vacationId]);
  const handleContinentChange = async (e) => {
    const continentId = e.target.value;
    setSelectedContinent(continentId);
    await loadDestinationsForContinent(continentId);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  const cleanValue = name === "start_date" || name === "end_date"
    ? value.substring(0, 10)  // מבטיח שזה בלי שעה
    : value;

  setFormData(prev => ({ ...prev, [name]: cleanValue }));
};

 const checkFormat = () => {
  if(formData.name==='')
  {
    alert('שם החבילה לא הוזנה');
    return false;
  }
   if(formData.start_date > formData.end_date)
   {
     alert('תאריך ההתחלה צריך להיות לפני תאריך הסיום');
     return false;
   }
   if(formData.start_date < new Date().toISOString().split('T')[0])
   {
    alert('תאריך התחלה לא תקין');
     return false;
   }
   if(formData.end_date < new Date().toISOString().split('T')[0])
   {
     alert('תאריך סיום לא תקין');
     return false;
   }
   if(formData.description === '')
   {
     alert('תיאור לא תקין');
     return false;
   }
   if(formData.adult_price <= 0)
   {
     alert('מחיר למבוגר לא תקין');
     return false;
   }
   if(formData.child_price <= 0)
   {
     alert('מחיר לילד לא תקין');
     return false;
   }
   if(formData.available_slots <= 0)
   {
     alert('כמות מקומות לא תקינה');
     return false;
   }
   return true;
 }
  const MAX_IMAGE_MB = 8;

  const compressImageFile = (file, maxWidth = 1280, quality = 0.82) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('דחיסת התמונה נכשלה'));
              return;
            }
            const compressed = new File(
              [blob],
              file.name.replace(/\.\w+$/, '.jpg'),
              { type: 'image/jpeg' }
            );
            resolve(compressed);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('לא ניתן לקרוא את התמונה'));
      };

      img.src = url;
    });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const uploadPackageImage = async (packageId, file, altText) => {
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      alert(`התמונה גדולה מדי (מקסימום ${MAX_IMAGE_MB}MB). בחרי תמונה קטנה יותר.`);
      return false;
    }

    const preparedFile =
      file.type.startsWith('image/') ? await compressImageFile(file) : file;
    const imageBase64 = await fileToBase64(preparedFile);

    await fetchData('pictures/add', 'POST', {
      package_id: packageId,
      alt_text: altText,
      fileName: preparedFile.name,
      imageBase64,
    });
    return true;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!checkFormat()) return;

    try {
      const result = await fetchData('vacationPackages/add', 'POST', formData);

      if (imageFile && result?.insertId) {
        try {
          const imageSaved = await uploadPackageImage(
            result.insertId,
            imageFile,
            formData.name
          );
          if (imageSaved === false) {
            alert('החבילה נוספה, אך התמונה לא נשמרה (קובץ גדול מדי).');
            navigate('/home/vacationPackages');
            return;
          }
        } catch (imageError) {
          console.error(imageError);
          alert('החבילה נוספה, אך שמירת התמונה נכשלה. נסי תמונה קטנה יותר.');
          navigate('/home/vacationPackages');
          return;
        }
      }

      alert('החבילה נוספה בהצלחה');
      navigate('/home/vacationPackages');
    } catch (error) {
      console.error(error);
      alert('שגיאה בהוספת החבילה');
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if(checkFormat()) {
    fetchData('vacationPackages/update','PUT',formData);
    alert('החבילה עודכנה בהצלחה');
    navigate('/home/vacationPackages');
    }
  };
  return (
    <div className="add-vacation-container">
     {vacationId ? <h1>עדכון חבילת נופש</h1> : <h1>הוספת חבילת נופש</h1>} 
      <form className="vacation-form">
        <label>
          שם החבילה:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          תאריך התחלה:
          <input type="date" name="start_date" value={formData.start_date ? formData.start_date.substring(0, 10) : ""} onChange={handleChange} required />
        </label>

        <label>
          תאריך סיום:
          <input type="date" name="end_date" value={formData.end_date ? formData.end_date.substring(0, 10) : ""} onChange={handleChange} required />
        </label>

        <label>
          תיאור:
          <textarea name="description" value={formData.description} onChange={handleChange} required/>
        </label>

        <label>
          מחיר למבוגר:
          <input type="number" step="0.01" name="adult_price" value={formData.adult_price} onChange={handleChange} required />
        </label>

        <label>
          מחיר לילד:
          <input type="number" step="0.01" name="child_price" value={formData.child_price} onChange={handleChange} required />
        </label>

        <label>
          מקומות פנויים:
          <input type="number" name="available_slots" value={formData.available_slots} onChange={handleChange} required />
        </label>

        <label>
          יבשת:
          <select value={selectedContinent} onChange={handleContinentChange} required>
            {continents.map(c => (
              <option key={c.id} value={String(c.id)}>{c.continent_name}</option>
            ))}
          </select>
        </label>

        <label>
          מדינה:
          <select name="destination_id" value={formData.destination_id} onChange={handleChange} required >
            {destinations.map(d => (
              <option key={d.id} value={String(d.id)}>{d.country_name}</option>
            ))}
          </select>
        </label>
        {!vacationId &&<label>העלאת תמונה:
        <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} />
        </label>}
        {vacationId ? <button className="AddUpdate-btn" onClick={handleUpdate}>עדכן חבילה</button> :
        <button className="AddUpdate-btn" onClick={handleAdd}>הוסף חבילה</button>}
      </form>
    </div>
  );
};

export default AddUpdateVacation;
