import { useEffect } from "react";
import "./ChatRow.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//components
import AllowUserSelect from "./AllowUserSelect";
// store
import { deleteChatThunk } from "../../../../store/ChatsReducer";
import { useSelector } from "react-redux";
import { Chat } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';

const ChatRow = ({ chat }) => {
    const userRole = useSelector((state) => state.AuthReducer.user.role);
    const isAdmin = userRole === "ADMIN";

    const dispatch = useDispatch();

    return (
        <div className="ChatRow">
            <div className="ChatRowTittle">
            <ChatIcon color="disabled"/>
                <div className="ChatRowTittle__name">{chat.chatName}</div>
            </div>
            

            <div className="ChatRowMenu">
                        <Link to={chat._id}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                console.log('this is link to chat')
                                console.log(chat._id)
                            }}
                        >
                            Join
                        </Button>
                        </Link> 
                {isAdmin ? (
                    <>
                        <AllowUserSelect chat={chat} />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                dispatch(deleteChatThunk(chat._id));
                            }}
                        >
                            Delete
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default ChatRow;
