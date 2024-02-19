import "./CreateNewUserSection.css";

import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { usersThunk } from "../../../store/UsersReducer";
import { createNewUserThunk } from "../../../store/UsersReducer";

import { Button, Collapse, TextField } from "@mui/material";
import { Link } from "react-router-dom";

import { usersService } from "../../../services/usersService";

import generateRandomString from "../../../utils/generateRandomString";

const CreateNewUserSection = () => {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [authKey, setAuthKey] = useState("");

    return (
        <div className="CreateNewUserSection">
            <TextField
                id="outlined-basic"
                label="User name"
                variant="outlined"
                size="small"
                value={userName}
                className="CreateNewUserSection__element"
                onChange={(e) => {
                    setUserName(e.target.value);
                }}
            />
            <TextField
                id="outlined-basic"
                label="Auth Key"
                variant="outlined"
                size="small"
                value={authKey}
                className="CreateNewUserSection__element"
                onChange={(e) => {
                    setAuthKey(e.target.value);
                }}
            />
            <Button
                className="CreateNewUserSection__element"
                variant="contained"
                onClick={() => {
                    setAuthKey(generateRandomString(18));
                }}
            >
                Generate auth key
            </Button>
            <Button
                className="CreateNewUserSection__element"
                variant="contained"
                color="success"
                onClick={() => {
                    console.log(userName, authKey);
                    dispatch(createNewUserThunk({ userName, authKey }));
                    setUserName("");
                    setAuthKey("");
                }}
                disabled={!(userName && authKey)}
            >
                new user
            </Button>
        </div>
    );
};

export default CreateNewUserSection;
