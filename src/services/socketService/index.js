import socketConnect from "./socketConnect";
import socketDisconnect from "./socketDisconnect";
import sendDataOnConnection from "./sendDataOnConnection";
import sendDataOnJoinRoom from "./sendDataOnJoinRoom";
import sendDataOnLeftRoom from "./sendDataOnLeftRoom";
import subscribeOnNewMessage from "./subscribeOnNewMessage";

export const socketService = {
  socketConnect: socketConnect,
  //   sendDataOnConnection: sendDataOnConnection,
  sendDataOnJoinRoom: sendDataOnJoinRoom,
  sendDataOnLeftRoom: sendDataOnLeftRoom,
  subscribeOnNewMessage: subscribeOnNewMessage,
  socketDisconnect: socketDisconnect,
};
