import React,{useEffect, useState} from "react";
import * as io from "socket.io-client";
import { SOCKET_LINK } from "../ApiLinks";
import { useDispatch, useSelector } from "react-redux";
import { BiMessageEdit } from "react-icons/bi";
import { fetchIncomingMessage, sendMessage } from "../redux/action/MessageAction";
import MessageBox from "../components/MessageBox";

const socket = io.connect(SOCKET_LINK);
function Messages({admin}) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const messages = useSelector((state)=>{ return state.messages.payload; });
  const [roomKey, setRoomKey] = useState("");

  useEffect(()=>{
    socket.on("received_by_admin", (data)=>{
      dispatch(fetchIncomingMessage(data.key, data.value));
    })
  },[socket])

  const MessageModal = ()=>{
    const admin= useSelector((state)=>{ return state.admin.loginAdmin; })
    const [ messageDetails, setMessageDetails ] = useState({
      inputHandler:"",
      adminId:admin.adminId,
      receiverId:"",
      receiverName:"",
      messageContent:"",
      type:"ADMIN"
    })
    const [suggestions, setSuggestions] = useState([]);
    const patient = useSelector((state)=>{ return state.patient.payload; })

    const searchPatientOnChangeHandler = (e) => {
      const inputValue = e.target.value.toLowerCase();
      const filteredData = patient.filter((val) => (val.firstname + val.middlename + val.lastname).toLowerCase().includes(inputValue));
      setSuggestions(filteredData);
      setMessageDetails({ ...messageDetails, [e.target.name]: e.target.value });
      console.log(filteredData);
    };
    
    const sendMessageButton = () =>{
      const key = `${messageDetails.adminId}-${messageDetails.receiverId}`;
      dispatch(sendMessage(key, messageDetails));
      setModal(false)
    }
    return (
      <div className=" w-full h-full absolute z-50 flex justify-center items-center " style={{background:"linear-gradient(rgb(75,85,99,0.5),rgb(75,85,99,0.5))"}}>
          <div className="bg-white w-auto h-auto p-5 z-40 relative ">
            <p className=" p-5 bg-cyan-500 absolute rounded-full right-[-20px] top-[-20px] flex justify-center items-center w-2 h-2 text-lg text-white cursor-pointer "
            onClick={()=>setModal(false)}
            > 
              X
            </p>
              <h3 className=" w-96 font-bold text-lg border-b-2 py-2 ">Create Message</h3>
              <div>
                <input type="search" name="inputHandler" value={messageDetails.inputHandler} placeholder="Search" className=" w-full p-2 mt-2 bg-gray-200 focus:outline-none "  onChange={(e)=>searchPatientOnChangeHandler(e)}/>
                <div>
                  {
                    messageDetails.inputHandler!=="" && suggestions.length > 0 ? (
                      suggestions.map((val,idx)=>(
                        <ul key={idx} className=" w-full h-auto mt-3 ">
                          <li 
                          className=" w-full py-2 px-3 rounded-md flex gap-2 items-center justify-start hover:bg-cyan-500 hover:text-white cursor-pointer "
                          onClick={()=>{
                            setMessageDetails({
                              ...messageDetails,
                              inputHandler:"",
                              receiverId: val.patientId,
                              receiverName: `${val.firstname} ${val.lastname}`
                            });
                            setSuggestions([]);
                          }}
                          >
                            <img src={val.profile} className=" w-11 h-11 rounded-full " />
                            <p>{val.firstname} {val.lastname}</p>
                          </li>
                        </ul>
                      ))
                    )
                    : messageDetails.inputHandler !== "" ? <h1 className=" w-full py-2 text-zinc-400 font-bold ">No Existing Patient</h1>
                    :<div></div>
                  }
                  {
                    messageDetails.receiverId!=="" && messageDetails.receiverName!=="" && (
                      <div className=" mt-2 ">
                        <p className="w-full py-3 font-medium text-zinc-500 ">
                          <span className=" bg-emerald-500 text-white py-1 px-5 mr-2 rounded-md ">Patient Name</span>
                          {messageDetails.receiverName}
                        </p>
                        <textarea className="min-h-auto max-h-[250px] overflow-auto w-full py-3 px-5 border-zinc-700 border-[1px] focus:outline-none resize-none " placeholder="Message..." onChange={(e)=>setMessageDetails({
                          ...messageDetails, 
                          messageContent:e.target.value
                        })}>
                        </textarea>
                        <div className=" w-full h-auto flex justify-end items-start ">
                          <button className=" text-white bg-cyan-500 py-2 px-5 rounded-md "
                          onClick={sendMessageButton}
                          >Send Message</button>
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
    
    <div className=" h-screen relative w-full flex gap-5 ">
      { modal && <MessageModal />}
      <div className="  w-1/4 h-full p-5 flex flex-col gap-3 ">

        {/* HEADER */}
        <div className=" w-full flex flex-col gap-5  ">
          <div className=" flex justify-between items-center ">
            <h1 className=" text-xl font-bold text-zinc-700 ">All Message</h1>
            <div onClick={()=>setModal(true)} className=" p-2 cursor-pointer rounded-lg bg-cyan-600 hover:bg-cyan-700 "><BiMessageEdit size={25} color="#fff" /></div>
          </div>
          <input type="text" name="search" placeholder="Search Patient" className=" rounded-lg bg-white py-2 px-5 focus:outline-none " />
        </div>

        {/* LIST OF MESSAGE */}
        <div className=" w-full max-h-[680px] overflow-x-auto flex flex-col gap-2 mb-10 ">
          {
            Object.entries(messages).map(([keys, message])=>(
              <div key={keys} className=" w-full p-3 bg-white cursor-pointer rounded-md flex justify-center items-center gap-3 hover:shadow-lg " onClick={()=>{setRoomKey(keys);}} >

                <img src={message[0].receiverId.profile} alt="Patient Profile" className=" rounded-md w-14 h-14 " />
                {/* MESSAGE CONTENT */}
                <div className=" w-full h-auto ">
                  <h1 className=" text-md font-bold text-zinc-600 ">{message[0].receiverId.firstname} {message[0].receiverId.lastname}</h1>
                  <p className=" text-sm max-w-[250px] truncate ">{message[message.length-1].messageContent}</p>
                </div>
              </div>
            ))
            // Object.entries(messages).map(([keys, message])=>{
            //   console.log(message);
            // })
          }
        </div>

      </div>




      {/* MESSSAGE ROOM */}
      <div className=" flex flex-grow flex-col rounded-lg p-5">

      {roomKey? (
              <MessageBox roomKey={roomKey} />
            ) : (
              <div></div>
            )}
      </div>



    </div>
    </>
  )
}

export default Messages