import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../service/FetchData';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
 
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('currentUser'));
    console.log("userdata" + userId);
    if ( userId ) {
      fetchUserDetails(userId);
    }
    else{
      navigate('/login');
    }
  },[]);  
  
  const fetchUserDetails = async (userId) => {
    try {
      const DatailsUser = await fetchData(`users/${userId}`, 'GET');
      setCurrentUser(DatailsUser);
    } catch (error) {
      navigate('/login');
      console.error('Error fetching user details:', error);
    }
  };
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
