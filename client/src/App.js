/** @format */
import React, { useEffect } from "react"
import Login from "./components/Login"
import { useSelector, useDispatch } from "react-redux"
import { setUserId } from "./components/userSlice"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import { useNavigate } from "react-router-dom"

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = useSelector(store => store.user)

  useEffect(() => {
    if (userData.data.id === null) {
      navigate("/")
    } else if (userData.data.id !== null) {
      navigate("/dashboard")
    }
  }, [userData.data.id])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
