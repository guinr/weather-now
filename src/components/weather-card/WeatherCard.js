import "./WeatherCard.css";
import axios from "axios";
import loader from '../../imgs/loader.svg';
import { useEffect, useState } from "react";
import { addMinutes, convertKelvinToCelsius, formatAMPM } from "../../utils/utils";

function WeatherCard(props) {

  const [loadedCity, setLoadedCity] = useState();
  let [retries, setRetries] = useState(0);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const city = props.city;

    if (!city) return;

    const getData = async () => {
      setLoadedCity(undefined);

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&APPID=${apiKey}`)
        const info = response.data.main;

        city.lastUpdated = new Date();
        city.temp = convertKelvinToCelsius(info.temp);
        city.humidity = info.humidity;
        city.pressure = info.pressure;

        setLoadedCity(city)
        localStorage.setItem(city.name, JSON.stringify(city));
      } catch (error) {
        setLoadedCity({ error })
      }
    }

    const cached = localStorage.getItem(city.name);

    if (cached) {
      const cachedCity = JSON.parse(cached);
      if (addMinutes(new Date(cachedCity.lastUpdated), 10) > new Date()) {
        cachedCity.lastUpdated = new Date(cachedCity.lastUpdated);
        setLoadedCity(cachedCity);
      } else {
        getData();
      }
    } else {
      getData();
    }

    setInterval(() => {
      getData();
    }, 60 * 10 * 1000);
    
  }, [props.city, retries])

  const getColorByTemperature = (temperature) => {
    if (temperature <= 5) {
      return "cold";
    } else if (temperature > 5 && temperature < 25) {
      return "warm";
    } else {
      return "hot";
    }
  }

  const renderSomethingWentWrong = () => {
    return (
      <div className="card-body-error">
        <h3 className="card-body-error-message">Something went wrong</h3>
        <button className="card-body-error-button" onClick={() => setRetries(retries + 1)}>Try Again</button>
      </div>
    )
  }

  const renderCardMoreInfo = () => {
    return (
      <div className="card-extra-info">
        <h3>HUMIDITY</h3>
        <h3>PRESSURE</h3>
        <h2>{loadedCity.humidity}%</h2>
        <h2>{loadedCity.pressure}hPa</h2>
      </div>
    )
  }

  const renderInfo = () => {
    return (
      <>
        <div className={`card-body ${getColorByTemperature(loadedCity.temp)}`}>{loadedCity.temp}°</div>
        <footer className="card-footer">
          {loadedCity.moreInfo && renderCardMoreInfo()}
          <span>Updated at {formatAMPM(loadedCity.lastUpdated)}</span>
        </footer>
      </>
    )
  }

  const renderLoader = () => {
    return (
      <figure className="loader">
        <img src={loader} alt="Loader" />
      </figure>
    )
  }

  return (
    <>
    {props.city &&
      <section className={props.city.moreInfo ? 'card-more-info' : ''}>
        <h3 className="card-header">{props.city.name}, {props.city.country}</h3>
        {loadedCity ? loadedCity.error ? renderSomethingWentWrong() : renderInfo() : renderLoader()}
      </section>
    }
    </>
  );
}

export default WeatherCard;
