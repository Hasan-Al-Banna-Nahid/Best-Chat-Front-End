import { backURL } from "../../common/config";

const getAllUsers = () => {
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  myHeaders.append("Authorization", `Bearer ${jwt}`);

  console.log(jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let path = `${backURL}/users`;

  const resFunc = fetch(path, requestOptions)
    .then(async (response) => {
      const res = await response.json();
      console.log(res);
      return { usersList: res, status: response.status };
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));

  return resFunc;
};

export default getAllUsers;
