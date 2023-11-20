import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import TutNav from "../TutNav";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axiosInstance from "../../../api/axiosInstance";
import { GrAdd } from "react-icons/gr";


const LobbyScreen = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
  };

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
  const [question, setQuestion] = useState('')

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  const [open, setOpen] = React.useState(false);

  const handleOpen = async () => {
    setOpen(true);
  }

  const handleClose = async () => {
    setOpen(false);
  }

  const submitQuestion = async () => {

    try {
      const response = await axiosInstance.post(`/submitQuestion`, {
        question: question,
        room: room
      });
      console.log(response, 'this is the responce')
      alert(response.data)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  const [assignment, setAssignment] = useState([])

  if (assignment) {
    console.log(assignment, 'this is the assignment')
  }

  useEffect(() => {

    const fetchAssignmentData = async () => {
      const responce = await axiosInstance.post(`assignmentDetail`, {
        room: room
      })
      console.log(responce, 'this is assignment responce')
      if (responce.data) {
        setAssignment(responce.data)
      } else {
        alert('something wrong')
      }
    }
    fetchAssignmentData()
  }, [assignment])

  const formattedDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  };

  const answerVerification = async(id)=>{
    alert(id)
    const roomNo = room
    const responce = await axiosInstance.get(`/assignmentVerification/${id}/${roomNo}`)
    alert(responce.data)
  }

  return (
    <div className="w-full h-full">
      <TutNav />
      <div className="border border-black grid grid-cols-1 sm:grid-cols-1 md:grid-cols-8 ">
        <div className="col-span-1 md:col-span-5 border border-yellow-500 ">
          <h1 className="font-bold text-blue-500 text-xl text-center">Assignments</h1>
          <div className="flex justify-end items-center p-4 rounded-md ">
            <Button
              variant="outlined"
              className="h-8 mr-2 mt-2 m-auto"
              style={{ borderColor: 'green', color: 'green' }}
              onClick={handleOpen}
            >
              Question &nbsp;<GrAdd />
            </Button>



            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}
                className="w-1/3 h-1/2 border border-blue-500 rounded-2xl">
                <h1 className="font-bold text-center">Type Your Qustions Here</h1>
                <input
                  type="text"
                  className="h-2/3 w-full"
                  id="myInput"
                  placeholder="Enter your Questions..."
                  rows={4}
                  value={question}
                  onChange={(e) => { setQuestion(e.target.value) }}

                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outlined"
                    className="h-8 mr-2 mt-2 m-auto"
                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                    onClick={submitQuestion}
                  >
                    Send
                  </Button>

                </div>
              </Box>
            </Modal>
          </div>

          {assignment && assignment.length > 0 ? (
            assignment.map((element, index) => (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3  overflow-y-auto mx-auto rounded-md shadow-md ">
                <div className="col-span-1 md:col-span-1 mx-auto mt-3 mb-3">
                  <Button
                    variant="outlined"
                    className="h-8 mr-2 mt-2 m-auto "
                    style={{ borderColor: '#1d3b53', color: '#1d3b53' }}
                    onClick
                  >
                    {formattedDate(element?.date)}
                  </Button>
                </div>
                <div className="col-span-1 md:col-span-1 mx-auto mt-3 mb-3">
                  <Button
                    variant="outlined"
                    className="h-8 mr-2 mt-2 m-auto"
                    style={{
                      borderColor: element.submit ? '#00cc00' : '#ff0000', // Green for verified, red for not verified
                      color: element.submit ? '#00cc00' : '#ff0000',

                    }}
                    onClick={handleOpen1}
                  >
                    {element.submit ? 'submitted' : 'Not Submitted'}
                  </Button>

                  <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}
                      className="border-2 border-blue-500 rounded-md shadow-md"
                    >
                      <h1 className="text-center font-sans font-bold">Question</h1>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {element?.answer}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
                <div className="col-span-1 md:col-span-1 mx-auto mt-3 mb-3">
                  <Button
                    variant="outlined"
                    className="h-8 mr-2 mt-2 m-auto"
                    style={{
                      borderColor: element.verified ? '#00cc00' : '#ff0000', // Green for verified, red for not verified
                      color: element.verified ? '#00cc00' : '#ff0000',
                      pointerEvents: element?.submit ?  'auto' : 'none',
                    }}
                    onClick={()=>{answerVerification(element?._id)}}
                  >
                    {element.verified ? 'Verified' : 'Not Verified'}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center">
              <p>No assignments available</p>
            </div>
          )}

        </div>
        <div className="col-span-1 md:col-span-3 border border-red-500">
          <div className="w-full h-96">
            <div className=" flex justify-center items-">
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
    </div>
  );
};

export default LobbyScreen;
