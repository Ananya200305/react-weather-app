const SearchModal = ({ loc = [], onSelect }) => {
  if (!loc || loc.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 mt-2 bg-transparent z-50 max-w-md mx-auto">
      <ul className="p-4 space-y-2">
        {loc.map((location, index) => (
          <li
            key={index}
            onClick={() => onSelect(location)}
            className="cursor-pointer p-3 text-center bg-white/10 text-white shadow-md rounded-full hover:bg-gray-100 hover:text-black transition"
          >
            {location.name}, {location.state ? location.state + ", " : ""}
            {location.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchModal;
