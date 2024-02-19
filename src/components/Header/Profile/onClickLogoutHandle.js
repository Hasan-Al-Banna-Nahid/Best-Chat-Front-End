import { AuthReducerEmpty } from "../../../store/AuthReducer";

const onClickLogoutHandler = (dispatch) => {
    console.log("this is logout");
    localStorage.setItem("jwt", "");
    dispatch(AuthReducerEmpty());
};

export default onClickLogoutHandler;
