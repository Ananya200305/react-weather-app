import React, { useState } from 'react'
import TextType from '../animation/text-type/TextType'
import Input from '../input/Input'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom';
import authservice from '../../appwrite/auth';
import { useSelector } from 'react-redux';

function Home() {
    const [lookup, setLookup] = useState(() => parseInt(localStorage.getItem("lookup") || '0'));


    const isLoggedIn = useSelector((state) => state.auth.status)

    const [city, setCity] = useState("")

    const navigate = useNavigate();

    const handleLookup = async () => {
        const trimmedCity = city.trim()

        if(!trimmedCity){
            alert("Please enter a city name before checking the weather.")
            return
        }

        if(lookup >= 2){
          if (isLoggedIn) {
            navigate('/history', { viewTransition: true })
          } else {
            navigate('/login', { viewTransition: true })
          }
        }else{
            const updatedLookup = lookup+1
            setLookup(updatedLookup)
            localStorage.setItem("lookup", updatedLookup.toString())

            console.log("Call API")
            setCity('')
        }
    }

  return (
    <div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <TextType
          text={["Going out!", "or Just Curious", "Check the Weather!"]}
          typingSpeed={60}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center drop-shadow-lg"
        />
        <div className='flex flex-row justify-center m-20'>
          <Input placeholder="Enter the city...." className="w-96" autoComplete="off" value={city} onChange = {(e) => setCity(e.target.value)}/>
          <Button children={"Check"} className='bg-white/50 hover:bg-white/20 ml-5 p-4 w-40' onClick={handleLookup}/>
        </div>
      </div>
    </div>
  )
}

export default Home
