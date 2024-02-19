import "./Chats.css";
//components
import AllChatsSection from "../../components/PChats/AllChatsSection";
import NewChatSection from "../../components/PChats/NewChatSection";

import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
// store
import { ChatsReducerEmpty } from "../../store/ChatsReducer";
import { allChatsThunk } from "../../store/ChatsReducer";
import { usersThunk } from "../../store/UsersReducer";
import { UsersReducerEmpty } from "../../store/UsersReducer";

const Chats = () => {

    const dispatch = useDispatch();
    const userRole = useSelector(state=>state.AuthReducer.user.role)

    useEffect(() => {
        dispatch(allChatsThunk());
        dispatch(usersThunk());
        return () => {
            dispatch(ChatsReducerEmpty());
            dispatch(UsersReducerEmpty());
        };
    }, [dispatch]);
    

    return (
        <div className="Chats">
            {userRole==='ADMIN'?<NewChatSection />:null}
            <AllChatsSection />
        </div>
    );
};

export default Chats;
