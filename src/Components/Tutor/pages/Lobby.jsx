import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import TutNav from "../TutNav";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

const LobbyScreen = () => {


  // const [email, setEmail] = useState("");
  // const [room, setRoom] = useState("");

  const { id } = useParams();
  const email = localStorage.getItem('tutorEmail')
  const room = id;


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

  // {handleSubmitForm}

  return (
    <div className="w-full h-full">
      <TutNav />

      <div className="grid w-full h-screen sm:w-full sm:h-screen grid-cols-1 sm:grid-cols-1 md:grid-cols-1 border border-yellow-100 relative p-4 shadow-lg">
        <div className="w-full h-full sm:w-full sm:h-screen  shadow-lg shadow-black">
          <h1 className="text-center"><b>PRESS BUTTON TO START CLASS</b></h1>
          <div className="w-1/2 h-1/2 sm:w-1/2 sm:h-1/2 absolute inset-0 m-auto   flex justify-center">
            <Button
              variant="outlined"
              className="h-8 mr-2 mt-2 m-auto"
              style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
              onClick={handleSubmitForm}
            >
              Start Class
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LobbyScreen;
