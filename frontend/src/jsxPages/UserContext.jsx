import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import{fetchGetUserById}from '../pages/service/user';
import fetchData from '../service/FechData';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate=useNavigate();
  const [currentUser, setCurrentUser] = useState({});
 
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if ( userData ) {
      fetchUserDetails(userData);
    }
    else{
      navigate('/login');
    }
  },[]);  
  const fetchUserDetails = async (userData) => {
    try {
      const DatailsUser = await fetchData(`users/${userData.id}`, 'GET');
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
