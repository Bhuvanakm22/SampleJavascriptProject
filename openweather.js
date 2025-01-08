
//Open API for showing a weather report :-- https://home.openweathermap.org/api_keys
console.trace();
const apiKey = 'c8a36d6fc811ef9e1d9963c6f251e7c3';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;



fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //alert("Network error");
        return response.json();
    })
    .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const location = data.name;
        const outputElement = document.getElementById('Weather_response-message');
        outputElement.innerHTML = `<p>Temperature in ${location}: ${temperature}°C</p>
                               <p>Weather: ${description}</p>`;
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error");
    });
    