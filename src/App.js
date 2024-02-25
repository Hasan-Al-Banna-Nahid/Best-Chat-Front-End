import "./App.css";

import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import Users from "./pages/Users";

import AuthProtectedLayout from "./components/AuthProtectedLayout";
import ErrorPermissions from "./pages/ErrorPermissions";
import AdminProtectedLayout from "./components/AdminProtectedLayout";
import Chat from "./pages/Chat";
import FastLogin from "./components/FastLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* { public routes} */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="/login/:authKey/chats/:chatId" element={<FastLogin />} /> */}
        <Route path="/login/:authKey/:chatId/chats" element={<FastLogin />} />
        <Route path="/" element={<AuthProtectedLayout />}>
          {/* { private routes to certain user} */}
          <Route path="/" element={<Home />} />
          <Route path="chats" element={<Chats />} />
          <Route path="chats/:chatId" element={<Chat />} />
          <Route path="error" element={<ErrorPermissions />} />
          {/* { private routes to all admin} */}
          <Route element={<AdminProtectedLayout />}>
            <Route path="/users" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
