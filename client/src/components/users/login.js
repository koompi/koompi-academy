import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
import axios from "axios";
// Import Image
import logo from "../../assets/images/steam-logo.svg";
import image_animation from "../../assets/images/koompi-steam.png";
import three_dots from "../../assets/images/three-dots.svg";
import jwt from "jsonwebtoken";
function Login(props) {
  const [loading, setLoading] = useState(false);
  const [size] = useState("large");

  const { getFieldDecorator } = props.form;

  async function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields(async (error, values) => {
      if (error) {
        console.log(error);
      } else {
        await axios
          .post(
            `https://learnbackend.koompi.com/login`,
            { ...values },
            setLoading(true)
          )
          .then(async res => {
            await setLoading(true);
            await message.success("Login successfully.");
            await window.localStorage.setItem("token", res.data.token);
          })
          .then(async () => {
            let token = localStorage.getItem("token");
            let user = jwt.decode(token);
            if (user.role === "student")
              await window.location.reload("/student/");
            if (user.role === "teacher")
              await window.location.reload("#/teacher/dashboard");
          })
          .catch(async error => {
            setTimeout(function() {
              setLoading(false);
            }, 1000);
            if (error.response) {
              await message.error("Invalid email or password ");
            }
          });
      }
    });
  }

  return (
    <Fragment>
      {loading
        ? () => {
            return message.error("loading...");
          }
        : ""}
      <img src={logo} className="koompi-steam" alt="" />
      <div className="loginBackground">
        <img src={image_animation} className="koompi-steam-image" alt="" />
        <div className="loginContainer">
          <div className="background_image">
            <h2 className="position_login">Sign In</h2>
          </div>
          <Form onSubmit={handleSubmit} className="login-form">
            {/* =================== Email ================= */}
            <Form.Item hasFeedback>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid email"
                  },
                  {
                    required: true,
                    message: "Please input your email"
                  }
                ]
              })(<Input placeholder="Email" size={size} />)}
            </Form.Item>

            {/* =================== Password ================= */}
            <Form.Item hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password"
                  }
                ]
              })(
                <Input.Password
                  type="password"
                  placeholder="Password"
                  size={size}
                />
              )}
            </Form.Item>

            {/* =================== Remember and Forgot password ================= */}
            <Form.Item className="margin-botton-8">
              <Checkbox>Remember me</Checkbox>
              <Link className="login-form-forgot" to="/forgot-password">
                Forgot password
              </Link>
            </Form.Item>

            {/* =================== Button Submit ================= */}
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
                      "Login"
                    )}
                  </Button>
                </Col>
              </Row>
              Don't have an account? <a href="#/register">Register Now</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

export default Form.create()(Login);
