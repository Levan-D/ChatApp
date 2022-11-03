/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentChatIndex: 0,
  selectedFriend: 0,
}

const indexingSlice = createSlice({
  name: `index`,
  initialState,
  reducers: {
    setCurrentChatIndex: (state, action) => {
      state.currentChatIndex = action.payload
    },
    setSelectedFriend: (state, action) => {
      state.selectedFriend = action.payload
    },
  },
})

export const { setCurrentChatIndex, setSelectedFriend } = indexingSlice.actions
export default indexingSlice.reducer


