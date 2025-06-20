const btn = document.getElementById('button');
const input = document.getElementById('location')
const apiKey = "a90c4c0e5b7d89c27d77eaee53a44fbb";
const icon = document.getElementById('icon')
const output = document.getElementById('output-window')
const weatherImg = document.getElementById('weather-image')

const img = {
    sunny: 'images/sunshine.png',
    cloudy: 'images/cloudy.png',
    rain: 'images/rain.png',
    cold: 'images/cold.png',
    sunshine_clouds: 'images/sunshine_clouds.png',
    fog: 'images/fog.png',
}



// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=a90c4c0e5b7d89c27d77eaee53a44fbb

// btn.onclick = function() {
//     output.innerHTML = "That worked!"
// };

btn.onclick = function() {

    const city = input.value.trim(); //takes value of user input and trims any white spaces
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&units=metric&APPID=${apiKey}`;

    if (!city) {
        output.innerHTML = `<p style="color: red;"> Please enter a city name!</p>` //if no city entered, error message provided
        return;
    } 

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new  Error('City not found or request failed')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const location = data.name;
            output.innerHTML = `<p>Temperature in ${location}: ${temperature} degrees C</p> <p> Weather: ${description}</p>`;
            setIcon(temperature); //calls the setIcon function below
            setImg(description)
        })
        .catch(error => {
            console.error('Error:', error);
            output.innerHTML = `<p style="color:red;">Oops! ${error.message}</p>`;
        });

    }
    const setIcon = (temperature) => {
        if (temperature > 20) {
            icon.innerHTML = "😎 Nice and warm";
        } else if (temperature <20 && temperature > 15){
            icon.innerHTML = "😊 Comfortable!";
        } else {
            icon.innerHTML = "🥶 It is chilly"

        }
    };

  const setImg = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes('sun') && desc.includes('cloud')) {
    weatherImg.src = img.sunshine_clouds;
  } else if (desc.includes('cloud') && desc.includes('broken')) {
    weatherImg.src = img.sunshine_clouds;
  } else if (desc.includes('sun') || desc.includes('clear')) {
    weatherImg.src = img.sunny;
  } else if (desc.includes('cloud')) {
    weatherImg.src = img.cloudy;
  } else if (desc.includes('rain')) {
    weatherImg.src = img.rain;
  } else if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
    weatherImg.src = img.fog;
  } else if (desc.includes('cold') || desc.includes('snow') || desc.includes('ice')) {
    weatherImg.src = img.cold;
  } else {
    weatherImg.src = 'images/default.png';
  }
};
    



