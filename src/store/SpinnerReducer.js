import { createSlice } from "@reduxjs/toolkit";


const SpinnerReducer = createSlice({
    name: "SpinnerReducer",
    initialState: false,
    reducers: {
        setSpinnerTrue(state) {
            return (state = true);
        },
        setSpinnerFalse(state) {
            return (state = false);
        },
    },
});

export default SpinnerReducer.reducer;
export const { setSpinnerTrue, setSpinnerFalse } = SpinnerReducer.actions;
