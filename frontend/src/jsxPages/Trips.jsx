import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import fetchData from "../service/FetchData";
const Trips = () => {
    const [trips,setTrips] = useState([]);
    const { vacationId } = useParams(); 
    
    useEffect(() => {
         if (vacationId) {
            console.log("vacationId:", vacationId);
            getTrips();
        }
    }, [vacationId]);

    const getTrips = async () => {
        try {
            console.log(`trips/vacations/${vacationId}`);
            const response = await fetchData(`trips/vacations/${vacationId}`);
            setTrips(response);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };
    return (
        <>
            <h1>טיול נופש </h1>
            {trips.map((trip,index) => (
                 <div key={index+1}>{trip.trip_track}</div> 
            ))}
      </>
    );
}
export default Trips;