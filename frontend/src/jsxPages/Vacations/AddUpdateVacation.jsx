import { useState ,useEffect } from 'react';
import '../css/AddUpdateVacation.css';
import { useUserContext } from "../UserContext";
import fetchData from "../../service/FetchData";
import { useLocation ,useNavigate} from 'react-router-dom';


const AddUpdateVacation = () => {
  const { currentUser } = useUserContext();
  const [ continents, setContinents ] = useState([]);
  const [ selectedContinent, setSelectedContinent ] = useState('');
  const [ destinations, setDestinations ] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const navigate=useNavigate();
  const location = useLocation();
  const vacationId = location.state;
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
  const loadDestinationsForContinent = async (continentId) => {
    try {
      const response = await fetchData(`destinations/${continentId}`);
      setDestinations(response);
      setFormData(prev => ({
        ...prev,
        destination_id: response.length > 0 ? response[0].id : ''
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  useEffect(() => {
    getAllContinents();
    if(vacationId)
    {
      getVacationById(vacationId);
    }
  }, []);

  const getVacationById = async (vacationId) => {
    try {
      const response = await fetchData(`vacationPackages/${vacationId}`);
      const cleaned = {
  ...response,
  start_date: response.start_date?.substring(0, 10),
  end_date: response.end_date?.substring(0, 10)
};
setFormData(cleaned);
    } catch (error) {
      console.error('Error fetching vacation:', error);
    }
  }
  const getAllContinents = async () => {
      try {
        const response = await fetchData('continents');
        setContinents(response);
        if (response.length > 0) {
          const defaultContinentId = response[0].id;
          setSelectedContinent(defaultContinentId);
          await loadDestinationsForContinent(defaultContinentId);
        }
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    };
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
  const handleAdd = (e) => {
    e.preventDefault();
   if(checkFormat()) {
    try{
          fetchData('vacationPackages/add','POST',formData);
    }
    catch(error){
      console.log(error);
    }
    alert('החבילה נוספה בהצלחה');
    navigate('/home/vacationPackages');
    
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
              <option key={c.id} value={c.id}>{c.continent_name}</option>
            ))}
          </select>
        </label>

        <label>
          מדינה:
          <select name="destination_id" value={formData.destination_id} onChange={handleChange} required >
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.country_name}</option>
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
