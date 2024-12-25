document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const apiKey = '1f9aec38531a4ca6a1112630242512'; // Replace with your actual API key
    getWeather(apiKey, city);
});

function getWeather(api_key, city) {
    const base_url = "http://api.weatherapi.com/v1/current.json";
    const complete_url = `${base_url}?key=${api_key}&q=${city}&aqi=no`;

    fetch(complete_url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Failed to retrieve data. HTTP Status code: ${response.status}`);
            }
        })
        .then(data => {
            const location = data['location'];
            const current = data['current'];
            
            const result = `
                <p>City: ${location['name']}</p>
                <p>Region: ${location['region']}</p>
                <p>Country: ${location['country']}</p>
                <p>Temperature: ${current['temp_c']}°C</p>
                <p>Humidity: ${current['humidity']}%</p>
                <p>Weather: ${current['condition']['text']}</p>
            `;
            document.getElementById('weatherResult').innerHTML = result;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
        });
}