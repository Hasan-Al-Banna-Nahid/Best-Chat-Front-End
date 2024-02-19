import { backURL } from "../../common/config";

const jwt = localStorage.getItem("jwt");

const updateUserRole = async (userId, newRole) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "userId": userId,
        "newRole": newRole
      });

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let path = `${backURL}/users/updateUserRole`;

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

export default updateUserRole;
