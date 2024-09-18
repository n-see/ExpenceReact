import { json } from "react-router-dom";
import { User } from "../App";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap"

//Helper function to check token

// let userData= {};
// if(localStorage.getItem("UserData")) {
//     userData = JSON.parse(localStorage.getItem("UserData"));
// }

const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if (lsData && lsData != null) {
        result = true;
    }
    return result;
};

const createAccount = (createdUser:User) => {
    axios
    .post(BASE_URL + "User/AddUsers", createdUser )
    .then(() => console.log("user successfully created"))
    .catch(error => error.message)
};

export {createAccount, checkToken}