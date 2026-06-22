// import{useParams} from "react-router-dom";

// const Chat = () => {
//     const {targetUserId}= useParams();
//     const [messages,setMessages]= useState([{text:"hello world"}]);
//     console.log(targetUserId);
//     return (
//         //build whole chat interface
//         <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
//             <h1 className="text-center text-2xl font-bold p-4 bg-gray-300">Chat with {targetUserId}</h1>
//             <div className="flex-1 overflow-y-auto p-5">
//                 {messages.map((message,index)=>{
//                     return(
//                         <div key = {index} className="chat chat-start">
//                                 <div className="chat-header">
//                                 Obi-Wan Kenobi
//                                  <time className="text-xs opacity-50">2 hours ago</time>
//                         </div>
//                      <div className="chat-bubble">You were the Chosen One!</div>
//                      <div className="chat-footer opacity-50">Seen</div>
//                 </div>
//                 <div className="chat chat-start">
//             <div className="chat-header">
//              Obi-Wan Kenobi
//         time className="text-xs opacity-50">2 hour ago</time>
//     </div>
//     <div className="chat-bubble">I loved you.</div>
//     <div className="chat-footer opacity-50">Delivered</div>

// </div>
//                     )
//                 }
//     )
// };

// export default Chat;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const user = useSelector((store)=>store.user);
//   const userId = user?._id;
//   const location = useLocation();
//  const { firstName, lastName, photoUrl } = location.state || {};
// // console.log(location.state);

// const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
//     console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg)=>{
//         return {
//             firstName:msg?.firstName,
//             lastName:msg?.lastName,
//             text:msg.text,
//         };
//     });
//     setMessages(chatMessages);
// };

// useEffect(() => {
//     fetchChatMessages();
// }, []);

//     if(!userId){
//         return;
//     }

//     const socket = createSocketConnection();
//     //As soon as the page loaded , the socket connection is made and joinChat event is emmitted
//         socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });

//         socket.on("messageReceived",({firstName,lastName,text})=>{
//             console.log(firstName + " " + lastName + ":" + text);
//             setMessages((prevMessages)=>[...prevMessages,{firstName,lastName,text}]);
//         });

//         return () => {
//             socket.disconnect();
//         };

//   },[userId, targetUserId];

//     const sendMessage = () => {
//         const socket = createSocketConnection();
//         socket.emit("sendMessage", {text: newMessage, userId, targetUserId,firstName: user.firstName,lastName: user.lastName});
//         setNewMessage("");
//     };

//   return (
//     <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">

//       <h1 className="p-4 border-b border-gray-600 text-lg ">
//         Chat to {firstName + " " + lastName}
//       </h1>

//       <div className="flex-1 overflow-y-auto p-5">

//         {messages.map((message, index) => (
//           <div key={index} className="chat chat-start">

//             <div className="chat-header">
//               {message.firstName + " " + message.lastName}
//               <time className="text-xs opacity-50 ml-2">
//                 {new Date().toLocaleTimeString()}
//               </time>
//             </div>

//             <div className="chat-bubble">
//               {message.text}
//             </div>

//             <div className="chat-footer opacity-50">
//               Seen
//             </div>

//           </div>
//         ))}

//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <input
//           type={newMessage}
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value )}
//           placeholder="Type a message..."
//           className="input bg-black text-white input-bordered flex-1"
//         />
//         <button onClick={sendMessage} className="btn p-4 btn-secondary rounded bg-rose-500 ">
//           Send
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const location = useLocation();

  const { firstName, lastName } = location.state || {};

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages =
        res?.data?.messages?.map((msg) => ({
          //   firstName: msg.firstName,
          //   lastName: msg.lastName,
          senderId: msg.senderId._id,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          text: msg.text,
          createdAt: msg.createdAt,
        })) || [];

      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on(
      "messageReceived",
      ({ senderId, firstName, lastName, text, createdAt }) => {
        setMessages((prev) => [
          ...prev,
          { senderId, firstName, lastName, text, createdAt },
        ]);
      },
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      text: newMessage,
      userId,
      targetUserId,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-4 border-b border-gray-600 text-lg">
        Chat with {firstName} {lastName}
      </h1>

      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                message.senderId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">
                {message.firstName} {message.lastName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>

              <div className="chat-bubble">{message.text}</div>

              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input bg-black text-white input-bordered flex-1"
        />

        <button
          onClick={sendMessage}
          className="btn p-4 btn-secondary rounded bg-rose-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
