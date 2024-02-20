import React, { useEffect } from "react";
import socketConnect from "../services/socketService/socketConnect";

const useSocketConnect = () => {
  useEffect(() => {
    socketConnect.connect();
  }, []);
  return <div></div>;
};

export default useSocketConnect;
