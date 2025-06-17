import { useState ,useEffect } from 'react';
import './css/AddVacation.css';
import { useUserContext } from "./UserContext";
import fetchData from "../service/FetchData";
import {  useParams } from 'react-router-dom';

const AddUpdateVacation = () => {
  const { currentUser } = useUserContext();
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [destinations, setDestinations] = useState([]);
  const {vacationId}=useParams;
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    description: '',
    adult_price: '',
    child_price: '',
    manager_id: currentUser.id,
    destination_id: '',
    available_slots: ''
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
    if(id)
    {
      getVacationById(id);
    }
    
  }, []);

  const getVacationById = async (id) => {
    try {
      const response = await fetchData(`vacationPackages/${id}`);
      setFormData(response);
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('שליחת טופס:', formData);
    fetchData('vacationPackages','POST',formData);
    alert('החבילה נוספה בהצלחה');
  };

  return (
    <div className="add-vacation-container">
      <h1>הוספת חבילת נופש</h1>
      <form className="vacation-form" onSubmit={handleSubmit}>
        <label>
          שם החבילה:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          תאריך התחלה:
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        </label>

        <label>
          תאריך סיום:
          <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
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

        <button className="submit-btn" onClick={handleSubmit} >✅ הוסף חבילה</button>
      </form>
    </div>
  );
};

export default AddUpdateVacation;
