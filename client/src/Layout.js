import React, { createContext, Component } from "react";
import jwt from "jsonwebtoken";

export const UserContext = createContext();

class LayoutContextProvider extends Component {
  state = {
    user: {
      email: null,
      id: null,
      iat: null,
      name: null
    }
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    let user = jwt.decode(token);
    this.setState({ user });
  }
  render() {
    return (
      <UserContext.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default LayoutContextProvider;
