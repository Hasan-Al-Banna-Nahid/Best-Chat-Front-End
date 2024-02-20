import { useEffect } from "react";
import { backURL } from "../../common/config";
import io from "socket.io-client";

const socketConnect = (jwt) => {
  // Remove trailing slash and query string from backURL

  //   const socketURL = backURL.replace(/\/\?/, "");

  if (jwt) {
    // Initialize socket connection with jwtToken query parameter
    const socket = io(backURL, {
      query: { jwtToken: jwt },
    });

    // Event listeners for error handling
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    console.log("Socket connected successfully.");
    return socket;
  } else {
    console.error("JWT token is missing.");
    return null;
  }
};

export default socketConnect;
