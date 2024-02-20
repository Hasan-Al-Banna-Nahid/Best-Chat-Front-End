import { Button, TextField } from "@mui/material";
import "./NewMessageArea.css";
//components

//redux
import { useDispatch, useSelector } from "react-redux";

// store
import { createNewChatThunk } from "../../../../store/ChatsReducer";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

// utils
import convertToBase64 from "../../../../utils/convertToBase64";
import { io } from "socket.io-client";

const NewMessageArea = () => {
  const [message, setMessage] = useState("");

  const [fileName, setFileName] = useState("Choose file");
  const [fileData, setFileData] = useState("");
  const [fileSize, setFileSize] = useState("");
  const socket = useOutletContext();

  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  const sockett = io();
  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";
  const handleTyping = (username) => {
    // Emit "typing" event to the server with the username
    if (isAdmin) {
      sockett.emit("typing", username);
    }
  };
  // useEffect(()=>{
  //     console.log(fileData)
  // },[fileData])

  const sendMessage = () => {
    console.log("Send Message Hit", message, chatId);
    sockett.io("sendMessage", {
      message: message,
      chatId: chatId,
    });
    setMessage("");
  };

  const dispatch = useDispatch();

  // console.log(socket)

  const handleFileChange = (event) => {
    console.log(event.target.files);
    if (event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.size);
      if (file.size > 1000000) {
        alert("File size is to big");
        setFileName("Choose file");
        return;
      }
      setFileName(event.target.files[0].name);
      convertToBase64(file, setFileData);
      setFileSize(file.size);
    } else {
      setFileName("Choose file");
      setFileData("");
      setFileSize("");
    }
    // Do something with the file, such as uploading or processing it
  };

  const handleUploadFile = () => {
    socket.emit("sendFile", {
      fileName: fileName,
      fileData: fileData,
      fileSize: fileSize,
      chatId: chatId,
    });
    setFileData("");
    setFileSize("");
  };

  return (
    <div className="NewMessageArea">
      <div className="SendTextArea">
        <TextField
          className="SendTextArea__TextField"
          id="outlined-multiline-static"
          label="New message"
          multiline
          rows={2}
          fullWidth={true}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping(); // Call handleTyping function when the user types
          }}
        />
        <Button variant="contained" onClick={sendMessage} disabled={!message}>
          Send
        </Button>
      </div>
      <div className="uploadFileArea">
        <div className="chooseFileArea">
          <label
            htmlFor="uploadFileArea__file"
            className="uploadFileArea__fileWrapper"
          >
            <Button variant="contained">File</Button>
            <input
              type="file"
              className="uploadFileArea__file"
              id="uploadFileArea__file"
              onChange={handleFileChange}
            />
          </label>
          <span className="chooseFileArea__fileName">{fileName}</span>
        </div>
        <Button
          variant="contained"
          onClick={handleUploadFile}
          disabled={!fileSize}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default NewMessageArea;
