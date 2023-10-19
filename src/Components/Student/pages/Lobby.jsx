import React, { useState, useCallback, useEffect } from "react";
import StudentNavbar from "../navbarFooter/StudentNavbar";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/liveSession/${room}/${email}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <StudentNavbar />
      <div className="w-screen h-screen bg-slate-100">
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-1/3 h-1/4 bg-slate-300  flex justify-center mx-auto rounded-xl shadow-xl">
            <form onSubmit={handleSubmitForm} >
              <div className="text-center mb-4 mt-2">
                <h1 className=" mb-2 text center"><b>JOIN CLASS</b> </h1>
              </div>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                value={email}
                className="rounded-lg shadow-lg mb-2 ml-14"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="room">Room Number</label>
              <input
                type="text"
                id="room"
                value={room}
                className="rounded-lg shadow-lg mb-2 ml-3"
                onChange={(e) => setRoom(e.target.value)}
              />
              <br />
              <div className="mt-2 flex justify-center items-center">
                <button className="w-20 rounded-lg shadow-xl bg-blue-500">Join</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
