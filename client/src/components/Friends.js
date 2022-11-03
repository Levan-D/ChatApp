/** @format */

import React from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"

const Friends = () => {
  const userData = useSelector(store => store.user)

  return (
    <ListGroup>
      {userData.data.friends.map(friend => (
        <ListGroup.Item key={friend.id}>{friend.name}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Friends
