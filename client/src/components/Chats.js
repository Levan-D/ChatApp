/** @format */

import React from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { toggleChatSelection } from "./userSlice"
import { setCurrentChatIndex, setSelectedFriend } from "./indexingSlice"

const Chats = () => {
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)
  const indexingdata = useSelector(store => store.index)

  return (
    <ListGroup variant="flush">
      {userData.data.chats.map((chat, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => {
            dispatch(toggleChatSelection(index))
            dispatch(setCurrentChatIndex(index))
            dispatch(setSelectedFriend(chat.members))
          }}
          active={chat.selected}
        >
          {chat.members.map((member, index) => {
            if (userData.data.friends.find(x => x.id === member)) {
              return (
                <span>
                  {userData.data.friends.find(x => x.id === member).name}
                  {chat.members.length > 1 && index !== chat.members.length - 1 && (
                    <>, &nbsp;&nbsp;</>
                  )}
                </span>
              )
            } else
              return (
                <span>
                  {member}
                  {chat.members.length > 1 && index !== chat.members.length - 1 && (
                    <>, &nbsp;&nbsp;</>
                  )}
                </span>
              )
          })}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Chats
