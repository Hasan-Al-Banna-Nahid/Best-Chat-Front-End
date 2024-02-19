import { useEffect } from "react";
import "./AllChatsSection.css";
//components
import ChatRow from "./ChatRow";
//redux
import { useDispatch, useSelector } from "react-redux";
import { allChatsThunk } from "../../../store/ChatsReducer";
// store

const AllChatsSection = () => {

    const chats = useSelector(state=>state.ChatsReducer.chatsList)

    return (
        <div className="AllChatsSection">
            {chats.map(el=> <ChatRow chat={el} key={el._id}/> )}
        </div>
    );
};

export default AllChatsSection;
