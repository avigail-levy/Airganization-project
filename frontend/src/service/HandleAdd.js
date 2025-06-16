import fetchData from "./FetchData";
const handleAdd = async (setData, path, data) => {
    try {
        let addData = await fetchData(path, "POST", data);
        setData(prevData => [...prevData, addData]);
    } catch (e) {
        console.error("Error fetching:", e);
        alert("Error fetching data");
    }
};
export default handleAdd;