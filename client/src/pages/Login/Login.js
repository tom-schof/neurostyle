import React from 'react';
import { Row } from '../../components/Grid';
import Signup from '../../components/Signup';
import NavCustom from '../../components/NavCustom';
import './Login.css';

const Login = props => (
  <div>
    <NavCustom updateUser={props.updateUser} loggedIn />
    <div className="container">
      <div className="header-message text-center shadow">Style Your Life</div>
    </div>
    <div className="container login-container">
      <Row>
        <div className="col-md-6 login-col">
          <div className="imgDiv">
            <img
              className="loginImage"
              src="./img/LoginImage.png"
              alt="login image"
            />
          </div>
        </div>
        <div className="col-md-6 login-col">
          <Signup updateUser={props.updateUser} loggedIn />
        </div>
      </Row>
    </div>
  </div>
);

export default Login;
