import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment/moment";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessage } from "../redux/action/MessageAction";

function MessageBox({roomKey}) {
    const dispatch = useDispatch();
    const messageHistory = useSelector((state)=>{return state.messages.payload[roomKey]});
    const [feedback, setFeedback] = useState({
        receiverId: "",
        adminId: "",
        messageContent: "",
        type:"ADMIN"
      })
    const submitMessage = () => {
        dispatch(sendMessage(roomKey,feedback));
        setFeedback({...feedback, messageContent:""})
      }
    
      
      console.log(roomKey);

    return (
        <>
                {/* HEADER */}
                <div className="bg-white z-0 w-full px-5 py-5 flex justify-start items-center gap-3 rounded-tl-md rounded-tr-md">
                  <img
                    src={messageHistory[0].receiverId.profile}
                    alt="receiver profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-bold text-zinc-500">
                      {messageHistory[0].receiverId.firstname}{" "}
                      {messageHistory[0].receiverId.lastname}
                    </p>
                    <p className="mt-[-6px] text-sm">Patient</p>
                  </div>
                </div>

                <div className="w-full h-[550px] min-h-[550px] overflow-y-auto flex flex-col items-baseline py-2 gap-3">
                  {messageHistory.map((val, idx) => (
                    <div
                      className={`w-full h-auto flex flex-col gap-3 ${
                        val.type === "CLIENT"
                          ? "justify-end items-end"
                          : "justify-start items-start"
                      }`}
                      key={idx} // Add a unique key to each element in the loop
                      ref={(el) => {
                        if (idx === messageHistory.length - 1) {
                          el?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last element
                        }
                      }}
                    >
                      <div
                        className={` h-auto min-w-auto max-w-[400px] flex flex-col whitespace-wrap ${
                          val.type === "CLIENT"
                            ? "bg-cyan-500 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                            : "bg-white text-zinc-700 rounded-tl-xl rounded-tr-xl rounded-br-xl"
                        } px-5 py-3`}
                      >
                        <p className="whitespace-normal">{val.messageContent}</p>
                      </div>
                      <p className="text-xs">{moment(val.date).format("LLLL")}</p>
                    </div>
                  ))}
                </div>



                <div className=" w-full h-14 flex gap-3 justify-center items-center ">
                  <input type="text" placeholder="Message" className=" rounded-md w-full py-3 px-4 focus:outline-none " name="messageContent" value={feedback.messageContent} onChange={(e)=>{ 
                    setFeedback({
                      ...feedback,
                       messageContent:e.target.value,
                       receiverId:messageHistory[0].receiverId.patientId,
                       adminId: messageHistory[0].adminId.adminId
                       }) }} 
                  />
                  <div className=" p-3 rounded-full bg-cyan-500 cursor-pointer " onClick={submitMessage}>
                    <AiOutlineSend size={30} color="#fff" />
                  </div>
                </div>
              </>
    );
}

export default MessageBox;