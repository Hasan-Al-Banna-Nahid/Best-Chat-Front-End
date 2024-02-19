import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { ToastContainer, toast } from 'react-toastify';

const notify = () => toast("Wow so easy !");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    

    <Provider store={store}>
        {/* const isError = useSelector((state) => state.AuthReducer.error); */}
        <BrowserRouter>
            <App />
            {/* <ToastContainer /> */}
        </BrowserRouter>
    </Provider>

    // </React.StrictMode>
);

reportWebVitals();
