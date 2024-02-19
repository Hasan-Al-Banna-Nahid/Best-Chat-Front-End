import "./OperatorItem.css";

import DeleteIcon from "../../../assets/Icons/DeleteIcon/DeleteIcon";
//mui
import { FormControlLabel, Switch } from "@mui/material";
//redux
import { useSelector, useDispatch } from "react-redux";
import { deleteOperatorThunk } from "../../../store/OperatorsReducer";
import { updateOperatorOnlineThunk } from "../../../store/OperatorsReducer";

import { useState } from "react";

const OperatorItem = ({ el }) => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(el.online);

    return (
        <div className="OperatorItem robotoText">
            <div className="OperatorItem__infoWrap">
                <span className="OperatorItem__operatorName">{el.name}</span>
                <span className="OperatorItem__operatorTg">{el.tg}</span>
                <span className="OperatorItem__operatorWhatsApp">
                    {el.whatsapp}
                </span>
                <span>
                    <Switch
                        checked={isChecked}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            const operatorId = el._id;
                            let isChecked = e.target.checked;
                            dispatch(
                                updateOperatorOnlineThunk({
                                    operatorId,
                                    isChecked,
                                })
                            );
                        }}
                        name="operatorOnline"
                    />
                </span>
            </div>

            <span
                className="OperatorItem__btnDelete"
                onClick={() => {
                    console.log(el._id);
                    dispatch(deleteOperatorThunk(el._id));
                }}
            >
                {DeleteIcon()}
            </span>
        </div>
    );
};

export default OperatorItem;
