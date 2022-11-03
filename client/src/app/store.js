/** @format */

import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../components/userSlice"
import indexReducer from "../components/indexingSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    index: indexReducer,
  },
})
