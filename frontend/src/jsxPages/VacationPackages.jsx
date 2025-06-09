import { useEffect, useState } from "react"
import fetchData from "../service/FetchData";

const VacationPackages = () => {
  const [vacationPackages,setVacationPackages] = useState([]);

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
            {vacationPackages.map((vacationPackage,index) => (
                <>
                 <div key={index+1}>{vacationPackage.name}</div>
                 <button onClick={() => navigate(`${vacationPackage.id}/trips`)}>טיול נופש {vacationPackage.id}</button>
                </>
            ))}
            </>
    )
}
export default VacationPackages