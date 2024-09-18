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
    .then(res => res.data)
    .catch(error => error.message)
};

const login = (loginUser:User) => {
    axios
    .post(BASE_URL + "/User/Login", loginUser)
    .then((res) => {

        let data = res.data
        localStorage.setItem("Token", data.token)
    
    }
    )
    .catch(error => error.message)
}

export {createAccount, checkToken}