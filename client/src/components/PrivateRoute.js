import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";
import jwt from "jsonwebtoken";

// Global varible
let token = localStorage.getItem("token");
let user = jwt.decode(token);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        isLogin() ? <Component {...props} /> : <Redirect to="/student" />
      }
    />
  );
};

const TeacherRoute = ({ component: Component, path }) => {
  return !user ? (
    <Redirect to="/student" />
  ) : (
    user.role === "teacher" && (
      <PrivateRoute
        exact={true}
        path={path}
        component={Component}
        restricted={true}
      />
    )
  );
};

const IsStudent = ({ component: Component, path }) => {
  return !user ? (
    <Redirect to="/student" />
  ) : (
    user.role === "student" && (
      <PrivateRoute exact path={path} component={Component} restricted={true} />
    )
  );
};

export { TeacherRoute, IsStudent };
