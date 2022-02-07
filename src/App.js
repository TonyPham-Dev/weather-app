import React, { useEffect, useState } from "react";
// import Moment from "moment";
const DEFAULT_VALUE = "~~";
const API_KEY = "28c7ac69b7797bc3c50017e561b85db2";
const VALUE_DEFAULT = "Hai Duong";
function App() {
  const [valueInput, setValueInput] = useState("");
  const [saveValue, setSaveValue] = useState([]);
  const [data, setData] = useState("");
  const [sky, setSky] = useState("");
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState("");
  // const [sunrise, setSunrise] = useState("");
  // const [sunset, setSunSet] = useState("");
  const [humidity, setHumidity] = useState("");
  const [winds, setWind] = useState("");

  const handleValueInput = (e) => {
    setValueInput(e.target.value);
  };

  const handleSearch = () => {
    setSaveValue(valueInput);
    setValueInput("");
  };

  useEffect(async () => {
    async function fetchMyAPI() {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          saveValue || VALUE_DEFAULT
        }&appid=${API_KEY}&lang=vi`
      )
        .then((response) => await response.json())
        .then((dataWeather) => {
          setSky(dataWeather.weather[0].description);
          setIcon(dataWeather.weather[0].icon);
          setTemp(Math.floor(dataWeather.main.temp / 10));
          // setSunrise(
          //   Moment(dataWeather && dataWeather.sys.sunrise).format("H:mm")
          // );
          // setSunSet(Moment(dataWeather && dataWeather.sys.sunset).format("H:mm"));
          setHumidity(dataWeather.main.humidity);
          setWind((dataWeather.wind.speed * 3.6).toFixed(1));
          setData(dataWeather);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchMyAPI();
  }, [saveValue]);

  return (
    <div className="container">
      <div className="content-Top">
        <input
          className="input_search"
          value={valueInput}
          onChange={handleValueInput}
          placeholder="Nhập tên thành phố..."
        />
        <button onClick={handleSearch} type="submit" className="btn_search">
          Search
        </button>
      </div>

      <div className="parameter">
        <h4>{data.name || DEFAULT_VALUE}</h4>
        <p style={{ fontSize: "20px", color: "#333", fontWeight: "bold" }}>
          {sky || DEFAULT_VALUE}
        </p>

        <img
          className=""
          src={`http://openweathermap.org/img/wn/${icon}@2x.png` || null}
          alt="description of image"
        />
        <h1 className="temperature">{temp}</h1>
      </div>

      <div className="footer_weather">
        <div className="sun">
          <div className="weather_sun">
            <h3 style={{ margin: "0" }}>Mặt trời mọc</h3>
            {/* <p style={{ height: "0", margin: "0" }}>{sunrise}</p> */}
          </div>
          <div className="weather_sun">
            <h3 style={{ margin: "0" }}>Mặt trời Lặn</h3>
            {/* <p style={{ height: "0", margin: "0" }}>{sunset}</p> */}
          </div>
        </div>

        <div className="weather_wild">
          <div>
            <h3 style={{ margin: "0" }}>Độ ẩm</h3>
            <p style={{ height: "0", margin: "0" }}>{`${humidity} %`}</p>
          </div>
          <div>
            <h3 style={{ margin: "0" }}>Gió</h3>
            <p style={{ height: "0", margin: "0" }}>{`${winds} km/h`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
