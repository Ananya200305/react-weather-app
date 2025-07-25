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

export function Signup() {

  const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/history" , {viewTransition: true})
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full px-4'>
      <div className='w-full max-w-lg bg-white/10 border border-white rounded-xl p-10'>
        <h2 className='text-center text-2xl mb-3 font-bold leading-tight text-white'>
          Sign in to your account
        </h2>
        <p className="mt-2 mb-9 text-center text-base text-white/60">
          Already have an account?&nbsp;
          <Link to="/login" viewTransition className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-5 text-center mb-8">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-10 p-2'>
            <Input
                label="Name: "
                placeholder="Enter your full name"
                className="p-2 ml-9 w-48"
                type="text"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                className="p-2 ml-9 w-48"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="text"
                className="p-2 ml-9 w-48"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full bg-white/60 text-black hover:bg-white/50 mb-11"
                >Create Account</Button>
            </div>
        </form>
      </div>
    </div>
  )
}


