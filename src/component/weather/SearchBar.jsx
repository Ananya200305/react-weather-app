import { useState } from "react";
import { getGeoCoding } from "../../utils/api";
import SearchModal from "./SearchModal";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const data = await getGeoCoding(query);
      if (data.length === 0) {
        setError("Not Found");
        setResults([]);
        setShowDropdown(false);
      } else {
        setError("");
        setResults(data);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to fetch location data.");
    }
  };

  const handleSelect = (location) => {
    console.log("Selected:", location);
    setShowDropdown(false);
    setQuery(`${location.name}, ${location.country}`);
    const slug = `${location.name.toLowerCase()}-${location.state?.toLowerCase() || "na"}-${location.country.toLowerCase()}`
    navigate(`/weather/${slug}`, {state: {location}, viewTransition: true})
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-transparent placeholder:text-black p-3 focus:border-white bg-white/30 text-black shadow-md outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/50 hover:bg-white/20 text-black rounded-full shadow transition"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-700 mt-2 text-center">{error}</div>}

      {showDropdown && <SearchModal loc={results} onSelect={handleSelect} />}
    </div>
  );
};

export default SearchBar;
