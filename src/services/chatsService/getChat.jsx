import { useState } from "react";
import { backURL } from "../../common/config";

const getChat = async (chatId) => {
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  myHeaders.append("Authorization", `Bearer ${jwt}`);
  console.log("func getChat started");
  console.log(chatId);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let path = `${backURL}/chats/${chatId}`;

  const resFunc = fetch(path, requestOptions)
    .then(async (response) => {
      const res = await response.json();
      console.log("getChat", res);
      return { chat: res, status: response.status };
    })
    .then((result) => {
      console.log(result);

      return result;
    })
    .catch((error) => console.log("error", error));

  return resFunc;
};

export default getChat;

// ==============

// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGI4NDVmNzI0ZTA0Nzk4NWZjMWJkMiIsInJvbGUiOiJBRE1JTiIsInVzZXJuYW1lIjoiYWRtaW4xIiwiaWF0IjoxNjg3NzEyMTMwLCJleHAiOjE2ODc4ODQ5MzB9.h9KmUsJm209JTjwOeMg-e9TA3yGY-BeneLQ-kiT5dB4");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };
