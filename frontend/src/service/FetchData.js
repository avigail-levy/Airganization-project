async function fetchData(navigateString, methodType = "GET", dataContent = null) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: methodType,
  };

  if (dataContent !== null) {
    options.body = JSON.stringify(dataContent);
  }
  const response = await fetch(`http://localhost:3000/api/${navigateString}`, options);
  const data = await response.json(); 
  if (!response.ok) {
    throw new Error(data.error || "Unknown error");
  }

  // if(response.status !== 200){
  //   throw new Error(`HTTP error!message: ${response.json()}`);
  // }
  // const data = await response.json();
  return data;
}
export default fetchData;