import { backURL } from "../../common/config";

const sendDataOnLeftRoom = async (socket, chatId) => {
    console.log('sendDataOnLeftRoom')
    if (chatId !== "") {

        await socket.emit('leftRoom', chatId)
      }
};

export default sendDataOnLeftRoom;