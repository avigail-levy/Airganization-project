import fetchData from "./FetchData.js";
const handleDelete = async (id,setData,path)=>{
    console.log(id);
    try{
        await fetchData(`${path}/${id}`,'DELETE')||[];
        setData(prevData => prevData.filter(item => item.id !== id));
    }
    catch(e){ 
        console.error('Error fetching:', e);
        alert('Error fetching data');
     }
}
export default handleDelete;