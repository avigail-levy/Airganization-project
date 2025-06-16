import { useEffect, useState } from "react"
import fetchData from "../service/FetchData";
import {Outlet, useNavigate } from "react-router-dom";
import "./css/VacationPackages.css";
import { useUserContext } from "./UserContext";

const VacationPackages = () => {
  const{currentUser}=useUserContext();
  const [vacationPackages,setVacationPackages] = useState([]);
  const navigate=useNavigate();
    useEffect(() => {
        getVacationPackages();
    }, []);
    const getVacationPackages = async () => {
        try {
            const response = await fetchData('vacationPackages');
             console.log(">> חבילות נופש שהגיעו:", response);
            setVacationPackages(response);
        } catch (error) {
            console.error('Error fetching vacation packages:', error);
        }
    };
    return (
       <>
  <h1>חבילות נופש</h1>
  {currentUser.role==='manager' && <button onClick={() => navigate('/home/vacationPackages/add')}>הוסף חבילה</button>}
  <div className="packages-grid">
  {vacationPackages.map((vacationPackage) => (
    <div
      className="package-card clickable"
      key={vacationPackage.id}
      onClick={() => navigate(`/home/vacationPackages/${vacationPackage.id}`, {
  state: vacationPackage
     })}
    >

      {vacationPackage.image_url && (
        <img src={vacationPackage.image_url} alt={vacationPackage.alt_text} />
      )}
      <h2>{vacationPackage.name}</h2>
      <p>{vacationPackage.description}</p>
    </div>
  ))}
</div>
</>)
}
export default VacationPackages