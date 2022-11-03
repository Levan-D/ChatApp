/** @format */

import React, { useRef, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { setUserId } from "./userSlice"
import { useSelector, useDispatch } from "react-redux"
import { v4 as idGenerator } from "uuid"
import verify from "./VerifyId"

const Login = () => {
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)
  const idRef = useRef()
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (verify(idRef.current.value)) {
      setError(false)
      dispatch(setUserId(idRef.current.value))
    } else setError(true)
  }
  const createNewId = e => {
    e.preventDefault()
    setError(false)
    dispatch(setUserId(idGenerator()))
  }
  return (
    <Container className="align-items-center d-flex" style={{ height: `100vh` }}>
      <Form className="w-100" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <Form.Label>Enter Your Id</Form.Label>
          {error && (
            <div className="text-danger  ">Error: Your id is incorrectly formatted</div>
          )}
        </div>
        <Form.Control type="text" required ref={idRef}></Form.Control>
        <Button type="submit" className="my-2 me-2">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">
          Create a New Id
        </Button>
      </Form>
    </Container>
  )
}

export default Login
