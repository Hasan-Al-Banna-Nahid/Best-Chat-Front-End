import { backURL } from "../../common/config";
import io from "socket.io-client";

const socketConnect = (jwt) => {
  // const socket = await io.connect(backURL)
  //   const jwt = localStorage.getItem("jwt");
  const socketURL = backURL.replace(/\/\?/, "");

  if (jwt) {
    const socket = io(socketURL, {
      query: { jwtToken: jwt },
      transports: ["websocket"], // Explicitly specify the transport to use
    });
    console.log("this is socketConnect----");
    return socket;
  }
};

export default socketConnect;
