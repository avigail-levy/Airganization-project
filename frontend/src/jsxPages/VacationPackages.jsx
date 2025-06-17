import { useEffect, useState } from "react";
import fetchData from "../service/FetchData";
import { Outlet, useNavigate } from "react-router-dom";
import "./css/VacationPackages.css";
import { useUserContext } from "./UserContext";
import VacationFilterSort from "./VacationFilterSort";

const VacationPackages = () => {
  const { currentUser } = useUserContext();
  const [vacationPackages, setVacationPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("country");
  const [sortBy, setSortBy] = useState("price");

  const navigate = useNavigate();

  useEffect(() => {
    getVacationPackages();
  }, []);

  const getVacationPackages = async () => {
    try {
      const response = await fetchData("vacationPackages");
      console.log(">> חבילות נופש שהגיעו:", response);
      setVacationPackages(response);
      setFilteredPackages(response); // התחלה
    } catch (error) {
      console.error("Error fetching vacation packages:", error);
    }
  };

  return (
    <>
      <h1>חבילות נופש</h1>

      <VacationFilterSort
        allPackages={vacationPackages}
        setFilteredPackages={setFilteredPackages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {currentUser.role === "manager" && (
        <button onClick={() => navigate("/home/vacationPackages")}>
          הוסף חבילה
        </button>
      )}

      <div className="packages-grid">
        {filteredPackages.map((vacationPackage) => (
          <div
            className="package-card clickable"
            key={vacationPackage.id}
              onClick={() =>
              navigate(`/home/vacationPackages/${vacationPackage.id}`, {
                state: vacationPackage,
              })
            }
          >
            {vacationPackage.image_url && (
              <img
                src={vacationPackage.image_url}
                alt={vacationPackage.alt_text}
              />
            )}
            <h2>
              {vacationPackage.country_name} in {vacationPackage.continent_name}
            </h2>
            <h2>{vacationPackage.name}</h2>
            <p>{vacationPackage.description}</p>
        <button onClick={() =>  navigate(`/home/vacationPackages/${vacationPackage.id}`)}> עריכה</button>
          </div>
       ))}
      </div>
    </>
  );
};

export default VacationPackages;
