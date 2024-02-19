import "./AdminProtectedLayout.css";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const AdminProtectedLayout = () => {
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.AuthReducer.user.role);

    useEffect(() => {
        if (userRole !== "ADMIN") {
            navigate("/error");
        }
    }, [userRole, navigate]);

    return (
            <Outlet />
    );
};

export default AdminProtectedLayout;
