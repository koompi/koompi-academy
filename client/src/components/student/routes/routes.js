import React, { useState } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import { useRouteMatch } from "react-router";

// Component
import Tutorails from "../tutorails";
import SinglePage from "../single_page";

import { Layout, Menu, Icon, Card, Button, Input } from "antd";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

//Import Images
import moeys from "../../../assets/images/moeys.png";
import science from "../../../assets/images/icons/idea.svg";
import technology from "../../../assets/images/icons/brain.svg";
import engineer from "../../../assets/images/icons/prototype.svg";
import art from "../../../assets/images/icons/art.svg";
import math from "../../../assets/images/icons/formula.svg";
import logo from "../../../assets/images/koompi-academy.png";
import CategoryDisplay from "../category_list";

const { Content, Footer, Sider, Header } = Layout;

const StudentRoute = () => {
  const match = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <div>
        <Header style={{ background: "#fff" }}>
          <center>
            <div className="logo">
              <Link to="/student">
                <img src={logo} alt="" />
              </Link>
            </div>
          </center>
          {/* <div className="backNext">
            <span className="backNextBtn">
              <FiChevronLeft />
            </span>
            <span className="backNextBtn">
              <FiChevronRight />
            </span>
          </div> */}
          <div className="searchBtn">
            <Input
              prefix={<FiSearch />}
              size="large"
              placeholder="Search in koompi academy..."
            />
          </div>

          <Menu
            mode="horizontal"
            className="menu-btn"
            style={{
              lineHeight: "64px",
              backgroundColor: "#fff",
              float: "right"
            }}
          >
            <Link to="/login">
              <Button className="btnLogin">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="btnSignup">Sign up</Button>
            </Link>
          </Menu>
        </Header>
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <div
          style={{ backgroundColor: "rgb(239, 241, 242)" }}
          className="has-sider"
        >
          <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
          >
            <Menu
              mode="inline"
              style={{ backgroundColor: "rgb(239, 241, 242)" }}
            >
              <Menu.Item key="/student/courses/moeys-cambodia">
                <NavLink
                  to="/student/courses/moeys-cambodia"
                  activeClassName="academy-active"
                >
                  <img alt={moeys} src={moeys} height="40px" />
                  <span className="cateTitle">Moeys Cambodia</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/student/courses/science">
                <NavLink
                  to="/student/courses/science"
                  activeClassName="academy-active"
                >
                  <img alt={science} src={science} height="32px" />
                  <span className="cateTitle">Science</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/student/courses/technology">
                <NavLink
                  to="/student/courses/technology"
                  activeClassName="academy-active"
                >
                  <img alt={technology} src={technology} height="32px" />
                  <span className="cateTitle">Technology</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/student/courses/engineer">
                <NavLink
                  to="/student/courses/engineering"
                  activeClassName="academy-active"
                >
                  <img alt={engineer} src={engineer} height="32px" />
                  <span className="cateTitle">Engineering</span>
                </NavLink>
              </Menu.Item>

              <Menu.Item key="/student/courses/art">
                <NavLink
                  to="/student/courses/art"
                  activeClassName="academy-active"
                >
                  <img alt={art} src={art} height="32px" />
                  <span className="cateTitle">Art</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/student/courses/mathermatic">
                <NavLink
                  to="/student/courses/mathermatic"
                  activeClassName="academy-active"
                >
                  <img alt={math} src={math} height="32px" />
                  <span className="cateTitle">Mathermatic</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            {/* ===== Route Management */}
            <Switch>
              <Route
                exact={true}
                path={`/student/course/:id`}
                component={SinglePage}
              />
              <Route
                exact={true}
                path={`/student/course/:id/:point_id`}
                component={SinglePage}
              />
              <Route
                exact={true}
                path={`/student/courses/:category`}
                component={CategoryDisplay}
              />
              <Route exact={true} path={`/student`} component={Tutorails} />
              <Route exact={true} path="/" component={Tutorails} />
            </Switch>
            {/* ===== Ending Route Management */}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Made with <Icon type="heart" theme="filled" /> KOOMPI TEAM.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudentRoute;
