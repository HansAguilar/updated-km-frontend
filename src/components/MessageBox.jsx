import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment/moment";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessage } from "../redux/action/MessageAction";

function MessageBox({ roomKey }) {
  const dispatch = useDispatch();
  const messageHistory = useSelector((state) => { return state.messages.payload.filter((val)=>val.roomId===roomKey) });
  const admin = useSelector((state) => { return state.admin.loginAdmin; })

  const [feedback, setFeedback] = useState({
    receiverId: messageHistory[0].receiverId.patientId,
    adminId: admin.adminId,
    messageContent: "",
    type: "ADMIN"
  })

  const submitMessage = () => {
    if (!feedback.messageContent) return
    dispatch(sendMessage(roomKey, feedback));
    setFeedback({ ...feedback, messageContent: "" })
  }

  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messageHistory]);

  return (
    <>
      {/*//~ HEADER */}
      <div className="bg-blue-200 z-0 w-full px-5 py-5 flex justify-start items-center gap-3 rounded-tl-md rounded-tr-md">
        <img src={messageHistory[0].receiverId.profile} alt="patient profile" className="w-14 h-14 aspect-auto rounded-full" />

        <div>
          <p className="text-lg font-bold tracking-wide text-slate-700">
            {`${messageHistory[0].receiverId.firstname} ${messageHistory[0].receiverId.lastname}`}
          </p>
          <p className="text-slate-600 text-sm">Patient</p>
        </div>
      </div>
      {/*//~ HEADER */}

      <div className="w-full h-[550px] min-h-[550px] overflow-y-auto flex flex-col items-baseline p-4 gap-3 ">
        {messageHistory[0].messageEntityList.map((val, idx) => (
          <div
            className={`w-full h-auto flex flex-col ${val.type === "CLIENT"
              ? "justify-start items-start"
              : "justify-end items-end"
              }`}
            key={idx} // Add a unique key to each element in the loop
            ref={(el) => {
                el?.scrollIntoView({ behavior: "smooth" }); // Scroll to the last element
            }}
          >
            <p className="text-xs">{moment(val.createdDateAndTime).format("LL")}</p>
            <div
              className={` h-auto min-w-auto max-w-[400px] flex flex-col whitespace-wrap ${val.type === "CLIENT"
                ? "bg-blue-400 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                : "bg-gray-100 text-zinc-700 rounded-tl-xl rounded-tr-xl rounded-br-xl"
                } px-5 py-3`}
            >
              <p className="whitespace-normal">{val.messageContent}</p>
            </div>
          </div>
        ))}
      </div>



      <div className=" w-full h-14 flex gap-3 justify-center items-center p-4 mt-auto mb-28">
        <input type="text" placeholder="Message" className="p-4 border border-slate-300 focus:border-blue-600 rounded focus:outline-none w-full" name="messageContent" value={feedback.messageContent} onChange={(e) => {
          setFeedback({
            ...feedback,
            messageContent: e.target.value,
            receiverId: messageHistory[0].receiverId.patientId,
            adminId: messageHistory[0].adminId.adminId
          })
        }}
        />
        <div className=" p-3 bg-blue-500 cursor-pointer hover:bg-blue-700" onClick={submitMessage}>
          <AiOutlineSend size={30} color="#fff" />
        </div>
      </div>
    </>
  );
}

export default React.memo(MessageBox);