import Spinner from "../Spinner/Spinner";
import "./Layout.css";

import { Outlet, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { checkJwt } from "../../store/AuthReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useSocketConnect from "../../utils/useSocketConnect";
const Layout = () => {
  useSocketConnect();
  const isErrorAuth = useSelector((state) => state.AuthReducer.error);
  const isErrorChat = useSelector((state) => state.ChatReducer.error);
  const jwt = useSelector((state) => state.AuthReducer.jwt);
  //   const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const notify = () => toast(isErrorAuth || isErrorChat);
  const navigate = useNavigate();

  if (jwt) {
    console.log("something in jwt");
    dispatch(checkJwt(jwt));
  }

  useEffect(() => {
    if (isErrorAuth) {
      notify();
      navigate("/login");
    }
    if (isErrorChat) {
      notify();
      setTimeout(() => {
        navigate("/chats");
      }, 1000);
    }
  }, [isErrorAuth, isErrorChat]);

  return (
    <main className="App">
      <Outlet />
      <Spinner />
      <ToastContainer />
    </main>
  );
};

export default Layout;
