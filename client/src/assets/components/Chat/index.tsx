import { useEffect, useState } from "react";
import { Card, Col, Nav, Row } from "react-bootstrap"
import { CameraFill, ImageFill, InfoCircleFill, MicFill, PlusCircleFill, SendFill, TelephonePlusFill } from "react-bootstrap-icons"

const Chat = ({ socket, userName, room }: any) => {

    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState<any>([])

    console.log(messageList);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            let messageData = {
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }

            await socket.emit('send_message', messageData);
            setMessageList([...messageList, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('received_message', (data: any) => {
            setMessageList([...messageList, data])
        })

        // keep scroll to bottom
        var chatHistory: any = document.getElementById("chat_body");
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, [messageList, socket])

    const current = new Date();
    const date: string = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    return (
        <Row className="justify-content-center">
            <Col xl={5} lg={6} md={8}>
                <Card>
                    <Card.Body className="p-0">
                        <Nav className="justify-content-between m-4">
                            <h4>Jane Doe</h4>
                            <div className="d-flex">
                                <h4 className="text-secondary me-4"><TelephonePlusFill className="cursor-pointer" /></h4>
                                <h4 className="text-secondary me-4"><CameraFill className="cursor-pointer" /></h4>
                                <h4 className="text-secondary"><InfoCircleFill className="cursor-pointer" /></h4>
                            </div>
                        </Nav>
                        <hr />
                        <div id="chat_body">
                            <p className="text-center">{date}</p>
                            {(messageList || []).map((message: any, index: number) => {
                                return (
                                    <>
                                        <ul
                                            className="message-content"
                                            key={index}
                                        >
                                            <li className="message">
                                                <span id={userName === message.author ? 'theres' : 'ours'}>{message.message}</span>
                                                <small className="align-self-end ms-2">{message.time}</small>
                                            </li>
                                        </ul>
                                    </>
                                )
                            })}
                        </div>
                        <hr />
                        <footer className="d-flex justify-content-between m-4">
                            <h4 className="text-secondary"><PlusCircleFill className="cursor-pointer" /></h4>
                            <h4 className="text-secondary"><CameraFill className="cursor-pointer" /></h4>
                            <h4 className="text-secondary"><ImageFill className="cursor-pointer" /></h4>
                            <h4 className="text-secondary"><MicFill className="cursor-pointer" /></h4>
                            <input
                                type='text'
                                id='message'
                                value={currentMessage}
                                onChange={(e: any) => {
                                    setCurrentMessage(e.target.value);
                                }}
                                onKeyPress={(e: any) => {
                                    e.key === 'Enter' && sendMessage();
                                }}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={sendMessage}
                            >
                                <SendFill className="cursor-pointer" />
                            </button>
                        </footer>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Chat