import { Button, TextField } from "@mui/material";
import "./AllMessagesArea.css";
//components
import MsgItem from "./MsgItem";
//redux
import { useDispatch, useSelector } from "react-redux";

// store
import { createNewChatThunk } from "../../../../store/ChatsReducer";
import { useOutletContext } from "react-router-dom";
//service
import { socketService } from "../../../../services/socketService";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const AllMessagesArea = () => {
  const dispatch = useDispatch();
  const socket = useOutletContext();
  const allMsgs = useSelector((state) => state.ChatReducer.chat.messages);
  const spanRef = useRef(null);
  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";
  useEffect(() => {
    socketService.subscribeOnNewMessage(socket, dispatch);
    console.log("this is useEffect");
    return () => {
      if (socket) {
        socket.removeAllListeners("receiveMessage");
      }
    };
  }, []);

  useEffect(() => {
    spanRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMsgs]);

  useEffect(() => {
    // Create a socket instance

    // Listen for "typing" event
    if (isAdmin) {
      socket.emit("typing", (username) => {
        // Update UI to display typing indicator
        console.log(`${username} is typing...`);
      });
    }

    // Clean up function to unsubscribe from the event
    return () => {
      socket.off("typing");
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); // Ensure this effect runs only once

  return (
    <div className="AllMessagesArea">
      <div className="AllMessagesArea__wrapper">
        {allMsgs
          ? allMsgs.map((msg) => <MsgItem msg={msg} key={msg._id} />)
          : null}
        <span id="end-of-msgs" ref={spanRef}></span>
      </div>
    </div>
  );
};

export default AllMessagesArea;
