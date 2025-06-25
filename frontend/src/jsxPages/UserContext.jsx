import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../service/FetchData';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState(null);
 
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetailsWithToken();
    }
     else {
      navigate('/home' ,{ replace: true });
    }
  },[]);

  const fetchUserDetailsWithToken = async () => {
    try {
      const detailsUser = await fetchData('users/id', 'GET', null);
      setCurrentUser(detailsUser);
    } catch (error) {
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
