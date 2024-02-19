import { useEffect, useState } from "react";
import "./AllowUserSelect.css";
import { Button } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
//mui
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//components

// store
import { deleteChatThunk } from "../../../../../store/ChatsReducer";
import { addUsersArrToChatThunk } from "../../../../../store/ChatsReducer";

//func


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const AllowUserSelect = ({chat}) => {
    const dispatch = useDispatch()

    const usersObj = useSelector(state=>state.UsersReducer.usersList)
    const allUsersRoleUser =  usersObj.filter(el=>el.role==='USER')
    // console.log(chat.users)
    const allowedUsersDef = chat.users.map(el=>el._id)
    // console.log(allowedUsersDef)
    // console.log(usersFiltered)
    const theme = useTheme();
    const [allowedUsers, setAllowedUsers] = useState(allowedUsersDef);

    const handleChange = (event) => {
        console.log('this is change')
        console.log(event)
        const {
            target: { value },
        } = event;
        console.log(value)
        setAllowedUsers(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        const chatId =chat._id
        const usersIdArr = value
        dispatch(addUsersArrToChatThunk({chatId, usersIdArr}))
    };

    return (
        <div className="AllowUserSelect">
            <FormControl sx={{ m: 1, width: 300 }} size="small">
                <InputLabel id="demo-multiple-name-label">Users</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={allowedUsers}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {allUsersRoleUser.map((user) => (
                        <MenuItem
                            key={user._id}
                            value={user._id}
                            style={getStyles(user.username, allowedUsers, theme)}
                        >
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default AllowUserSelect;
