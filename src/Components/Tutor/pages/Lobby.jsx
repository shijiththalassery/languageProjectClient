import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import TutNav from "../TutNav";
const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket?.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(

    (data) => {
      console.log(data, 'this is the data from the front end');
      const { email, room } = data;
      navigate(`/liveClass/${room}/${email}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen">
      <TutNav/>
        <div className="h-1/2 w-1/4 bg-slate-300 flex justify-center items-center rounded-xl shadow-xl">
        <h1
        className="pr-2 pl-2">create Session</h1>
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              className="rounded-lg shadow-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="room">Room Number</label>
            <input
              type="text"
              id="room"
              value={room}
              className="rounded-lg shadow-lg"
              onChange={(e) => setRoom(e.target.value)}
            />
            <br />
            <button 
            className="w-16  bg-blue-500 mt-2 rounded-md shadow-lg">Join</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
