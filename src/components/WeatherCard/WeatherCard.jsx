import "./WeatherCard.css";
import { weatherCards, defaultWeatherCards } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const filterWeatherCard = weatherCards.filter((weatherCard) => {
    return (
      weatherCard.day === weatherData.isDay &&
      weatherCard.condition === weatherData.condition
    );
  });

  //let weatherCard;
  const isDefault = filterWeatherCard.length === 0;

  // if (isDefault) {
  //  weatherCard = defaultWeatherCards[weatherData.isDay ? "day" : "night"];
  // } else {
  //   weatherCard = filterWeatherCard[0];
  //}

  const weatherCard = isDefault
    ? defaultWeatherCards[weatherData.isDay ? "day" : "night"]
    : filterWeatherCard[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp?.[currentTempUnit]} &deg; {currentTempUnit}
      </p>
      <img
        src={weatherCard?.url}
        alt={`${
          isDefault
            ? `Default ${weatherCard} card`
            : `${weatherCard?.condition} weather at ${
                weatherCard?.day ? "day" : "night"
              }`
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
