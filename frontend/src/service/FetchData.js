async function fetchData(navigateString, methodType = "GET", dataContent = null) {
  let token = localStorage.getItem("token");

  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    method: methodType,
  };

  if (dataContent !== null) {
    options.body = JSON.stringify(dataContent);
  }
  console.log(methodType,dataContent);
  console.log(`http://localhost:3000/api/${navigateString}`);
  const response = await fetch(`http://localhost:3000/api/${navigateString}`, options);

  // בדיקת כותרת – האם חזר טוקן חדש
  const newToken = response.headers.get('x-new-token');
if (newToken) {
  console.log("🔄 Tokien was refreshed:", newToken);
  localStorage.setItem('token', newToken);
} else {
  console.log("🔍 No new token in response.");
}

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Unknown error");
  }
// if(response.status !== 200){
//   //   throw new Error(`HTTP error!message: ${response.json()}`);
//   // }
  return data;
}

export default fetchData;
