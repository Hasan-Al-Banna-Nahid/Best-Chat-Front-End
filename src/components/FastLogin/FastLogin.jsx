import React, { useEffect } from "react";

import "./FastLogin.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/AuthReducer";

const FastLogin = () => {
  const dispatch = useDispatch();

  let params = useParams();
  const { authKey } = params;
  console.log(authKey);
  console.log(chatId);
  const pass = authKey;

  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loginThunk({ pass }));
  }, []);
  useEffect(() => {
    if (isAuth) {
      navigate(`/chats/${chatId}`);
    } else {
      navigate("/login");
      window.location.reload();
    }
  }, [isAuth]);

  console.log(chatId);
  return <div className="FastLogin"></div>;
};

export default FastLogin;
