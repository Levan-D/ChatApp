/** @format */

import React, { useState, useCallback, useEffect } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import { sendMessage, updateChat, pushChat } from "./userSlice"
import io from "socket.io-client"

const OpenChat = () => {
  const dispatch = useDispatch()
  const indexingData = useSelector(store => store.index)
  const userData = useSelector(store => store.user)

  const [socket, setSocket] = useState()

  const [text, setText] = useState("")

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id: userData.data.id } })
    setSocket(newSocket)

    return () => newSocket.close()
  }, [userData.data.id, userData.data.chats])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(sendMessage({ senderId: userData.data.id, message: text, ...indexingData }))

    socket.emit(`send-message`, {
      chat: userData.data.chats[indexingData.currentChatIndex],
      msg: {
        date: Date.now(),
        senderId: userData.data.id,
        message: text,
        ...indexingData,
      },
    })
    setText("")
  }

  useEffect(() => {
    if (socket == null) return

    socket.on("receive-message", receiveMessage)

    return () => socket.off("receive-message")
  }, [socket, userData])

  function receiveMessage(newChat) {
    console.log(newChat)
    let trigger = true
    userData.data.chats.forEach((chat, i) => {
      if (chat.members.every(member => newChat.members.includes(member))) {
        dispatch(updateChat({ newChat: newChat, index: i }))
        trigger = false
      }
    })

    if (trigger) {
      dispatch(pushChat(newChat))
    }
    trigger = true
  }

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {userData.data.chats.length > 0 &&
            userData.data.chats[indexingData.currentChatIndex].messages.map((x, i) => (
              <div
                ref={setRef}
                key={x.date}
                className={`my-1 d-flex flex-column ${
                  x.senderId === userData.data.id
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    x.senderId === userData.data.id ? "bg-primary text-white" : "border"
                  }`}
                >
                  {x.message}
                </div>
                <div className={`text-muted small text-right`}>
                  <span>{x.senderId === userData.data.id ? "You" : x.senderId}</span>
                  &nbsp;
                  <span>{new Date(x.date).toLocaleString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: `75px`, resize: `none` }}
            />

            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default OpenChat
