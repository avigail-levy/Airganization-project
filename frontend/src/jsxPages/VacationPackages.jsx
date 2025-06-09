import { useEffect, useState } from "react"
import fetchData from "../service/FetchData";
import {Outlet, useNavigate } from "react-router-dom";

const VacationPackages = () => {
  const [vacationPackages,setVacationPackages] = useState([]);
 const navigate=useNavigate();
    useEffect(() => {
        getVacationPackages();
    }, []);
    const getVacationPackages = async () => {
        try {
            const response = await fetchData('vacationPackages');
            setVacationPackages(response);
        } catch (error) {
            console.error('Error fetching vacation packages:', error);
        }
    };
    return (
        <>
            <h1>חבילות נופש</h1>
            {vacationPackages.map((vacationPackage) => (
                 <div key={vacationPackage.id}>
                 <div>{vacationPackage.name}</div>
                <button onClick={() => navigate(`${vacationPackage.id}/trips`)}>טיול נופש {vacationPackage.id}
    </button>
  </div>
  
            ))}
            <Outlet />
            </>
    )
}
export default VacationPackages