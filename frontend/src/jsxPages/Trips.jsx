const Trips = () => {
    const [trips,setTrips] = useState([]);
    
    useEffect(() => {
        getTrips();
    }, []);
    const getTrips = async () => {
        try {
            const response = await fetchData('trips');
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