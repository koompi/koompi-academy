import React, { useState } from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";
/**
 * ================== All Routes ==================
 */
import SideNavbar from "../layout/sideNavbar";
import Tutorails from "../tutorails";
import Index from "../index";
import NewCourse from "../new_course";
import UploadVideo from "../upload_video";
import FAQ from "../faq";
import UserSetting from "../settings";
import Dashboard from "../dashboard";

import { Layout, Menu, Icon, Card, Button, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { TeacherRoute } from "../../PrivateRoute";

//Import Images
import addVideo from "../../../assets/images/icons/add-video.png";
import dashboard from "../../../assets/images/icons/dashboard.png";
import courses from "../../../assets/images/icons/course.png";
import file from "../../../assets/images/icons/file.png";
import logo from "../../../assets/images/koompi-academy.png";
import UnderConstruction from "../under-construction";
import edit_section_form from "../course/edit_section_form";

const { Content, Footer, Sider, Header } = Layout;

const StudentRoute = () => {
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
              <Link to="/teacher/dashboard">
                <img src={logo} alt="" />
              </Link>
            </div>
          </center>
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
            {/* <Link to="/login">
              <Button className="btnLogin">Login</Button>
            </Link> */}
            <Link to="/logout">
              <Button className="btnSignup">Logout</Button>
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
              <Menu.Item key="/teacher/dashboard">
                <NavLink
                  to="/teacher/dashboard"
                  activeClassName="academy-active"
                >
                  <img alt={dashboard} src={dashboard} height="32px" />
                  <span className="cateTitle">Dashboard</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/teacher/courses">
                <NavLink to="/teacher/courses" activeClassName="academy-active">
                  <img alt={courses} src={courses} height="32px" />
                  <span className="cateTitle">My Courses</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/teacher/course/new">
                <NavLink
                  to="/teacher/course/new"
                  activeClassName="academy-active"
                >
                  <img alt={addVideo} src={addVideo} height="32px" />
                  <span className="cateTitle">New Course</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/teacher/under-construction">
                <NavLink
                  to="/teacher/under-construction"
                  activeClassName="academy-active"
                >
                  <img alt={file} src={file} height="32px" />
                  <span className="cateTitle">New Docs</span>
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
                path={`/teacher/dashboard`}
                component={Dashboard}
              />
              <Route
                exact={true}
                path={`/teacher/courses`}
                component={Tutorails}
              />
              <Route
                exact={true}
                path={`/teacher/course/new`}
                component={NewCourse}
              />
              <Route
                exact={true}
                path={`/teacher/course/add/section/:id`}
                component={Index}
              />
              <Route
                exact={true}
                path={`/teacher/course/edit/section/:id`}
                component={edit_section_form}
              />
              <Route
                exact={true}
                path={`/teacher/course/add/point/:section_id`}
                component={Index}
              />
              <Route
                exact={true}
                path={`/teacher/course/edit/point/:id`}
                component={() => "Hello World"}
              />
              <Route exact={true} path={`/teacher/faq`} component={FAQ} />
              <Route
                exact={true}
                path={`/teacher/settings`}
                component={UserSetting}
              />
              <Route
                exact={true}
                path={`/teacher/under-construction`}
                component={UnderConstruction}
              />
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
