import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";
import jwt from "jsonwebtoken";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  let token = localStorage.getItem("token");
  let user = jwt.decode(token);
  return (
    <Route
      {...rest}
      render={props =>
        isLogin() && restricted ? (
          user.role === "student" ? (
            <Redirect to="/student/" />
          ) : (
            <Redirect to="/teacher/dashboard" />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
