import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './chat.css'

let socket;
const Chat = ({ emailId, roomId }) => {
    const email = emailId;
    const roomNo = roomId;

    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const socketUrl = 'speaksphere.shop'

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const user = email
        const room = roomNo

        setUser(user)
        setRoom(room)

        socket = io(socketUrl);



        socket.emit('join', { user, room }, (err) => {
            if (err) {
                alert(err)
            }
        })

        return () => {
            // User leaves room
            socket.disconnect();

            socket.off()
        }

    }, [socketUrl, window.location.search])

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(prevMsg => [...prevMsg, msg])

            setTimeout(() => {

                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight - div.clientWidth;
            }, 10)
        })

        socket.on('roomMembers', usrs => {
            setUsers(usrs)
        })
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('sendMessage', message, () => setMessage(""))
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight;
        }, 100)
    }

    return (
        <div className="container mt-4 ">
            <div className="flex flex-col chat-window" id="chat_window_1">
                <div className="w-1/3">
                    <p className="font-semibold">Active Users</p>
                    <ul>
                        {users.map((e, i) => (
                            <li key={i}>{e.user}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-full h-5/6 me-4 border border-blue-500 ">
                    <div className="border rounded-lg shadow-md overflow-y-auto h-96">
                        <div className="p-4 bg-blue-500 text-white ">
                            <h3 className="text-lg">
                                <span className="text-xl">&#128172;</span> CHAT WITH YOUR TUTOR
                            </h3>
                        </div>
                        <div className="p-4 bg-white max-h-80 border-border-black overflow-y-auto h-64" id="chat_body">
                            {messages.map((e, i) => (
                                e.user === user?.toLowerCase() ? (
                                    <div key={i} className="flex items-end mb-2">
                                        <div className="flex-1 ml-2">
                                            <div className="bg-blue-200 rounded-lg p-2">
                                                <p>{e.text}</p>
                                                <time className="text-xs">{e.user}</time>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={i} className="flex items-end justify-end mb-2">
                                        <div className="flex-1 mr-2">
                                            <div className="bg-green-200 rounded-lg p-2">
                                                <p>{e.text}</p>
                                                <time className="text-xs">{e.user}</time>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="p-4 bg-white">
                            <div className="flex">
                                <input
                                    id="btn-input"
                                    type="text"
                                    value={message}
                                    onKeyDown={(event) =>
                                        event.key === 'Enter' ? sendMessage(event) : null
                                    }
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="flex-1 border border-gray-300 rounded-lg py-1 px-2 focus:outline-none"
                                    placeholder="Write your message here..."
                                />
                                <button
                                    onClick={(event) => sendMessage(event)}
                                    className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
        </div>

    )
}

export default Chat;