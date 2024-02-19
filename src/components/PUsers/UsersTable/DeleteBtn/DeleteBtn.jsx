
import "./DeleteBtn.css";

//redux
import { useDispatch, useSelector } from "react-redux";


import { deleteUserThunk } from "../../../../store/UsersReducer";

import { Button, Collapse } from "@mui/material";


const DeleteBtn = ({ params }) => {
    const dispatch = useDispatch();

    return (
            <Button
                color='error'
                variant="contained"
                onClick={(event) => {
                    // console.log(event);
                    // console.log(params.row._id);
                    dispatch(deleteUserThunk(params.row._id))
                }}
            >
                Delete
            </Button>
    );
};



export default DeleteBtn;
