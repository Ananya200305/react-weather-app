import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import databaseService from '../appwrite/database';

// Async thunk to fetch weather
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ location, userId }, { rejectWithValue }) => {
    try {
      // Set userId (can be null for guest)
      databaseService.setUserId(userId);

      // Try cache only if user is logged in
      let cached = null;
      if (userId) {
        cached = await databaseService.getCachedWeather(location);
        if (cached) {
          console.log('Using cached weather');
          return cached;
        }
      }

      // Fetch fresh data and optionally store
      const fresh = await databaseService.saveOrUpdateWeather(location);
      return fresh;

    } catch (error) {
      console.error('Weather fetch failed:', error);
      return rejectWithValue('Failed to fetch weather data.');
    }
  }
);

// Redux slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    clearWeather: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;