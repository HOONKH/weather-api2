import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCertificate,
  FaCloud,
  FaCloudBolt,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaCloudSunRain,
  FaEyeLowVision,
} from "react-icons/fa6";
import { WiDust } from "react-icons/wi";
const weatherIcons = {
  "01": {
    textcolor: "text-orange-400",
    icon: <FaCertificate size={100} />,
  },
  "02": {
    textcolor: "text-gray-600",
    icon: <FaCloudSun size={100} />,
  },
  "03": {
    textcolor: "text-purple-600",
    icon: <FaCloud size={100} />,
  },
  "04": {
    textcolor: "text-purple-700",
    icon: <FaCloud size={120} />,
  },
  "09": {
    textcolor: "text-blue-400",
    icon: <FaCloudShowersHeavy size={100} />,
  },
  10: {
    textcolor: "text-amber-300",
    icon: <FaCloudSunRain size={100} />,
  },
  11: {
    textcolor: "text-blue-600",
    icon: <FaCloudBolt size={100} />,
  },
  13: {
    textcolor: "text-blue-200",
    icon: <FaEyeLowVision size={100} />,
  },
  50: {
    textcolor: "text-purple-200",
    icon: <WiDust size={100} />,
  },
};

const App = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState();

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.6538794&lon=126.8958214&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
      );

      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);
  useEffect(() => {
    if (!latitude || !longitude) return;
    getWeather();
  }, [longitude, latitude]);
  return (
    <div className="bg-purple-100 min-h-screen flex justify-center items-center text-3xl">
      {weatherData ? (
        <div
          className={`flex flex-col justify-center items-center gap-6 ${
            weatherIcons[weatherData.weather[0].icon.substring(0, 2)].textcolor
          }`}
        >
          {weatherIcons[weatherData.weather[0].icon.substring(0, 2)].icon}
          <div className="text-gray-600">
            {weatherData.name},{parseInt(weatherData.main.temp, 10)}도
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
