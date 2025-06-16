
import fetchData from "./FetchData.js";

const handleUpdate=async (setData,newForm,path,field,id) =>{
    try {
        
        const updatedValue = { [field]: newForm[field] };
        const updatedData = await fetchData(path, 'PATCH', updatedValue) || [];
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ?  updatedData  : item
            )
        );
    } catch (e) {
        console.error('Error fetching:', e);
        alert('Error fetching data');
    }
}
export default handleUpdate;