import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import audioReducer from './audioSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    audio: audioReducer
  },
})