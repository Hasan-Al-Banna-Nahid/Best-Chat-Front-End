import { Button, TextField } from "@mui/material";
import "./ChatBodySection.css";
//components
import AllMessagesArea from "./AllMessagesArea";
import NewMessageArea from "./NewMessageArea";

//redux
import { useDispatch, useSelector } from "react-redux";

// store
import { createNewChatThunk } from "../../../store/ChatsReducer";



const ChatBodySection = () => {
    const dispatch = useDispatch();

    return (
        <div className="ChatBodySection">
            <AllMessagesArea/>
            <NewMessageArea/>
        </div>
    );
};

export default ChatBodySection;
