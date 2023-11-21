import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import StudNav from "../StudNav";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import studentInstance from "../../../api/studentInstace"

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

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const formattedDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : '';
  };

  const [assignment, setAssignment] = useState([])

  useEffect(() => {
    const fetchAssignment = async () => {
      const responce = await studentInstance.post(`/myAssignment`, {
        room: room,
        email: email
      })
      setAssignment(responce.data)
    }
    fetchAssignment()
  }, [assignment])

  /////  recording part start  //////
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const audioStream = useRef(null);
  const mediaRecorder = useRef(null);

  // const startRecording = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true })
  //     .then((stream) => {
  //       audioStream.current = stream;
  //       mediaRecorder.current = new MediaRecorder(stream);

  //       mediaRecorder.current.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           setAudioBlob(event.data);
  //         }
  //       };

  //       mediaRecorder.current.start();
  //       setIsRecording(true);
  //     })
  //     .catch((error) => {
  //       console.error("Error starting recording: ", error);
  //     });
  // };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioStream.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);

        const chunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const fullBlob = new Blob(chunks, { type: "audio/wav" });
          setAudioBlob(fullBlob);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error starting recording: ", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && audioStream.current) {
      mediaRecorder.current.stop();
      audioStream.current.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };
  const playAudio = () => {
    if (audioBlob) {
      const audioElement = new Audio(URL.createObjectURL(audioBlob));
      audioElement.play();
    }
  };
  /////  recording part end    //////

  const [answer, setAnswer] = useState('')

  const sendAnswerToBackEnd = async (id) => {
    alert(id)
    handleClose()
    const responce = await studentInstance.post(`/submitAssignemnt`, {
      data: answer,
      room: room,
      assignmentId: id
    })
    alert(responce.data)

  }

  const today = new Date().toLocaleDateString();
  return (
    <div>
      <StudNav />
      <div className="h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-10">
          <div className="md:col-span-7 w-full mx-auto  p-2 items-center border rounded-md shadow-sm">
            <div className="w-full   p4 rounded-lg   ">
              <div className=" mt-4  mx-2 me-2 ">
                <h1 className="text-center font-bold ">Your Assignment</h1>
              </div>
              {Array.isArray(assignment) && assignment.length > 0 ? (
                <div class="overflow-x-auto border border-blue-500 rounded-lg shadow-lg">
                  <table class="table">
                    <thead>
                      <tr>
                        <th className='text-center'>Date</th>
                        <th className='text-center'>Question</th>
                        <th className='text-center'>Submission</th>
                        <th className='text-center'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignment.map((element, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <Button
                              variant="outlined"
                              boxShadow={10}
                              className="h-5 mr-2 shadow-md "
                              style={{
                                borderColor: '#1d3b53', color: '#1d3b53',
                                borderRadius: '20px',
                                boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                                fontSize: '12px',
                              }}
                            >
                              {formattedDate(element?.date)}
                            </Button>
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outlined"
                              className="h-5 mr-2 rounded-xl"
                              onClick={handleOpen1}
                              style={{
                                borderColor: '#1d3b53',
                                color: '#1d3b53',
                                borderRadius: '20px',
                                fontSize: '12px',
                              }}
                            >
                              Assignment
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
                                  {element?.question}
                                </Typography>
                              </Box>
                            </Modal>
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outlined"
                              className="h-5 mr-2 mt-2 m-auto"
                              style={{
                                pointerEvents: formattedDate(element?.date) === today ? 'auto' : 'none',
                                borderColor: element.submit ? '#00cc00' : '#ff0000',
                                borderRadius: '20px',
                                color: element.submit ? '#00cc00' : '#ff0000',
                                fontSize: '12px',
                              }}
                              onClick={handleOpen}
                            >
                              {element?.submit ? 'submitted' : 'Not Submitted'}
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              className="rounded-lg border border-blue-500"
                            >
                              <Box sx={style}
                                className="rounded-lg border border-blue-500 ">
                                <div className="recording-container text-center ">
                                  <h1 className="font-sans font-bold  p-4">Type Your Answer Here</h1>
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="type here"
                                      className="w-full h-28"
                                      value={answer}
                                      onChange={(e) => { setAnswer(e.target.value) }}>
                                    </input>
                                  </div>
                                  <div>
                                    <Button
                                      className=""
                                      onClick={() => sendAnswerToBackEnd(element._id)}>
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              </Box>
                            </Modal>
                          </td>
                          <td className="text-center">
                            <Button
                              variant="outlined"
                              className="h-5 mr-2"
                              style={{
                                borderColor: 'red', color: 'red', borderRadius: '20px',
                                borderColor: element.verified ? '#00cc00' : '#ff0000',
                                color: element.verified ? '#00cc00' : '#ff0000',
                                borderRadius: '20px',
                                fontSize: '12px',
                              }}
                            >
                              {element?.verified ? 'verified' : 'Not verified'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <p>No assignments available</p>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-3  w-full  my-auto rounded-xl shadow-md">

            <div className="card rounded-md p-4 border shadow-sm">
              <img
                src="https://media.istockphoto.com/vectors/student-in-digital-homeschool-online-class-program-cartoon-vector-id1217284422?k=6&m=1217284422&s=170667a&w=0&h=muAiUbPfhAPrsP1cf1qbD47CuX1PO_nL1dTPcSleDTk=" // Replace with your image URL
                alt="Card Image"
                className="card-image rounded-lg"
              />
              <div className="card-description">
                <form onSubmit={handleSubmitForm} >
                  <div className="text-center mb-4 mt-2">
                    <h1 className=" mb-2 text center"><b>JOIN CLASS</b> </h1>
                  </div>
                  <div className="mt-2 flex justify-center items-center">
                    <button className="w-32 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-700">PRESS HERE</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
