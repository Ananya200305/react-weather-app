import React, { useEffect, useState } from "react";
import LogoutBtn from "../logout/LogoutBtn";
import SearchBar from "./SearchBar";
import databaseService from "../../appwrite/database"; 
import { useSelector } from "react-redux";

export function History() {
  const [history, setHistory] = useState([]);
  const userData = useSelector((state) => state.auth.userData); 

  useEffect(() => {
    const fetchHistory = async () => {
      if (userData?.$id) {
        databaseService.setUserId(userData.$id);
        const docs = await databaseService.getUserWeatherHistory();

        // ✅ Filter duplicates based on city name, keep latest
        const uniqueByCity = Array.from(
          new Map(docs.map(item => [item.name, item])).values()
        );

        setHistory(uniqueByCity);
      }
    };

    fetchHistory();
  }, [userData]);

  return (
    <div className="flex h-screen w-screen gap-11">
      <div className="w-1/3 h-full bg-white/10 rounded-t-3xl ml-4 mt-4">
        <SearchBar />
      </div>

      <div className="w-2/3 h-full mt-4 pr-6 overflow-y-auto">
        <div className="absolute top-5 right-5 flex gap-4">
          <LogoutBtn />
        </div>

        <h2 className="text-2xl font-bold text-white mb-10 mt-5 ml-2">Search History</h2>

        <div className="grid grid-cols-2 gap-4">
          {history.length === 0 ? (
            <p className="text-white">No search history found.</p>
          ) : (
            history.map((item) => (
              <div
                key={item.$id}
                className="bg-white/20 hover:bg-white/30 hover:shadow-lg rounded-xl p-4 text-white shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                    alt={item.weather_main}
                    className="w-10 h-10"
                  />
                </div>
                <p>{item.weather_main} - {item.main_temp}°C</p>
                <p className="text-sm opacity-75">
                  {new Date(item.$updatedAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
