import axios from "axios";
import conf from "../conf/conf";

const BASE_URL = "https://api.openweathermap.org/data/2.5"
const GEO_URL = "https://api.openweathermap.org/geo/1.0"

export const getGeoCoding = async (cityName) => {
    try {
        const res = await axios.get(`${GEO_URL}/direct`,{
            params: {
                q: cityName,
                limit: 5,
                appid: conf.openWeatherApi,
            },
        });
        return res.data;
    } catch (error) {
        console.error("GeoCoding Error", error)
        throw new Error("Failed to fetch location suggestions.");
    }
};

export const getCurrentWeather = async (lat, lon) => {
    try {
        const res = await axios.get(`${BASE_URL}/weather`,{
            params: {
                lat,
                lon,
                appid: conf.openWeatherApi,
                units: "metric",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Current weather", error);
        throw new Error("Failed to fetch current weather.");
    }
};

export const getHourlyWeather = async (lat, lon) => {
    try {
        const res = await axios(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                cnt: 4,
                appid: conf.openWeatherApi,
                units: "metric",
            },
        });

        if (!res.data || !Array.isArray(res.data.list)) {
            throw new Error("Invalid response structure from hourly forecast.");
        }

        return res.data;
    } catch (error) {
        console.error("Hourly forecast error:", error);
        return null;
    }
};

export const getNoonForecast = async (lat,lon) => {
    try {
        const res = await axios(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: conf.openWeatherApi,
                units: "metric",
            },
        });
        const data = res.data.list

        const dailyForecast = [];
        const seenDates = new Set();

        for(const entry of data){
            const date = entry.dt_txt.split(" ")[0];
            const time = entry.dt_txt.split(" ")[1];

            if(time === "12:00:00" && !seenDates.has(date)){
                dailyForecast.push(entry);
                seenDates.add(date)
            }

            if(dailyForecast.length === 5) break;
        }

        return dailyForecast
    } catch (error) {
        console.error("Noon Forecast Error", error)
        throw new Error("Failed to fetch 12PM daily forecast.");
    }
}