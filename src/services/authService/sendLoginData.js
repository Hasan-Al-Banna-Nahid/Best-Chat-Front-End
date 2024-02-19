import { backURL } from "../../common/config";

const sendLoginData = async (pass) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        authKey: pass,
    });

    console.log(raw);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let path = `${backURL}/auth/login`;

    const resFunc = fetch(path, requestOptions)
        .then(async (response) => {
            console.log(response);
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

export default sendLoginData;
