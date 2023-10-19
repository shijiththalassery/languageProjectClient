import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../../Services/peer";
import { useSocket } from "../../../context/SocketProvider";
import TutorNavbar from "../TutorNavbar";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    const { room, email } = useParams();

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
        if (myStream) {
            // Stop the local stream
            myStream.getTracks().forEach((track) => {
                track.stop();
            });
            setMyStream(null); // Clear the local stream state
        }

        if (remoteStream) {
            // Stop the remote stream
            remoteStream.getTracks().forEach((track) => {
                track.stop();
            });
            setRemoteStream(null); // Clear the remote stream state
        }

        // Additional cleanup tasks may be required depending on your specific use case

        // Logic to notify the other user or perform necessary cleanup steps

        // Finally, set the remoteSocketId to null to indicate the call has ended
        setRemoteSocketId(null);
    };

    return (
        <div>
            <TutorNavbar />
            <div className="w-screen h-screen flex">
                <div className="w-2/3 h-screen ">
                    <h1>Room Page</h1>
                    <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
   
                    {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ flex: 1 }}>
                            <h1>My Stream</h1>
                            {myStream && <ReactPlayer playing muted height="100px" width="200px" url={myStream} />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1>Remote Stream</h1>
                            {remoteStream && <ReactPlayer playing muted height="100px" width="200px" url={remoteStream} />}
                        </div>
                        {remoteSocketId && (
                            <button
                                onClick={handleEndCall}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold h-2/3"
                            >
                                End Call
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-1/3 h-screen bg-blue-200">
                    <Chat emailId={email} roomId={room} />
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
