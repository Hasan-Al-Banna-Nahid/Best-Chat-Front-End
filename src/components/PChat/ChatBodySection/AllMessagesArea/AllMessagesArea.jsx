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
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { pinMessage } from "../../../../store/ChatReducer";
import PinnedMessage from "./PinnedMessage";
import { ToastContainer, toast } from "react-toastify";
const AllMessagesArea = ({ msg }) => {
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [clickedPinnedMessageId, setClickedPinnedMessageId] = useState(null);
  const dispatch = useDispatch();
  const socket = useOutletContext();
  let allMsgs = useSelector((state) => state.ChatReducer.chat.messages);
  const spanRef = useRef(null);
  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";
  let [pinnedMessage, setPinnedMessage] = useState([]);

  const pinId = pinnedMessage.map((pin) => {
    return pin.id;
  });
  const pinText = pinnedMessage.map((pin) => {
    return pin.id;
  });

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
      socket.on("typing", (username) => {
        // Update UI to display typing indicator
        console.log(`${username} is typing...`);
      });
    }

    // Clean up function to unsubscribe from the event
    return () => {
      // socket.off("typing");
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); // Ensure this effect runs only once

  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  const jwt = localStorage.getItem("jwt");
  const handlePinMessage = async (messageId) => {
    dispatch(pinMessage(messageId));
    const messageToPin = allMsgs.find((msg) => msg._id === messageId);

    // Store the entire pinned message object in the state
    // setPinnedMessage(messageToPin);

    // Store only the text of the pinned message in localStorage
    if (localStorage.getItem("pinMessage") === messageToPin.text) {
      toast.error("Already Pinned");
    } else {
      toast.success("Pinned Successfully");
    }
    if (messageToPin) {
      try {
        const response = await fetch(
          `${baseURL}/chats/${chatId}/sendPinMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              pinned: messageToPin.text,
              id: messageToPin,
            }), // Use 'pinned' instead of 'message'
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("Pinned Message Saved To DB");
          console.log(data); // Check response data for confirmation
          // Update state or perform any other necessary actions based on response
          window.location.reload();
        } else {
          toast.error("Failed to save pinned message");
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log(chatId);
      try {
        const response = await fetch(`${baseURL}/chats/pin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwt}`,
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log("getPin", data);
          setPinnedMessage(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleMouseEnter = (messageId) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
  };

  const handlePinnedMessageClick = () => {
    if (pinId) {
      const pinnedMessageRef = document.getElementById(pinId);
      if (pinnedMessageRef) {
        pinnedMessageRef.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const baseURL = process.env.REACT_APP_BACKURL;

  return (
    <div className="AllMessagesArea">
      <ToastContainer />
      <div className="AllMessagesArea__wrapper ">
        {pinId && (
          <div
            className={`${pinText ? "pinned-message-container" : ""}`}
            onClick={handlePinnedMessageClick}
          >
            <PinnedMessage msg={pinnedMessage} pinMessage={setPinnedMessage} />
          </div>
        )}
        <div className="mt-20">
          {allMsgs &&
            allMsgs.map((msg) => (
              <div
                className={`message-container ${
                  msg._id == (pinText && pinId)
                    ? "border-2 border-blue-800 p-4 text-2xl rounded-lg my-4"
                    : ""
                }`}
                onMouseEnter={() => handleMouseEnter(msg._id)}
                onMouseLeave={handleMouseLeave}
                key={msg._id}
                id={msg._id} // Add an id to the message container
              >
                {msg._id == (pinText && pinId) && (
                  <h2 className="link link-primary no-underline font-bold my-2">
                    Pinned Message
                  </h2>
                )}
                <MsgItem msg={msg} />
                {msg._id === hoveredMessageId && isAdmin && (
                  <button
                    className="pin-button my-4 btn btn-primary w-[300px]"
                    onClick={() => {
                      handlePinMessage(msg._id);
                      // sendPinMessage();
                    }}
                    disabled={msg._id == (pinText && pinId)}
                  >
                    Pin
                  </button>
                )}
              </div>
            ))}
        </div>
        <span id="end-of-msgs" ref={spanRef}></span>
      </div>
    </div>
  );
};

export default AllMessagesArea;
