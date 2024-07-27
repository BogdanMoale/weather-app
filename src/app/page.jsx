"use client";

// import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Weather from "../components/Weather";
import Spinner from "../components/Spinner";

// // Define background images for different weather conditions
// const weatherBackgrounds = {
//   Clear:
//     "https://images.stockcake.com/public/2/6/a/26abd9e8-49b0-4f0d-89c1-3869b485b10e/clear-sky-day-stockcake.jpg",
//   Clouds:
//     "https://images.stockcake.com/public/8/5/5/85539e9e-04a4-46ad-b805-05a237ec8e3d/dramatic-cloud-formation-stockcake.jpg",
//   Rain: "https://images.stockcake.com/public/0/b/e/0beaec5f-d13a-4f8e-9c44-cf34450729c4/rainbow-amidst-rain-stockcake.jpg",
//   Snow: "https://images.stockcake.com/public/e/0/9/e0948bed-df95-41df-974b-d697011227a4_large/winter-wonderland-scene-stockcake.jpg",
//   Thunderstorm:
//     "https://images.stockcake.com/public/5/0/9/5090f8d3-5fbe-4488-9487-13fb6c06df1e_large/thunderstorm-over-sea-stockcake.jpg",
//   Mist: "https://images.stockcake.com/public/f/9/b/f9bca236-08d9-446f-8ae8-de8e51ac2af3/city-amidst-fog-stockcake.jpg",
// };

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        const data = response.data;

        // Convert temperature from Fahrenheit to Celsius
        data.main.temp = ((data.main.temp - 32) * 5) / 9;
        data.main.feels_like = ((data.main.feels_like - 32) * 5) / 9;
        data.main.temp_min = ((data.main.temp_min - 32) * 5) / 9;
        data.main.temp_max = ((data.main.temp_max - 32) * 5) / 9;

        // Convert wind speed from MPH to KPH
        data.wind.speed = data.wind.speed * 1.60934;

        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
    setCity("");
  };

  // // Determine the background image based on weather condition
  // const weatherCondition = weather.weather?.[0]?.main;
  // const backgroundImage = weatherCondition
  //   ? weatherBackgrounds[weatherCondition]
  //   : "";

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      {/* Background image */}
      {/* {backgroundImage && (
        <Image
          src={backgroundImage}
          layout="fill"
          className="object-cover"
          alt="background"
        />
      )} */}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Search */}
        <form
          onSubmit={fetchWeather}
          className="flex items-center p-4 bg-gray-800 bg-opacity-60 rounded-xl shadow-lg mb-6 w-full max-w-md"
        >
          <input
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-lg px-4 py-2 rounded-l-lg focus:outline-none"
            type="text"
            placeholder="Search city"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center"
          >
            <BsSearch size={20} />
          </button>
        </form>

        {/* Weather */}
        {loading ? (
          <Spinner />
        ) : weather.main ? (
          <Weather data={weather} />
        ) : (
          <p className="text-gray-300">
            Please search for a city to see the weather.
          </p>
        )}
      </div>
    </div>
  );
}
