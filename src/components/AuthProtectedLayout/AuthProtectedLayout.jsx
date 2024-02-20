import Header from "../Header";
import "./AuthProtectedLayout.css";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { socketService } from "../../services/socketService";

const AuthProtectedLayout = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const jwt = useSelector((state) => state.AuthReducer.jwt);
  const [socket, setSocket] = useState("");

  useEffect(() => {
    console.log("AuthProtectedLayout rerender");
    console.log(jwt);
    if (!jwt) {
      navigate("/login");
    }

    setSocket(socketService.socketConnect(jwt));
    return () => {
      socketService.socketDisconnect(socket);
    };
  }, []);

  return (
    <>
      <Header />
      <Outlet context={socket} />
    </>
  );
};

export default AuthProtectedLayout;
