import { backURL } from "../../common/config";

const addUsersArrToChat = async (chatId, usersIdArr) => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem("jwt");
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    myHeaders.append("Content-Type", "application/json");
    console.log(usersIdArr)
    var raw = JSON.stringify({
        "chatId": chatId,
        "usersId": usersIdArr
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

    let path = `${backURL}/chats/addUsersArrToChat`;

    const resFunc = fetch(path, requestOptions)
        .then(async (response) => {
            const res = await response.json();
            console.log(res);
            return { ...res, status: response.status };
        })
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((error) => console.log("error", error));

    return resFunc;
};

export default addUsersArrToChat;