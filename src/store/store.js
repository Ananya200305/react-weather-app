import { configureStore } from "@reduxjs/toolkit"
import authSlice from '../feature/authSlice'
import weatherSlice from '../feature/weatherSlice'

const store = configureStore({
    reducer:{
        auth : authSlice,
        weather: weatherSlice
    }
})

export default store