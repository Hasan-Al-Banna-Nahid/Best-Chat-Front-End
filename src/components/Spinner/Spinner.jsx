import React from "react";

import "./Spinner.css";
import { useSelector } from "react-redux";

const Spinner = () => {
    const isSpinner = useSelector((state) => state.Spinner);
    const isSpinnerAuth = useSelector((state) => state.AuthReducer.loading);
    const isSpinnerUsers = useSelector((state) => state.UsersReducer.loading);
    const isSpinnerChats = useSelector((state) => state.ChatsReducer.loading);
    const isSpinnerChat = useSelector((state) => state.ChatReducer.loading);

    return isSpinner ||
        isSpinnerAuth ||
        isSpinnerChats ||
        isSpinnerChat ||
        isSpinnerUsers ? (
        <div className="Spinner">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <rect x="17.5" y="30" width="15" height="40" fill="#85a2b6">
                    <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="18;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                    ></animate>
                    <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="64;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.2s"
                    ></animate>
                </rect>
                <rect x="42.5" y="30" width="15" height="40" fill="#bbcedd">
                    <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                    ></animate>
                    <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                        begin="-0.1s"
                    ></animate>
                </rect>
                <rect x="67.5" y="30" width="15" height="40" fill="#dce4eb">
                    <animate
                        attributeName="y"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="20.999999999999996;30;30"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    ></animate>
                    <animate
                        attributeName="height"
                        repeatCount="indefinite"
                        dur="1s"
                        calcMode="spline"
                        keyTimes="0;0.5;1"
                        values="58.00000000000001;40;40"
                        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                    ></animate>
                </rect>
            </svg>

            {/* <img className="spinner-img" src={Pulse} alt="" /> */}
        </div>
    ) : null;
};

export default Spinner;
