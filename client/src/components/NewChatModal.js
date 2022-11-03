/** @format */

import React, { useState, useEffect } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { createChat } from "./userSlice"
import { v4 as idGenerator } from "uuid"

const NewChatModal = ({ closeModal }) => {
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)

  const [selectedContactIds, setSelectedContactIds] = useState([])

  const handleSubmit = e => {
    let checker = false
    e.preventDefault()
    if (selectedContactIds.length !== 0) {
      if (userData.data.chats.length !== 0) {
        userData.data.chats.forEach(chat => {
          if (chat.members.length !== selectedContactIds.length) {
            return
          } else if (selectedContactIds.every(v => chat.members.includes(v))) {
            checker = true
          }
        })
      }
      if (!checker) {
        dispatch(
          createChat({
            chatId: idGenerator(),
            sender: userData.data.id,
            all: selectedContactIds,
          })
        )
      }
    }
    checker = false
    closeModal()
  }

  const handleCheckboxChange = contactId => {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }
  return (
    <>
      <Modal.Header closeButton>Create a Chat</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {userData.data.friends.map(friend => (
            <Form.Group controlId={friend.id} key={friend.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(friend.id)}
                label={friend.name}
                onChange={() => handleCheckboxChange(friend.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="mt-3" style={{ width: `100%` }}>
            Create Chat
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewChatModal
