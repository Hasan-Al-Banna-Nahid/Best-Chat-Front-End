import { backURL } from "../../common/config";

const sendDataOnJoinRoom = async (socket, chatId) => {
    console.log('sendDataOnJoinRoom')
    if (chatId !== "") {

        await socket.emit('joinRoom', chatId)
      }
};

export default sendDataOnJoinRoom;