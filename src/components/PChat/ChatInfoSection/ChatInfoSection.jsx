import { Button, TextField } from "@mui/material";
import "./ChatInfoSection.css";
//components

//redux
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// store
import { chatsService } from "../../../services/chatsService";
import { createNewChatThunk } from "../../../store/ChatsReducer";

const ChatInfoSection = () => {
  const chat = useSelector((state) => state.ChatReducer.chat);
  // console.log(chat.users)
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  // Construct the chat room link
  const chatRoomLink = `${window.location.origin}/chats/${chatId}`;

  // Function to copy the chat room link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(chatRoomLink);
    setCopied(true);
  };
  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";
  return (
    <div className="ChatInfoSection">
      <div className="ChatInfoSectionTable">
        <div>NAME</div>
        <div>{chat.chatName}</div>
        <div>Participants</div>
        <div>
          {chat.users
            ? chat.users.map((user) => (
                <div key={user._id}>{user.username}</div>
              ))
            : null}
        </div>
      </div>
      {isAdmin && (
        <div>
          <div className="w-[400px]">
            <TextField
              fullWidth
              className="w-[400px]"
              variant="outlined"
              value={chatRoomLink}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button onClick={copyToClipboard} variant="contained">
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInfoSection;
