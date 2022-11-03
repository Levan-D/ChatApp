/** @format */

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: {
    id: null,
    friends: [],
    chats: [],
  },
}

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.data.id = action.payload
    },
    createFriend: (state, action) => {
      state.data.friends.push(action.payload)
    },
    createChat: {
      reducer: (state, action) => {
        state.data.chats.push(action.payload)
      },
      prepare: ({ all, sender, chatId }) => {
        return {
          payload: {
            members: all,
            chatId: chatId,
            senderId: sender,
            selected: false,
            messages: [],
          },
        }
      },
    },
    updateChat: (state, action) => {
      state.data.chats[action.payload.index] = action.payload.newChat
    },
    pushChat: (state, action) => {
      state.data.chats.unshift(action.payload)
    },
    toggleChatSelection: (state, action) => {
      state.data.chats.forEach(x => (x.selected = false))
      state.data.chats[action.payload].selected = true
    },
    sendMessage: (state, action) => {
      state.data.chats[action.payload.currentChatIndex].messages.push({
        message: action.payload.message,
        senderId: action.payload.senderId,
        date: Date.now(),
      })
    },
  },
})

export const {
  setUserId,
  createFriend,
  createChat,
  toggleChatSelection,
  sendMessage,
  updateChat,
  pushChat,
} = userSlice.actions
export default userSlice.reducer
