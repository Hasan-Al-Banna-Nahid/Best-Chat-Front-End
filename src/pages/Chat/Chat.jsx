import "./Chat.css";
//redux
import { useDispatch, useSelector } from "react-redux";
//router
import { useOutletContext, useParams } from "react-router-dom";
//components
import ChatBodySection from "../../components/PChat/ChatBodySection";
import ChatInfoSection from "../../components/PChat/ChatInfoSection";
//react
import { useEffect, useState } from "react";
//service
import { socketService } from "../../services/socketService";

import { backURL } from "../../common/config";

// store
import { getChatThunk } from "../../store/ChatReducer";
import { ChatReducerEmpty } from "../../store/ChatReducer";

const Chat = () => {
  const [chatid, setChatId] = useState("");
  const { chat } = useParams();
  const socket = useOutletContext();
  // console.log('1111111111111111111')

  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    const { chatId } = params;
    console.log("chat Param Chat", chatId);

    dispatch(getChatThunk(chatId));
    if (socket) {
      socketService.sendDataOnJoinRoom(socket, chatId);
      setChatId(chatId);
    }

    return () => {
      console.log("22122222");
      if (socket) {
        socketService.sendDataOnLeftRoom(socket, chatId);
      }

      dispatch(ChatReducerEmpty());
    };
  }, [dispatch]);

  return (
    <div className="Chat">
      <ChatInfoSection />
      <ChatBodySection chatParam={chatid} />
    </div>
  );
};

export default Chat;
