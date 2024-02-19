import "./Profile.css";

import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";

import onClickLogoutHandler from "./onClickLogoutHandle";


const Profile = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.AuthReducer.user.username);

    return (
        <div className="Profile">
            {userName}
            {" "}
            <NavLink to="/login"
                onClick={() => {
                    onClickLogoutHandler(dispatch);
                    
                }}
            >
                Logout
            </NavLink>
        </div>
    );
};

export default Profile;
