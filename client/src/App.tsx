import { useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import SocketIo from "socket.io-client"
import Chat from "./assets/components/Chat"

// connect front to backend
const socket = SocketIo('http://localhost:3001')

const App = () => {

  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  return (
    <Container fluid>
      {!showChat ? (
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8}>
            <Card className="mb-3 text-center">
              <Card.Body>
                <h3>Join a Chat</h3>
                <input
                  className="form-control"
                  type='text'
                  placeholder='John....'
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  className="form-control my-3"
                  type='text'
                  placeholder='Room Id'
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
                <button
                  className="btn btn-secondary w-100"
                  onClick={joinRoom}
                >
                  Join a room
                </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Chat
          socket={socket}
          userName={userName}
          room={room}
        />
      )}
    </Container >
  )
}

export default App