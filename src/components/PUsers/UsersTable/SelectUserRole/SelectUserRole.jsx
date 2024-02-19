import "./SelectUserRole.css";

//redux
import { useDispatch, useSelector } from "react-redux";

import { deleteUserThunk } from "../../../../store/UsersReducer";

import { Button, Collapse, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { updateUserRoleThunk } from "../../../../store/UsersReducer";

const SelectUserRole = ({ params }) => {
    const dispatch = useDispatch();
    // console.log(params)
    return (
        <div className="SelectUserRole">
            <FormControl fullWidth size="small">
                <Select
                    value={params.row.role}
                    onChange={(e) => {
                        console.log(e.target.value)
                        const userId = params.row._id
                        const newRole = e.target.value
                        dispatch(updateUserRoleThunk({userId, newRole}))
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value='USER'>USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectUserRole;
