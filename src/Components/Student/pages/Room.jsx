import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../../Services/peer";
import { useSocket } from "../../../context/SocketProvider";
import StudentNavbar from "../navbarFooter/StudentNavbar";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import StudNav from "../StudNav";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const { room, email } = useParams();
  console.log(room, email, 'this is the use params room and email id')

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);


  const handleEndCall = () => {
    setCallAccepted(false);

    // You can add any cleanup logic here if needed.

    // Example cleanup:
    // Close the peer connection and streams
    peer.peer.close();

    // Close the user's stream
    myStream.getTracks().forEach(track => track.stop());
  };
  return (
    <div>
      <StudNav />

      <div className="h-screen w-screen flex">
        <div className="h-screen w-2/3 ">
          <h1>Room Page</h1>
          <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
          {myStream && !callAccepted && (
            <button onClick={sendStreams} className="bg-green-500 shadow-lg rounded-md">
              Accept call
            </button>
          )}
          <div className="flex justify-center" >
            {myStream && (
              <>
                <div className="flex-col" >
                  <h1 className="text-center"><b>You</b></h1>
                  <ReactPlayer
                    playing
                    muted
                    height="200px"
                    width="350px"
                    url={myStream}
                  />
                </div>
              </>
            )}
            {remoteStream && (
              <>
                <div className="flex-col">
                  <h1 className="text-center"><b>Tutor</b></h1>
                  <ReactPlayer
                    playing
                    muted
                    height="200px"
                    width="350px"
                    url={remoteStream}
                  />
                </div>
              </>
            )}
          </div>
          <div>
          {callAccepted && (
            <button onClick={handleEndCall} className="bg-red-500 shadow-lg rounded-md">
              End Call
            </button>
          )}
          </div>
        </div>
        <div className=" h-screen w-1/3 bg-blue-200">
          <Chat emailId={email} roomId={room} />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
