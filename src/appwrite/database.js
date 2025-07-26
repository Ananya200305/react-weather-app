import { Client, Databases, Query, ID } from "appwrite";
import conf from "../conf/conf";
import { getCurrentWeather, getHourlyWeather, getNoonForecast } from "../utils/api";

export class DatabaseService {
    client = new Client()
    databases;
    DB_ID = conf.appwriteDatabaseId
    COLLECTION_ID = conf.appwriteCollectionId
    CACHE_DURATION = 15 * 60 * 1000;
    userId = null;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
    }

    setUserId(userId) {
        this.userId = userId;
    }

    async getCachedWeather(location){
        if (!this.userId) {
            console.log("Guest user — skipping cache fetch.");
            return null;
        }
        try {
            const response = await this.databases.listDocuments(this.DB_ID, this.COLLECTION_ID, [
                Query.equal('lat', location.lat),
                Query.equal('long', location.lon)
            ]);

            if(response.total === 0) return
            const doc = response.documents[0];
            const lastUpdated = new Date(doc.updatedAt).getTime();
            const now = Date.now();

            return (now - lastUpdated < this.CACHE_DURATION) ? doc : null;
        } catch (error) {
            console.error("Error fetching cached weather:", error);
            return null;
        }
    }

    async saveOrUpdateWeather(location){
        
        if (!this.userId) {
            throw new Error("User ID not set. Please set it using setUserId().");
        }

        try {
            const weatherData = await getCurrentWeather(location.lat, location.lon)
            const hourlyData = await getHourlyWeather(location.lat, location.lon)
            const noonForecast = await getNoonForecast(location.lat, location.lon)

            const safeHourlyList = Array.isArray(hourlyData?.list) ? hourlyData.list.slice(0, 4) : [];
            const safeNoonList = Array.isArray(noonForecast?.list) ? noonForecast.list.slice(0, 4) : [];

            const weatherDoc = {
                user_id : this.userId,
                name: weatherData.name,
                weather_main: weatherData.weather[0].main,
                main_temp: weatherData.main.temp,
                icon: weatherData.weather[0].icon,
                feels_like: weatherData.main.feels_like,
                wind: weatherData.wind.speed,
                humidity: weatherData.main.humidity,
                visibility: weatherData.visibility,
                lat: weatherData.coord.lat,
                long: weatherData.coord.lon,
                timestamp: new Date().toISOString(),
                forecast: JSON.stringify(safeHourlyList),
                dayForecast: JSON.stringify(safeNoonList)
            }

            if (this.userId) {
                const existingDoc = await this.getCachedWeather(location);
                if (existingDoc) {
                    await this.databases.updateDocument(this.DB_ID, this.COLLECTION_ID, existingDoc.$id, weatherDoc);
                } else {
                    await this.databases.createDocument(this.DB_ID, this.COLLECTION_ID, ID.unique(), weatherDoc);
                }
            } else {
                console.log("Guest user — skipping DB save.");
            }

            return weatherDoc;
        } catch (error) {
            console.error("Error saving/updating weather:", error);
            throw new Error("Failed to fetch and store weather data.");
        }
    }

    async getUserWeatherHistory() {
        if (!this.userId) {
            throw new Error("User ID not set. Use setUserId(userId) before calling this method.");
        }

        try {
            const response = await this.databases.listDocuments(this.DB_ID, this.COLLECTION_ID, [
                Query.equal("user_id", this.userId),
                Query.orderDesc("$updatedAt"),
            ]);

            return response.documents;
        } catch (error) {
            console.error("Error fetching search history:", error);
            return [];
        }
    }

}

const databaseService = new DatabaseService();
export default databaseService;