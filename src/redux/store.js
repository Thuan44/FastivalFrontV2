import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './token'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
})