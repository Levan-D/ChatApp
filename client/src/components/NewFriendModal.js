/** @format */

import React, { useRef, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import verify from "./VerifyId"
import { createFriend } from "./userSlice"
import { useSelector, useDispatch } from "react-redux"

const NewFriendModal = ({ closeModal }) => {
  const dispatch = useDispatch()
  const [error, setError] = useState(false)

  const idRef = useRef()
  const nameRef = useRef()
  const userData = useSelector(store => store.user)

  const handleSubmit = e => {
    e.preventDefault()
    if (verify(idRef.current.value)) {
      if (
        userData.data.friends.find(object => object.id === idRef.current.value) !==
        undefined
      ) {
        setError(`Friend already added`)
      } else {
        dispatch(createFriend({ id: idRef.current.value, name: nameRef.current.value }))
        setError("")
        closeModal()
      }
    } else setError(` Error: Your id is incorrectly formatted`)
  }
  return (
    <>
      <Modal.Header closeButton>Create Conntact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Label>Id</Form.Label>
              <div className="text-danger  ">{error}</div>
            </div>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit" className="mt-3" style={{ width: `100%` }}>
            Add a Friend
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewFriendModal
