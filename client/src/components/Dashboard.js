/** @format */

import Sidebar from "./Sidebar"
import OpenChat from "./OpenChat"
import React from "react"

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <OpenChat />
    </div>
  )
}

export default Dashboard
