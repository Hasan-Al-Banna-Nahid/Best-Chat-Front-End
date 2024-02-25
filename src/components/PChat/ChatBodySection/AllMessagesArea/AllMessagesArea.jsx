import { Button, TextField } from "@mui/material";
import "./AllMessagesArea.css";
//components
import MsgItem from "./MsgItem";
//redux
import { useDispatch, useSelector } from "react-redux";

// store
import { createNewChatThunk } from "../../../../store/ChatsReducer";
import { useOutletContext, useParams } from "react-router-dom";
//service
import { socketService } from "../../../../services/socketService";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { pinMessage } from "../../../../store/ChatReducer";
import PinnedMessage from "./PinnedMessage";
import { ToastContainer, toast } from "react-toastify";
import getChat from "../../../../services/chatsService/getChat";
const AllMessagesArea = ({ msg, chatParam }) => {
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [clickedPinnedMessageId, setClickedPinnedMessageId] = useState(null);
  const dispatch = useDispatch();
  const socket = useOutletContext();
  let allMsgs = useSelector((state) => state.ChatReducer.chat.messages);
  const spanRef = useRef(null);
  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";
  let [pinnedMessage, setPinnedMessage] = useState([]);
  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  const jwt = localStorage.getItem("jwt");
  const baseURL = process.env.REACT_APP_BACKURL;

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
  const handleUnpinMessage = () => {
    console.log(chatId);
    fetch(`${baseURL}/chats/${chatId}/deletePin`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Deleted Pin Message");
        }
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const pinIds = pinnedMessage?.chat;
  console.log(pinnedMessage);
  const handlePinMessage = async (messageId) => {
    dispatch(pinMessage(messageId));
    const messageToPin = allMsgs.find((msg) => msg._id == messageId);
    // console.log("msgId", chatId === pinIds);
    // Send Pin Message
    if (pinIds !== chatId) {
      await fetch(`${baseURL}/chats/${chatId}/sendPinMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          pinned: messageToPin.text,
          id: messageToPin._id,
        }),
      }).then(async (res) => {
        await res.json();
        console.log(res);
        // toast.success("Pin Message Saved");
        window.location.reload();
      });
    } else {
      await fetch(`${baseURL}/chats/${chatId}/updatePin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          pinned: messageToPin.text,
          ids: messageToPin._id,
        }),
      }).then(async (res) => {
        await res.json();
        if (res.ok) {
          console.log(res);
          window.location.reload();
        }
      });
    }

    // Update Pin Message

    // if (pinId == messageToPin.id) {
    //   toast.error("Already Pinned");
    // } else {
    //   toast.success("Pinned Successfully");
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(chatId);
      try {
        const response = await fetch(`${baseURL}/chats/${chatId}/pin`, {
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
          setPinnedMessage(data); // Update pinnedMessage state with new data
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [chatId, jwt, baseURL]); // Ensure useEffect runs when chatId, jwt, or baseURL changes
  // Empty dependency array to run the effect only once

  const handleMouseEnter = (messageId) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
  };

  const handlePinClickMessage = () => {
    if (pinnedMessage && pinnedMessage.text) {
      const pinnedMessageText = pinnedMessage.text;

      // Find the message with the pinned text
      const pinnedMessageItem = allMsgs.find(
        (msg) => msg.text === pinnedMessageText
      );

      if (pinnedMessageItem) {
        const pinnedMessageId = pinnedMessageItem._id;

        // Scroll to the pinned message
        const pinnedMessageRef = document.getElementById(pinnedMessageId);
        if (pinnedMessageRef) {
          pinnedMessageRef.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // && pinMessageFromDB == chatId &&

  return (
    <div className="AllMessagesArea">
      <ToastContainer />
      <div className="AllMessagesArea__wrapper ">
        {isAdmin && pinnedMessage && pinnedMessage?.chat == chatId && (
          <div
            className={`${
              pinnedMessage?.text ? "pinned-message-container" : ""
            }`}
            onClick={handlePinClickMessage}
          >
            <PinnedMessage
              msg={pinnedMessage}
              pinMessage={setPinnedMessage}
              onUnpinMessage={handleUnpinMessage}
            />
          </div>
        )}
        <div className="mt-20">
          {allMsgs &&
            allMsgs.map((msg) => (
              <div
                className={`message-container ${
                  isAdmin && msg.text == pinnedMessage?.text
                    ? "border-2 border-blue-700 p-4 my-2 rounded-sm"
                    : ""
                }`}
                onMouseEnter={() => handleMouseEnter(msg._id)}
                onMouseLeave={handleMouseLeave}
                key={msg._id}
                id={msg._id} // Add an id to the message container
              >
                {isAdmin && msg.text == pinnedMessage?.text && (
                  <h2 className="pinned-message-label text-xl font-bold text-purple-700 my-2">
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
                    disabled={pinnedMessage?.text == msg.text}
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
