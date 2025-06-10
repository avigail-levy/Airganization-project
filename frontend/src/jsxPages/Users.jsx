import { useEffect, useState } from "react";
import fetchData from "../service/FetchData";
const Users = () => {
  const [users,setUsers]=useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response = await fetchData('users');
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
  <><h2>רשימת לקוחות</h2>
  
  {users.map((user,index) => (
    <div key={index+1}>{user.name}</div> 
  ))}
  
  </>);
};

export default Users;