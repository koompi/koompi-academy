import jwt from "jsonwebtoken";

export const isLogin = () => {
  let token = localStorage.getItem("token");
  let user = jwt.decode(token);

  if (!user) {
    return false;
  }
  return true;
};
