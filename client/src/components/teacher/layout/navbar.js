import React, { Component } from "react";
import { NavLink, Link, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";

import { UserContext } from "../../Layout";
import { GET_USER } from "../../queries/query";
import { Query } from "react-apollo";

import { Layout, Icon, Input, message, Button, Popover } from "antd";

const { Header } = Layout;
const { Search } = Input;

const content = (
  <div>
    <p>
      <Link to="/user/settings">Profile</Link>
    </p>
    <a href="#/logout">Logout</a>
  </div>
);

const upload = (
  <div>
    <p>
      <NavLink to="/upload/video" activeClassName="active">
        Upload video
      </NavLink>
    </p>
    <p>
      <NavLink to="/upload" activeClassName="active">
        Go live
      </NavLink>
    </p>
  </div>
);

function handleMenuClick(e) {
  message.info("Click on menu item.");
  console.log("click", e);
}

class Navbar extends Component {
  state = {
    user: {
      fullname: "",
      email: "",
      id: "",
      iat: ""
    }
  };

  // ==================== decode token get user info ==================
  componentDidMount() {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    this.setState({ user: { ...user } });
  }

  render() {
    // ============================== Check auth ======================
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    if (user === null) {
      return <Redirect to="/login" />;
    }
    return (
      <Query query={GET_USER} variables={{ user_id: this.state.user.id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Header
                className="searchDiv"
                style={{ background: "#fff", padding: 0 }}
              />
            );
          if (error) console.log(error);
          const { fullname, avatar } = data.user;
          return (
            <Header
              className="searchDiv"
              style={{ background: "#fff", padding: 0 }}
            >
              <div style={{ float: "right" }}>
                <Popover
                  placement="bottomRight"
                  content={content}
                  title={fullname}
                  trigger="hover"
                >
                  <Button className="userButton">
                    <img
                      src={
                        avatar === null
                          ? "https://www.kbl.co.uk/wp-content/uploads/2017/11/Default-Profile-Male.jpg"
                          : avatar
                      }
                      alt="avatar"
                      className="avatarUser"
                    />
                  </Button>
                </Popover>
              </div>

              <div style={{ float: "right" }}>
                <Link to="/faq">
                  <Icon type="question-circle" className="navbar_icon" />
                </Link>
              </div>

              <div style={{ float: "right" }}>
                <Popover
                  placement="bottomRight"
                  content={upload}
                  title="KOOMPI STEAM"
                  trigger="hover"
                >
                  <Button className="userButton">
                    <Icon type="cloud-upload" className="navbar_icon" />
                  </Button>
                </Popover>
              </div>

              <div style={{ float: "right" }}>
                <Link to="/course/new">
                  <Button type="primary" className="create_course_btn">
                    <Icon type="plus" /> Create Course
                  </Button>
                </Link>
              </div>

              <div className="navbarPadding">
                <div className="navbar_search">
                  {/* <Input size="large" placeholder="search..." className="searchInput" /> */}
                  <Search
                    placeholder="Search for anything"
                    onSearch={value => console.log(value)}
                    size="large"
                  />
                </div>
              </div>
            </Header>
          );
        }}
      </Query>
    );
  }
}

export default Navbar;
