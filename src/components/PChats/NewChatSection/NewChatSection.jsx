import { Button, TextField } from "@mui/material";
import "./NewChatSection.css";
//components

//redux
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// store
import { chatsService } from "../../../services/chatsService";
import { createNewChatThunk } from "../../../store/ChatsReducer";

const NewChatSection = () => {
    const dispatch = useDispatch();
    const [chatName, setChatName] = useState("");

    return (
        <div className="NewChatSection">
            <TextField
                variant="outlined"
                size="small"
                label="New chat name"
                className="NewChatSection__element"
                value={chatName}
                onChange={(e) => {
                    setChatName(e.target.value);
                }}
            ></TextField>
            <Button
                variant="contained"
                color="success"
                className="NewChatSection__element"
                onClick={() => {
                    // chatsService.createNewChat(chatName)
                    dispatch(createNewChatThunk(chatName));
                    setChatName("");
                }}
                disabled={!(chatName)}
            >
                Create
            </Button>
        </div>
    );
};

export default NewChatSection;
