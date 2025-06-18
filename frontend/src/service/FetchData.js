async function fetchData(navigateString, methodType = "GET", dataContent = null) {
   const token = localStorage.getItem("token");
   const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }) // הוספת טוקן
    },
    method: methodType,
  };

  if (dataContent !== null) {
    options.body = JSON.stringify(dataContent);
  }
  console.log(methodType,dataContent);
  console.log(`http://localhost:3000/api/${navigateString}`);
  const response = await fetch(`http://localhost:3000/api/${navigateString}`, options);
  
  const data = await response.json(); 
  console.log('data',data);
  if (!response.ok) {
    throw new Error(data.error || "Unknown error");
  }

  // if(response.status !== 200){
  //   throw new Error(`HTTP error!message: ${response.json()}`);
  // }
  return data;
}
export default fetchData;