import { backURL } from "../../common/config";

const checkJwt = async (token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    token: token,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let path = `${backURL}/auth/jwt`;

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

export default checkJwt;
