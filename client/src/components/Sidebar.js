/** @format */

import React, { useState } from "react"
import { Tab, Nav, Button, Modal } from "react-bootstrap"
import Chats from "./Chats"
import Friends from "./Friends"
import { useSelector } from "react-redux"
import NewChatModal from "./NewChatModal"
import NewFriendModal from "./NewFriendModal"

const Sidebar = () => {
  const [activeKey, setActiveKey] = useState("chats")
  const userData = useSelector(store => store.user)
  const [modalOpen, setModalOpen] = useState(false)
  const chatOpen = activeKey === "chats"

  const closeModal = () => {
    setModalOpen(false)
  }
  return (
    <div style={{ width: "290px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Link eventKey="chats">Chats</Nav.Link>
          <Nav.Link eventKey="friends">Friends</Nav.Link>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={"chats"}>
            <Chats />
          </Tab.Pane>
          <Tab.Pane eventKey={"friends"}>
            <Friends />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          Your Id: <br /> <span className="text-muted">{userData.data.id}</span>
        </div>
        <Button
          onClick={() => {
            setModalOpen(true)
          }}
          className="rounded-0"
        >
          New {chatOpen ? "Chat" : "Friend"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {chatOpen ? (
          <NewChatModal closeModal={closeModal} />
        ) : (
          <NewFriendModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default Sidebar
