import "./Nav.css";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

const Nav = () => {
    const userRole = useSelector((state) => state.AuthReducer.user.role);

    return (
        <div className="Nav">
            {/* <NavLink to="/">Home</NavLink> */}
            <NavLink to="/chats">Chats</NavLink>
            {userRole === "ADMIN" ? <NavLink to="/users">Users</NavLink> : null}
        </div>
    );
};

export default Nav;
