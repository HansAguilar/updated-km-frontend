import React, { useState } from "react";
import * as io from "socket.io-client";
import { SOCKET_LINK } from "../ApiLinks";
import { useDispatch, useSelector } from "react-redux";
import { BiMessageEdit, BiSearchAlt } from "react-icons/bi";
import { createNewMessage, fetchMessages, sendMessage } from "../redux/action/MessageAction";
import MessageBox from "../components/MessageBox";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function Messages({ admin }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const newMessage = useSelector((state) => { return state?.messages?.payload; });
  const [roomKey, setRoomKey] = useState("");

  const selectMessageRoom = (key) => {
    setRoomKey(key);
  }

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    dispatch(fetchMessages(adminId))
  }, [])

  const MessageModal = () => {
    const admin = useSelector((state) => { return state.admin.loginAdmin; })
    const [suggestions, setSuggestions] = useState([]);
    const [messageDetails, setMessageDetails] = useState({
      inputHandler: "",
      adminId: admin.adminId,
      receiverId: "",
      receiverName: "",
      messageContent: "",
      type: "ADMIN"
    })
    const patient = useSelector((state) => { return state.patient.payload; })

    const searchPatientOnChangeHandler = (e) => {
      const inputValue = e.target.value.toLowerCase();
      const filteredData = patient.filter((val) => (val.firstname + val.middlename + val.lastname).toLowerCase().includes(inputValue));
      setSuggestions(filteredData);
      setMessageDetails({ ...messageDetails, [e.target.name]: e.target.value });
    };

    const sendMessageButton = () => {
      if (!messageDetails.messageContent) return;
      const key = `${messageDetails.adminId}-${messageDetails.receiverId}`;
      const filteredMessages = newMessage.filter((val) => val.roomId === key);

      if (filteredMessages.length > 0) {
        dispatch(sendMessage(key, messageDetails));
      } else {
        dispatch(createNewMessage(key, messageDetails));
      }
      setModal(false)
    }

    return (
      <div className={`w-full min-h-screen bg-gray-900 bg-opacity-75 fixed inset-0 z-50 flex flex-grow justify-center items-center `}>
        <div className="relative m-auto w-[500px] h-[500px] bg-zinc-100 rounded p-4">
          <div className="bg-red-400 absolute top-3 right-3 rounded-full p-2 cursor-pointer hover:bg-red-600" onClick={() => setModal(false)}>
            <AiOutlineClose className='text-white' size={24} />
          </div>

          <h3 className="font-bold text-xl border-b-2 py-2">Create Message</h3>

          <div>
            <div className="w-full my-2 relative">
              <BiSearchAlt className="absolute left-2 top-2 text-slate-400" size={24} />
              <input type="search" name="inputHandler" value={messageDetails.inputHandler} placeholder="Search patient..." className="indent-8 w-full p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none" onChange={(e) => searchPatientOnChangeHandler(e)} />
            </div>

            <div className="w-full max-h-96 overflow-auto">
              {
                messageDetails.inputHandler !== "" && suggestions.length > 0 ? (
                  <ul>
                    {
                      suggestions.map((val, idx) => (
                        <li key={idx} className="border-b-slate-300 border-b transition-all duration-150 w-full p-3 rounded flex gap-4 items-center justify-start hover:bg-blue-500 hover:text-white cursor-pointer "
                          onClick={() => {
                            setMessageDetails({
                              ...messageDetails,
                              inputHandler: "",
                              receiverId: val.patientId,
                              receiverName: `${val.firstname} ${val.lastname}`
                            });
                            setSuggestions([]);
                          }}
                        >
                          <img src={val.profile} className=" w-11 h-11 rounded-full aspect-auto" />
                          <p>{val.firstname} {val.lastname}</p>
                        </li>
                      ))
                    }

                  </ul>
                )
                  : messageDetails.inputHandler !== "" ? <h1 className=" w-full py-2 text-zinc-400 font-bold ">No Existing Patient</h1>
                    : <div></div>
              }
              {
                messageDetails.receiverId !== "" && messageDetails.receiverName !== "" && (
                  <div className=" mt-2 ">
                    <p className="w-full py-3 font-medium text-zinc-500 ">
                      <span className=" bg-emerald-500 text-white py-1 px-5 mr-2 rounded-md ">Patient Name</span>
                      {messageDetails.receiverName}
                    </p>
                    <textarea autoFocus className="p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none w-full resize-none" rows="5" placeholder="Message..." onChange={(e) => setMessageDetails({
                      ...messageDetails,
                      messageContent: e.target.value
                    })}>
                    </textarea>

                    <div className=" w-full flex justify-end items-start ">
                      <button className="py-2 px-4 font-medium bg-blue-500 text-white rounded hover:bg-blue-700" onClick={sendMessageButton}>Send Message</button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {
        !newMessage ? (
          <div className=" w-full h-screen flex justify-center items-center ">
            <LoadingSpinner loading={true} />
          </div>
        )
          : (
            <>
              <div className='w-full h-screen overflow-hidden relative flex flex-row bg-gray-200 gap-4 p-4'>
                {modal && <MessageModal />}

                <div className="bg-white rounded w-1/4 h-full p-5 flex flex-col gap-3 shadow-md">

                  {/*//~ HEADER */}
                  <div className=" w-full flex flex-col gap-5 ">
                    <div className=" flex justify-between items-center ">
                      <h1 className=" text-xl font-bold text-slate-800">Recent Messages</h1>
                      <div onClick={() => setModal(true)} className=" p-2 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-700 "><BiMessageEdit size={25} color="#fff" /></div>
                    </div>

                    <div className="relative">
                      <BiSearchAlt className="absolute left-2 top-2 text-slate-400" size={24} />
                      <input type="text" name="search" placeholder="Search Patient..." className="w-full indent-8 p-2 border border-slate-300 focus:border-blue-600 rounded text-sm focus:outline-none" />
                    </div>
                  </div>
                  {/*//~ HEADER */}

                  {/* LIST OF MESSAGE */}
                  <div className=" w-full max-h-[680px] overflow-x-auto flex flex-col gap-2 mb-10 divide-y-2 ">
                    {
                      newMessage && newMessage.map((val, idx) => (
                        <div key={idx} className=" w-full p-3 bg-white cursor-pointer rounded-md flex justify-center items-center gap-3 hover:bg-gray-200 " onClick={() => selectMessageRoom(val.roomId)} >

                          <img src={val.receiverId.profile} alt="Patient Profile" className=" rounded w-14 h-14 aspect-auto " />
                          {/* MESSAGE CONTENT */}
                          <div className=" w-full h-auto ">
                            <h1 className=" text-md font-bold text-slate-700 ">{val.receiverId.firstname} {val.receiverId.lastname}</h1>
                            {
                              val.messageEntityList && val.messageEntityList.slice(-1).map((v, index) => (
                                <p key={index} className={`text-sm max-w-[250px] truncate ${(v.type === "CLIENT" && v.status === "UNREAD") ? 'font-bold ' : ''}`}>
                                  {v.messageContent}
                                </p>
                              ))
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>


                {/* MESSSAGE ROOM */}
                <div className="bg-white rounded flex flex-grow flex-col shadow-md">

                  {roomKey ? (
                    <MessageBox roomKey={roomKey} />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </>
          )
      }
    </>

  )
}

export default React.memo(Messages)