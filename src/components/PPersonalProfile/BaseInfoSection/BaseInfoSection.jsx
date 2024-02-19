import "./BaseInfoSection.css";

import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

//redux
import { useSelector, useDispatch } from "react-redux";
import { updatePersonalBaseInfoThunk } from "../../../store/AuthReducer";

import { useState } from "react";

import { allCountries } from "../../../common/enum";

const BaseInfoSection = () => {
    const dispatch = useDispatch();

    const userName = useSelector((state) => state.AuthReducer.user.username);
    const moneyGet = useSelector((state) => state.AuthReducer.user.moneyGet);
    const moneySend = useSelector((state) => state.AuthReducer.user.moneySend);

    const firstNameDef = useSelector(
        (state) => state.AuthReducer.user.firstName
    );
    const lastNameDef = useSelector((state) => state.AuthReducer.user.lastName);
    const countryDef = useSelector((state) => state.AuthReducer.user.country);

    const [firstName, setFirstName] = useState(firstNameDef);
    const [lastName, setLastName] = useState(lastNameDef);
    const [country, setCountry] = useState(countryDef);

    return (
        <Box component="form" className="userBaseInfo">
            <div className="userBaseInfo__row baseInfoTittle">
                <div className="robotoText">{userName}</div>
                <div className="robotoText">
                    You receive {moneyGet}$, you send {moneySend}$
                </div>
            </div>
            <div className="userBaseInfo__row">
                <TextField
                    className="userTextField"
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    size="small"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <TextField
                    className="userTextField"
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    size="small"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </div>
            <div className="userBaseInfo__row">
                <FormControl className="userTextField" size="small">
                    <InputLabel id="userCountryLabel">Country</InputLabel>
                    <Select
                        labelId="userCountryLabel"
                        id="userCountry"
                        label="Country"
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                        value={country}
                    >
                        {allCountries.map((el, id) => (
                            // <CountryItem el={el.name} key={id} />
                            <MenuItem value={el.name} key={id}>
                                {el.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    className="userBaseInfo__submitBtn"
                    onClick={() => {
                        dispatch(
                            updatePersonalBaseInfoThunk({
                                firstName,
                                lastName,
                                country,
                            })
                        );
                        // dispatch(checkJwt());
                    }}
                >
                    Update
                </Button>
            </div>
        </Box>
    );
};

export default BaseInfoSection;
