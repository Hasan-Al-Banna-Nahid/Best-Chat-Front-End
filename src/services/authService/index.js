import sendLoginData from "./sendLoginData";
import checkJwt from "./checkJwt";
import sendRegisterData from "./sendRegisterData";
import updatePersonalBaseInfo from "../usersService/updatePersonalBaseInfo";

export const authService = {
    sendLoginData: sendLoginData,
    sendRegisterData: sendRegisterData,
    checkJwt: checkJwt,
    updatePersonalBaseInfo: updatePersonalBaseInfo,
};
