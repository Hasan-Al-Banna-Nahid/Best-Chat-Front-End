import { DataGrid } from "@mui/x-data-grid";

import "./UsersTable.css";

import { useEffect, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { usersThunk } from "../../../store/UsersReducer";
import { UsersReducerEmpty } from "../../../store/UsersReducer";
//components
import DeleteBtn from "./DeleteBtn";
import SelectUserRole from "./SelectUserRole";

import DeleteIcon from "../../../assets/Icons/DeleteIcon/DeleteIcon";
import { Button, Collapse } from "@mui/material";
import { Link } from "react-router-dom";

import { usersService } from "../../../services/usersService";


const UsersTable = () => {
    const columns = [
        { field: "id", headerName: "ID", width: 120 },
        { field: "username", headerName: "User", width: 130 },
        { field: "role",
        headerName: "Role",
        width: 130,
        renderCell: (params) => <SelectUserRole params={params} />
     },
        {
            field: "moneyGet",
            headerName: "",
            width: 60
        },
        {
            field: "moneySend",
            headerName: "",
            width: 60
        },
        {
            field: "openBtn",
            headerName: "",
            width: 130,
            renderCell: (params) => <DeleteBtn params={params} />,

        },
    ];

    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.UsersReducer.usersList);
    // MUI: The data grid component requires all rows to have a unique `id` property.
    const usersListWithId = usersList.map((el) => ({
        ...el,
        id: el._id.toString().slice(-6),
    }));
    useEffect(() => {
        console.log("usersTable Render");
        dispatch(usersThunk());

        return () => {
            dispatch(UsersReducerEmpty());
        };
    }, [dispatch]);

    return (
        <div className="UsersTable">
            <DataGrid
                stickyHeader
                size="small"
                rows={usersListWithId}
                columns={columns}
                paginationModel={{ page: 0, pageSize: 20 }}
                className="usersDataGrid"
                onCellEditStop={(params, event) => {
                    const userId = params.row._id;
                    let getOrSend = params.field;
                    if (getOrSend === "moneyGet") {
                        getOrSend = "GET";
                    }
                    if (getOrSend === "moneySend") {
                        getOrSend = "SEND";
                    }
                    const amount = event.target.value;
                    console.log(userId, getOrSend, amount);
                }}
            />
        </div>
    );
};

export default UsersTable;
