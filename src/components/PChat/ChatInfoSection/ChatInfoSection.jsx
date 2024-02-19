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
    const chat = useSelector(state=>state.ChatReducer.chat)
    // console.log(chat.users)
    const dispatch = useDispatch();


    return (
        <div className="ChatInfoSection">
            <div className="ChatInfoSectionTable">
                <div>NAME</div>
                <div>{chat.chatName}</div>
                <div>Participants</div>
                <div>{
                    chat.users?chat.users.map((user)=><div key={user._id}>{user.username}</div>):null
                }</div>
            </div>
        </div>
    );
};

export default ChatInfoSection;
