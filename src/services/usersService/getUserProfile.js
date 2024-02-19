import { backURL } from "../../common/config";

const getUserProfile = async (userId) => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem("jwt");
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    myHeaders.append("Content-Type", "application/json");
    console.log(jwt);

    var raw = JSON.stringify({
        userId: userId,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let path = `${backURL}/users/getUserById`;

    const resFunc = fetch(path, requestOptions)
        .then(async (response) => {
            const res = await response.json();
            console.log(res);
            return { user: res, status: response.status };
        })
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((error) => console.log("error", error));

    return resFunc;
};

export default getUserProfile;
