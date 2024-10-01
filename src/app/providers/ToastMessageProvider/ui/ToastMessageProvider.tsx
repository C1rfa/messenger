
import { ToastContainer, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


export const ToastMessageProvider = () => {
    return (
        <ToastContainer 
            className="text-center"
            position="top-center"
            autoClose={3000}
            closeOnClick
            transition={Flip}
            draggable = {false}
        />
    );
};