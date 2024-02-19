import { backURL } from "../../common/config";
import { PushLastMessageReducer } from "../../store/ChatReducer";

const subscribeOnNewMessage = async (socket, dispatch) => {
  if (socket) {
    
    socket.on("receiveMessage", (data) => {
      console.log('this is receiveMessage',data);
      dispatch(PushLastMessageReducer(data))
    });
  }
  
};

export default subscribeOnNewMessage;