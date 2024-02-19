import { backURL } from "../../common/config";

const jwt = localStorage.getItem("jwt");

const updatePersonalBaseInfo = async (firstName, lastName, country) => {
    console.log("updatePersonalBaseInfo func start");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        firstName,
        lastName,
        country,
    });

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let path = `${backURL}/users/updatePersonalBaseInfo`;

    const resFunc = fetch(path, requestOptions)
        .then(async (response) => {
            const res = await response.json();
            console.log(res);
            return { res, status: response.status };
        })
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((error) => console.log("error", error));

    return resFunc;
};

export default updatePersonalBaseInfo;
