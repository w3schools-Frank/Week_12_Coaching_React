import './App.css';
import LocationForm from './components/LocationForm';
import WeatherData from './components/WeatherData';
import api from './api/weatherAPI';
import { useEffect, useState } from 'react';

function App() {

  const [forecast, setForecast] = useState(null);
  const [searchCounter, setSearchCounter] = useState(0);

  //Only on initial load of this component, call the `getWeatherDataFromGeolocation` function
  useEffect(() => {
    getWeatherDataFromGeolocation();
  }, [])

  //Every time the state variable 'forecast' gets updated, console.log "Hello from useEffect"
  useEffect(() => {
    console.log("Hello from useEffect")
  }, [forecast])

  //Every time the state variable 'searchCounter' gets updated, console.log "I am only doing this for searchCounter"
  useEffect(() => {
    console.log("I am only doing this for searchCounter")
  }, [searchCounter]);



  const handlerSubmitLocation = async (formData) => {
    const { city, state } = formData; //Getting the city and state properties from formData.

    try {
      //Make a request to the endpoint using our city and state
      const res = await api(`/forecast?q=${city},${state}&cnt=8&appid=${process.env.REACT_APP_API_KEY}`);
      console.log(res);
      setForecast(res.data);//Set `forecast` to the res.data object
      setSearchCounter(searchCounter + 1);
    } catch (error) {
      //If for whatever reason our request is unsuccessful, console.log "Something went wrong"
      console.log("Something went wrong")
    }
  }

  const getWeatherDataFromGeolocation = () => {
    console.log("Geolocation", navigator.geolocation);

    navigator.geolocation.getCurrentPosition(async (location) => { //Successful callback function. This code runs if the user ALLOWS the website to use their location
      console.log(location);
      const { latitude, longitude } = location.coords;

      try {
        //REACT_APP_API_KEY is a variable within my hidden .env file. You will need to get your own key for this
        const res = await api(`/forecast?lat=${latitude}&lon=${longitude}&cnt=3&appid=${process.env.REACT_APP_API_KEY}`);
        console.log(res);
      } catch (error) {
        console.log("Something went wrong with our geolocation request")
      }
    },
    (error) => { //Denied or Errored callback function. This code runs if the user DENIES the website to use their location
      console.log(error);
    })
  }


  return (
    <div className="App">
      <LocationForm handlerSubmitLocation={handlerSubmitLocation}/>

      {/* Conditional render the WeatherData component if forecast is truthy */}
      { forecast && <WeatherData forecast={forecast}/> } 
    </div>
  );
}

export default App;
