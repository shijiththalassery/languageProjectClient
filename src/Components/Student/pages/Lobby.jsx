import React, { useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import StudNav from "../StudNav";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const LobbyScreen = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [email, setEmail] = useState("");
  // const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();


  const { id } = useParams();
  const emailss = localStorage.getItem('studentEmail');

  const email = emailss;
  const room = id;



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
      <StudNav />
      <div className=" h-screen bg-blue-200">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-10">
          <div className="md:col-span-7 bg-blue-200 w-full border border-black  ">
            <div className="w-full h-full bg-yellow-200 p4 rounded-lg shadow-lg">
              <div className=" mt-4  mx-2 me-2">
                <h1 className="text-center font-bold ">Your Assignment</h1>
              </div>
              <div className=" flex justify-between mx-2 me-2 mt-4 overflow-y-auto">
                <Button
                  variant="outlined"
                  boxShadow={10}
                  className="h-8 mr-2 shadow-md"
                  style={{ borderColor: '#1d3b53', color: '#1d3b53', borderRadius: '20px', boxShadow: ` 0 4px 6px rgba(0, 0, 0, 0.1)`, }}
                >
                  10/11/2023
                </Button>
                <Button
                  variant="outlined"
                  className="h-8 mr-2 rounded-xl"
                  onClick={handleOpen}
                  style={{ borderColor: '#1d3b53', color: '#1d3b53', borderRadius: '20px' }}
                >
                  Assignment
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                  </Box>
                </Modal>
                <Button
                  variant="outlined"
                  className="h-8 mr-2"
                  style={{ borderColor: '#1d3b53', color: '#1d3b53', borderRadius: '20px' }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  className="h-8 mr-2"
                  style={{ borderColor: 'red', color: 'red', borderRadius: '20px' }}
                >
                  Verified
                </Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 bg-green-200 w-full border border-black my-auto rounded-xl shadow-lg">
            <form onSubmit={handleSubmitForm} >
              <div className="text-center mb-4 mt-2">
                <h1 className=" mb-2 text center"><b>JOIN CLASS</b> </h1>
              </div>
              <div className="mt-2 flex justify-center items-center">
                <button className="w-32 rounded-lg shadow-xl bg-blue-500">PRESS HERE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
