export const getTemperatureFromApi = (productId) => {
    return fetch(`http://localhost:8081/temperature/${productId}`)
    .then((response) => {
      if(response.status === 200) return response.json();
      else throw new Error("API response fail");
    });
};