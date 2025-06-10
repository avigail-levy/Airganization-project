import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../service/FetchData';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
 
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetailsWithToken(token);
    } else {
      navigate('/login');
    }
  }, []);

  const fetchUserDetailsWithToken = async (token) => {
    try {
      const detailsUser = await fetchData('users', 'GET', null, token);
      setCurrentUser(detailsUser);
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
