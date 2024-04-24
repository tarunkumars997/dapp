import React from "react";

const Login = (props) => {
    return (
        <div className="login-container">
            <div id="avatar"> </div>
            <button className="login-button1" onClick = {props.connectWallet}>Login Metamask</button>
        </div>
    )
}

export default Login;