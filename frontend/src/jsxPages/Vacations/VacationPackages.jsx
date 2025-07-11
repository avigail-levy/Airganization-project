import { useEffect, useState } from "react";
import fetchData from "../../service/FetchData";
import { useNavigate } from "react-router-dom";
import "../css/VacationPackages.css";
import { useUserContext } from "../UserContext";
import VacationFilterSort from "../Vacations/VacationFilterSort";

const VacationPackages = ({ isHomePage = false }) => {
  const { currentUser } = useUserContext();
  const [vacationPackages, setVacationPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("country");
  const [sortBy, setSortBy] = useState("price");

  const navigate = useNavigate();

  useEffect(() => {
    getVacationPackages();
  }, [isHomePage]);

  const getVacationPackages = async () => {
    try {
      const url = isHomePage ? "vacationPackages/home" : "vacationPackages";
      const response = await fetchData(url);
      setVacationPackages(response);
      setFilteredPackages(response);
    } catch (error) {
      console.error("Error fetching vacation packages:", error);
    }
  };

  const isManager = currentUser && currentUser.role === "manager";

  return (
    <>
      <h1>{isHomePage ? "הצעות חמות לחופשה" : "חבילות נופש"}</h1>
      
         {!isHomePage && <VacationFilterSort
            allPackages={vacationPackages}
            setFilteredPackages={setFilteredPackages}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            sortBy={sortBy}
            setSortBy={setSortBy}/>
}
          {!isHomePage && isManager && (
            <button onClick={() => navigate("/home/vacationPackages/add")}>
              הוסף חבילה
            </button>
          )}

      <div className="packages-grid">
        {filteredPackages.map((vacationPackage) => (
          <div
            className="package-card clickable"
            key={vacationPackage.id}
            onClick={() =>
              navigate(`/home/vacationDetails`, { state: vacationPackage})} >
            {vacationPackage.image_url && (
              <img src={`http://localhost:3000${vacationPackage.image_url}`} 
              alt={vacationPackage.alt_text} />
            )}
            <h2>
              {vacationPackage.country_name}
            </h2>
            <h2>{vacationPackage.name}</h2>
           
          </div>
        ))}
      </div>
    </>
  );
};

export default VacationPackages;
