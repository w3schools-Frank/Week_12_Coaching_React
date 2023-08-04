function WeatherData({ forecast }) {

    //After we submit the form and get our data from the api, we can get data such as `city` and `list` from our response
    const { city, list } = forecast;

    return (
        <>
            {/* All the logic down below is just using our response data from the weatheropenapi */}
            <h1>Weather Data components</h1>
            <p>City Name: {city.name}</p>
            {list.map((weather, index) => (
                <div key={index}>
                    <h4>Hour: {(index + 1) * 3}</h4>
                    <p>Weather feels like: {weather.main.feels_like}</p>
                    <p>Pressure: {weather.main.pressure}</p>
                    <p>Weather: {weather.weather[0].main}</p>
                    <p>Description {weather.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                </div>
            ))}
        </>
    )
}

export default WeatherData;