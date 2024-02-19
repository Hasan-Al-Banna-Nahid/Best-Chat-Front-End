import "./CardItem.css";

import DeleteIcon from "../../../../assets/Icons/DeleteIcon/DeleteIcon";

import { useSelector, useDispatch } from "react-redux";
import { deleteCardPersonalThunk } from "../../../../store/AuthReducer";

const CardItem = ({ el }) => {
    const dispatch = useDispatch();

    return (
        <div className="CardItem robotoText">
            <div className="CardItem__infoWrap">
                <span className="CardItem__cardNumber">{el.number}</span>
                <span className="CardItem__cardExp">{el.exp}</span>
                <span>{el.notes}</span>
            </div>

            <span
                className="CardItem__btnDelete"
                onClick={() => {
                    dispatch(deleteCardPersonalThunk(el._id));
                }}
            >
                {DeleteIcon()}
            </span>
        </div>
    );
};

export default CardItem;
