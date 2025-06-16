const AddManager = () => {
     const addManager= async ()=>
 {
  try {
    const response = await handleAdd(setUsers,'users/addManager',);
    setUsers(response);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
 }
    return (
        <div>
            <h1>הוספת מנהל</h1>
        </div>
    );
}
export default AddManager;