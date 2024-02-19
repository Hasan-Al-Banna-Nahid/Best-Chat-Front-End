import "./CardsSection.css";

import { useSelector, useDispatch } from "react-redux";
import { addCardPersonalThunk } from "../../../store/AuthReducer";

import CardItem from "./CardItem/CardItem";

import AddIcon from "../../../assets/Icons/AddIcon/AddIcon";
import { TextField } from "@mui/material";
import { useState } from "react";

const CardsSection = () => {
    const dispatch = useDispatch();

    const cards = useSelector((state) => state.AuthReducer.user.cards);

    const [cardNumber, setCardNumber] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardNotes, setCardNotes] = useState("");
    console.log(cardNumber, cardExp, cardNotes);

    return (
        <section>
            <div className="cardSectionWrapper">
                <div className="cardListTittle">
                    <span className="robotoText">Your cards list:</span>
                </div>
                {cards[0]
                    ? cards.map((el) => (
                          <CardItem el={el} key={el._id.toString()} />
                      ))
                    : null}
                <div className="cardListFooter">
                    <TextField
                        className="cardNumberTextField"
                        id="cardNumber"
                        label="Card Number"
                        variant="outlined"
                        value={cardNumber}
                        size="small"
                        onChange={(e) => {
                            setCardNumber(e.target.value);
                        }}
                    />
                    <TextField
                        className="cardExpTextField"
                        id="cardExp"
                        label="Exp MM/YY"
                        variant="outlined"
                        value={cardExp}
                        size="small"
                        onChange={(e) => {
                            setCardExp(e.target.value);
                        }}
                    />
                    <TextField
                        className="cardNotesTextField"
                        id="cardNotes"
                        label="Notes"
                        variant="outlined"
                        value={cardNotes}
                        size="small"
                        onChange={(e) => {
                            setCardNotes(e.target.value);
                        }}
                    />
                    <span
                        onClick={() => {
                            dispatch(
                                addCardPersonalThunk({
                                    cardNumber,
                                    cardExp,
                                    cardNotes,
                                })
                            );
                        }}
                    >
                        {AddIcon()}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default CardsSection;
