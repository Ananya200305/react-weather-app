import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../../feature/authSlice'
import Button from '../button/Button'
import Input from '../input/Input'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


export function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPass, setShowPass] = useState(false)

  const {register, handleSubmit} = useForm()

  const [error, setError] = useState("")

  const onloginSubmit = async(data) => {
    setError("")
    try {
      const session = await authservice.loginAccount(data)
      console.log("Session:", session)
      if(session){
        const userData = await authservice.getCurrentUser()
        if(userData){
          dispatch(login(userData))
        }
        navigate('/history', { viewTransition: true })
      }
    } catch (error) {
      setError(error?.message || "Login failed")
    }
  }
  return (
      <div className='min-h-screen flex items-center justify-center w-full px-4'>
      <div className='w-full max-w-md bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-8'>
        <h2 className='text-center text-2xl mb-3 font-bold leading-tight text-white'>
          Sign in to your account
        </h2>
        <p className="mt-2 mb-9 text-center text-base text-white/60">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" viewTransition className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-5 text-center mb-8">{error}</p>}
        <form onSubmit={handleSubmit(onloginSubmit)}>
          <div className='space-y-10 p-2'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                autoComplete="off"
                className="p-2 ml-14 w-56"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <div className='relative'>
                  <Input
                  label="Password: "
                  type={showPass ? "text" : "password"}
                  className="p-2 ml-6 w-56"
                  placeholder="Enter your password"
                  {...register("password", {
                      required: true,
                  })}
                  />
                  <button type="button" className="absolute right-0.5 top-[21px]" onClick={() => setShowPass(prev => !prev)}><FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} /></button>
                </div>
                <Button
                type="submit"
                className="w-full bg-white/60 text-black hover:bg-white/50 mb-11"
                >Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

