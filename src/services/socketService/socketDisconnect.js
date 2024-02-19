import { backURL } from "../../common/config";

const socketDisconnect = async (socket) => {
    // socket
    if (socket) {
        console.log("Disconnecting socket...");
        console.log(socket)
        await socket.emit("disconnectThisSocket", socket.id);
    }

    // await socket.disconnect();
};

export default socketDisconnect;