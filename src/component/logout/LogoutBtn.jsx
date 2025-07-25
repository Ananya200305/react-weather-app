import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {login, logout} from '../../feature/authSlice'
import authservice from '../../appwrite/auth'

function LogoutBtn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authservice.logoutAccount().then(() => {
            dispatch(logout())
            navigate('/', {viewTransition: true})
        })
    }
  return (
    <div>
      <button className='bg-black px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black  rounded-full' onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn
