import React, { useState } from 'react'
import TextType from '../animation/text-type/TextType'
import Input from '../input/Input'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchModal from '../weather/SearchModal';
import { getGeoCoding } from '../../utils/api';

function Home() {
    const [geoResults, setGeoResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [city, setCity] = useState("");

    const isLoggedIn = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const handleLookup = async () => {
        const trimmedCity = city.trim();

        if (!trimmedCity) {
            alert("Please enter a city name before checking the weather.");
            return;
        }

        try {
            const result = await getGeoCoding(trimmedCity);
            if (result.length === 0) {
                alert("City not found.");
            } else {
                setGeoResults(result);
                setShowModal(true);
            }
        } catch (error) {
            alert("Something went wrong while fetching city data.");
        }
    };

    const handleLocationSelect = (loc) => {
        setCity('');
        setShowModal(false);

        const slug = `${loc.name.toLowerCase()}-${loc.state?.toLowerCase() || "na"}-${loc.country.toLowerCase()}`;
        
        if (isLoggedIn) {
            navigate('/history', { replace: true });
            navigate(`/weather/${slug}`, { state: { location: loc }, viewTransition: true });
        } else {
            navigate('/login', { viewTransition: true });
        }
    };

    return (
        <div>
            <div className="relative z-10 flex flex-col items-center mt-60 min-h-screen px-4">
                <TextType
                    text={["Going out!", "or Just Curious", "Check the Weather!"]}
                    typingSpeed={60}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="_"
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center drop-shadow-lg"
                />
                <div className='flex flex-row justify-center mt-20'>
                    <Input
                        placeholder="Enter the city...."
                        className="w-96"
                        autoComplete="off"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <Button
                        children={"Check"}
                        className='bg-white/50 hover:bg-white/20 ml-5 p-4 w-40'
                        onClick={handleLookup}
                    />
                </div>

                {showModal && (
                    <div className='absolute top-[25%] left-[29%] w-full max-w-md z-10'>
                        <SearchModal
                            loc={geoResults}
                            onSelect={handleLocationSelect}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
