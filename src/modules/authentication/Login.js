import React, { useState, useContext } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CustomInput,
  FormGroup,
  Row,
  Col,
  Button,
  Form,
  Label,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";

import img1 from "../../assets/images/icon.png";
import img2 from "../../assets/images/background/login-register.jpg";

import { UserContext } from "../../contexts/UserContext";
import ACTIONS from "../../actions/user";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom center",
  backgroundSize: "cover",
};

const Login = () => {
  const {
    userLogin,
    dispatch,
    forgotPassword,
    verifyToken,
    resetPassword,
  } = useContext(UserContext);
  const { addToast } = useToasts();

  const handleForgotPassClick = () => {
    var elem = document.getElementById("loginform");
    elem.style.transition = "all 2s ease-in-out";
    elem.style.display = "none";
    document.getElementById("recoverform").style.display = "block";
  };

  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });
  const [forgotPayload, setforgotPayload] = useState({ username: "" });
  const [tokenPayload, settokenPayload] = useState({ token: "" });
  const [newPasswordPayload, setnewPasswordPayload] = useState({
    password: "",
    retypedPassword: "",
    notify: "",
  });
  const [userData, setuserData] = useState("");

  const handleInputChange = (e) => {
    setLoginPayload({ ...loginPayload, [e.target.name]: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setforgotPayload({ [e.target.name]: e.target.value });
  };

  const handleTokenChange = (e) => {
    settokenPayload({ [e.target.name]: e.target.value });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    return handleLogin(loginPayload);
  };

  const handleForgotFormSubmit = (e) => {
    e.preventDefault();
    return handleForgot(forgotPayload);
  };

  const handleTokenSubmit = (e) => {
    e.preventDefault();
    return handleToken(tokenPayload);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    return handleNewPassword(newPasswordPayload);
  };

  const handleLogin = async (payload) => {
    try {
      let d = await userLogin(payload);
      dispatch({ type: ACTIONS.LOGIN, data: d.user });
      window.location.replace("/");
    } catch (e) {
      let erroMsg = "Invalid username or password";
      if (e.message) erroMsg = e.message;
      addToast(erroMsg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleForgot = async (payload) => {
    try {
      let d = await forgotPassword(payload);
      addToast(d.msg, {
        appearance: "success",
        autoDismiss: true,
      });
      var elem = document.getElementById("recoverform");
      elem.style.transition = "all 2s ease-in-out";
      elem.style.display = "none";
      document.getElementById("verifyTokenForm").style.display = "block";
      setforgotPayload({ username: "" });
    } catch (e) {
      let erroMsg = "Something went wrong";
      if (e.message) erroMsg = e.message;
      addToast(erroMsg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleToken = async (payload) => {
    try {
      let d = await verifyToken(payload);
      const { _id, email, phone } = d;
      setuserData({ userId: _id, phone, email });
      const msg = "Token Verified Successfully";
      addToast(msg, {
        appearance: "success",
        autoDismiss: true,
      });
      var elem = document.getElementById("verifyTokenForm");
      elem.style.transition = "all 2s ease-in-out";
      elem.style.display = "none";
      document.getElementById("resetForm").style.display = "block";
      settokenPayload({ token: "" });
    } catch (e) {
      let erroMsg = "Invalid Token or Token has expired";
      if (e.message) erroMsg = e.message;
      addToast(erroMsg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleNewPassword = async (payload) => {
    try {
      const { password, retypedPassword, notify } = payload;
      if (password !== retypedPassword) throw Error("Password Mismatch");
      if (notify === "email" && !userData.email)
        throw Error("You have not set your email address yet");
      if (notify === "phone" && !userData.phone)
        throw Error("You have not set your phone yet");
      const resetPayload = { password, notify };
      let d = await resetPassword(userData.userId, resetPayload);
      if (d.success) {
        const msg = "Your Password has been changed successfully";
        addToast(msg, {
          appearance: "success",
          autoDismiss: true,
        });
      }
      var elem = document.getElementById("resetForm");
      elem.style.transition = "all 2s ease-in-out";
      elem.style.display = "none";
      document.getElementById("loginform").style.display = "block";
      setnewPasswordPayload({ password: "", retypedPassword: "", notify: "" });
    } catch (e) {
      let erroMsg = "Invalid Token or Token has expired";
      if (e.message) erroMsg = e.message;
      addToast(erroMsg, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/*Login Cards*/}
      {/*--------------------------------------------------------------------------------*/}
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center"
        style={sidebarBackground}
      >
        <div className="auth-box">
          <div id="loginform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" width="45%" height="auto" />
              </span>
              <h5 className="font-medium mb-3">Admin Login</h5>
            </div>
            <Row>
              <Col xs="12">
                <Form
                  className="mt-3"
                  id="loginform"
                  onSubmit={handleLoginFormSubmit}
                >
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>

                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-pencil"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      onChange={handleInputChange}
                      placeholder="Enter correct password"
                      required
                    />
                  </InputGroup>
                  <div className="d-flex no-block align-items-center mb-3">
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomCheckbox"
                      label="Remember Me"
                    />
                    <div className="ml-auto">
                      <a
                        href="#recoverform"
                        id="to-recover"
                        onClick={handleForgotPassClick.bind(null)}
                        className="forgot text-dark float-right"
                      >
                        <i className="fa fa-lock mr-1"></i> Forgot pwd?
                      </a>
                    </div>
                  </div>
                  <Row className="mb-3">
                    <Col xs="12">
                      <button
                        type="submit"
                        className="btn btn-block btn-success"
                      >
                        Login
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div id="recoverform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" width="45%" height="auto" />
              </span>
              <h5 className="font-medium mb-3">Recover Password</h5>
              <span>
                Enter your Email/Phone and instructions will be sent to you!
              </span>
            </div>
            <Row className="mt-3">
              <Col xs="12">
                <Form onSubmit={handleForgotFormSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="username"
                      bsSize="lg"
                      id="Name"
                      value={
                        forgotPayload.username ? forgotPayload.username : ""
                      }
                      placeholder="Phone/Email"
                      onChange={handleUsernameChange}
                      required
                    />
                  </FormGroup>
                  <Row className="mt-3">
                    <Col xs="12">
                      <Button color="danger" size="lg" type="submit" block>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div id="verifyTokenForm" style={{ display: "none" }}>
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" width="45%" height="auto" />
              </span>
              <h5 className="font-medium mb-3">Verify Token</h5>
              <span>Please enter the token you received below</span>
            </div>
            <Row className="mt-3">
              <Col xs="12">
                <Form onSubmit={handleTokenSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="token"
                      bsSize="lg"
                      id="token"
                      value={tokenPayload.token ? tokenPayload.token : ""}
                      placeholder="Token"
                      onChange={handleTokenChange}
                      required
                    />
                  </FormGroup>
                  <Row className="mt-3">
                    <Col xs="12">
                      <Button color="danger" size="lg" type="submit" block>
                        Verify
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div id="resetForm" style={{ display: "none" }}>
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" width="45%" height="auto" />
              </span>
              <h5 className="font-medium mb-3">Reset Password</h5>
              <span>Please enter your new password below</span>
            </div>
            <Row className="mt-3">
              <Col xs="12">
                <Form onSubmit={handleNewPasswordSubmit}>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      bsSize="lg"
                      id="password"
                      value={
                        newPasswordPayload.password ? tokenPayload.password : ""
                      }
                      placeholder="New Password"
                      onChange={(e) =>
                        setnewPasswordPayload({
                          ...newPasswordPayload,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="retypedPassword"
                      bsSize="lg"
                      id="retypedPassword"
                      value={
                        newPasswordPayload.retypedPassword
                          ? tokenPayload.retypedPassword
                          : ""
                      }
                      placeholder="Retype Password"
                      onChange={(e) =>
                        setnewPasswordPayload({
                          ...newPasswordPayload,
                          [e.target.name]: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label check>
                      <strong>Notify Me By:</strong>
                    </Label>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="notify"
                          value="email"
                          onChange={(e) =>
                            setnewPasswordPayload({
                              ...newPasswordPayload,
                              [e.target.name]: e.target.value,
                            })
                          }
                          required
                        />{" "}
                        Email
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="notify"
                          value="phone"
                          onChange={(e) =>
                            setnewPasswordPayload({
                              ...newPasswordPayload,
                              [e.target.name]: e.target.value,
                            })
                          }
                          required
                        />{" "}
                        Phone
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Row className="mt-3">
                    <Col xs="12">
                      <Button color="primary" size="lg" type="submit" block>
                        Change Password
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
