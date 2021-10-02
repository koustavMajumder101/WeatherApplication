import React, { useState, useEffect } from "react";
import "../custom css/weather.css";
import DATE_ARRAY from "../GlobalVariables/DayArray";
import MONTH_ARRAY from "../GlobalVariables/MonthArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faCalendarWeek,
  faWindowClose,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const api = {
  // to get the api_key ho to openweathermap sign in and go to "api key" section to grab api key or you can create one as well.

  key: "f39a14a405ce4932b81c9c8b4e65de73",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = (props) => {
  const [query, setQuery] = useState("");
  const [fetchCondition, setFetchCondition] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [dt, setDt] = useState("");

  useEffect(() => {
    setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);
    // 1000 milisecond = 1 sec
  }, [dt]);

  /* it will work too   ... without the dependency  
  useEffect(() => {
    setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);
    // 1000 milisecond = 1 sec
  }, [dt]);
   */

  // every time the dt value is changed which is in every 1 sec useEffect is going to re-render the component!!

  //this function is to get the current date here dateArgument is current date passed as new Date();
  const dateBuilder = (dateArgument) => {
    let day = DATE_ARRAY[dateArgument.getDay()];
    let date = dateArgument.getDate();
    let month = MONTH_ARRAY[dateArgument.getMonth()];
    let year = dateArgument.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const dataFetch = (condition) => {
    if (condition === fetchCondition) {
      // units=metric ---> to get the data in deg cel otherwise it will give the data in fenhite
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeatherData(result);
          setQuery("");
          // console.log(result);
        });
    }
    setFetchCondition(false);
  };

  const search = (event) => {
    if (event.key === "Enter") {
      clickListner();
    }
  };

  const clickListner = () => {
    setFetchCondition(true);
    dataFetch(fetchCondition);
  };
  //console.log("date-time", dt);

  // here we are splitting the date-time result
  var time = dt.split(",");
  // time will be an array
  //time[0] ---> here we will have the date value
  //time[1] ---> here we have the time value, so we need to use time[1] to get the time.

  return (
    <div
      className={
        typeof weatherData.main != "undefined"
          ? weatherData.main.temp > 15
            ? weatherData.main.humidity >= 80
              ? "app-rain"
              : "app"
            : "app-cold"
          : "app-default"

        /* 
            typeof weatherData.main != "undefined"
          ? (weatherData.main.temp > 15?(weatherData.main.humidity >= 80?("app-rain"):("app")):("app-cold"))
          : ("app-default")
          */
      }
    >
      <main>
        <div className="search-bar">
          <div className="inputGroup">
            <div className="form-outline">
              <input
                type="text"
                className="form-control "
                placeholder="search.."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={search}
              />
              {query === "" ? (
                ""
              ) : (
                <i className="icon">
                  <FontAwesomeIcon
                    className="cross-btn"
                    icon={faTimes}
                    onClick={() => setQuery("")}
                  />
                </i>
              )}
            </div>
          </div>
          <button type="button" className="btn btn-dark" onClick={clickListner}>
            <i>
              <FontAwesomeIcon icon={faSearch} />
            </i>
          </button>
        </div>
        {
          /* 
                    // here we are checking if weatherData is present or not by this ---> weatherData ?
                    weatherData ? (<div>
                        <div className="location-box">
                             <div className="location">{weatherData.name}, {weatherData.sys.country}</div>
                                 <div className="date">
                                     
                                       {dateBuilder(new Date())}
                                </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                 {Math.round(weatherData.main.temp)}°C
                            </div>
                        <div className="weather">
                            {weatherData.weather[0].main}
                        </div>
                        <div className="Max-Min">
                            Max Temp: {weatherData.main.temp_max} °C | Min Temp: {weatherData.main.temp_min} °C                            
                         </div>
                         <div className="Max-Min">
                             Humidity : {weatherData.main.humidity}                            
                         </div>
                         <div className="Max-Min">
                             <span><FontAwesomeIcon icon={faClock}/> : {time[1]}  IST</span>                            
                         </div>
                        </div>
                    </div>):(<div className="Error">
                            No Data Found !!
                         </div>)
                    !
                    
                    */
          typeof weatherData.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weatherData.name}, {weatherData.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="weather">{weatherData.weather[0].main}</div>
                <div className="Max-Min">
                  Max Temp: {weatherData.main.temp_max} °C | Min Temp:{" "}
                  {weatherData.main.temp_min} °C
                </div>
                <div className="Max-Min">
                  Humidity : {weatherData.main.humidity}
                </div>
                <div className="Max-Min">
                  <span>
                    <FontAwesomeIcon icon={faClock} /> : {time[1]} IST
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="Error">No Data Found !!</div>
          )
        }
      </main>
    </div>
  );
};

export default Weather;
