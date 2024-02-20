import { backURL } from "../../common/config";

const sendDataOnConnection = async (socket, jwt) => {
  console.log("-------this is sendDataOnConnection start----------");
  //   const jwt = localStorage.getItem("jwt");
  if (socket && jwt) {
    // socket.on("connect", () => {
    socket.emit("sendDataOnConnection", {
      jwt: jwt,
    });
    // });
    console.log("sendDataOnConnection done");
  }
};

export default sendDataOnConnection;
