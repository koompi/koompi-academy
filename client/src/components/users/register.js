import React, { Fragment, useState } from "react";
import { Form, Icon, Input, Button, Row, Col, Progress, message } from "antd";
import Swal from "sweetalert2";
// Import Image
import logo from "../../assets/images/steam-logo.svg";
import image_animation from "./../../assets/images/koompi-steam.png";
import three_dots from "../../assets/images/three-dots.svg";

import { useMutation } from "@apollo/react-hooks";

// import { GET_USERS } from "../../queries/query";
import { CREATE_USER } from "../../queries/mutation";
import zxcvbn from "zxcvbn";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

function Register(props) {
  const [loading] = useState(false);
  const [myPassword, setPassword] = useState(0);
  const [passwordScore, setPasswordScore] = useState(0);

  const [createUser] = useMutation(CREATE_USER);

  const handleChange = e => {
    e.preventDefault();
    const password = e.target.value;
    setPassword(password);
    const evaluation = zxcvbn(password);
    const { score } = evaluation;
    if (score === 0) {
      setPasswordScore(10);
    } else if (score === 1) {
      setPasswordScore(25);
    } else if (score === 2) {
      setPasswordScore(50);
    } else if (score === 3) {
      setPasswordScore(75);
    } else if (score === 4) {
      setPasswordScore(100);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // if ({ error }) {
    //   console.log({ "message: ": error });
    // }
    if (passwordScore < 75) {
      message.error("Your password must be passed 75% of security score.");
    } else {
      props.form.validateFields(async (err, values) => {
        const { fullname, email } = values;
        await createUser({
          variables: { fullname, email, password: myPassword }
        })
          .then(async () => {
            await message.success("Register Successfully.");
            await window.location.replace("#/login");
          })
          .catch(error => {
            if (error) {
              let err = JSON.parse(JSON.stringify(error));
              message.error(err.graphQLErrors);
            }
          });
      });
    }
  }

  // =================== End Password and Comfirm Password Validation =========================

  // ====================== Get data from Input by using props =================
  const { getFieldDecorator } = props.form;

  return (
    <Fragment>
      {loading
        ? () => {
            return Toast.fire({
              type: "error",
              title: "Loading..."
            });
          }
        : ""}
      <img src={logo} className="koompi-steam" alt="" />
      <div className="loginBackground">
        <img src={image_animation} className="koompi-steam-image" alt="" />
        <div className="loginContainer">
          <div className="background_image">
            <h2 className="position_register">Register</h2>
          </div>
          <Form className="login-form" onSubmit={handleSubmit}>
            {/* ============================ Full Name ===================== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("fullname", {
                rules: [
                  { required: true, message: "Please input your fullname!" }
                ]
              })(<Input placeholder="Full Name" size="large" />)}
            </Form.Item>

            {/* ============================ Email ===================== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid email!"
                  },
                  {
                    required: true,
                    message: "Please input your email!"
                  }
                ]
              })(<Input placeholder="Email" size="large" />)}
            </Form.Item>

            {/* ============================ Password ===================== */}
            <Form.Item>
              <React.Fragment>
                <Input.Password
                  type="password"
                  placeholder="Password"
                  size="large"
                  onChange={handleChange}
                />
              </React.Fragment>
            </Form.Item>
            <Progress
              className="postgressMarginTop"
              percent={passwordScore}
              size="small"
            />

            {/* ============================ Button Section ===================== */}
            <Form.Item>
              <Row gutter={8}>
                {/* <Col span={12}>
                  <Button icon="google" className="login-form-button">
                    Google
                  </Button>
                </Col> */}
                <Col span={12}>
                  <Button
                    type={loading ? "danger" : "primary"}
                    htmlType="submit"
                    className="login-form-button"
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <img
                        src={three_dots}
                        alt="koompi-steam-loading"
                        height="10"
                      />
                    ) : (
                      "Register"
                    )}
                  </Button>
                </Col>
              </Row>
              Already have account? <a href="#/login">Login here</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

export default Form.create()(Register);
