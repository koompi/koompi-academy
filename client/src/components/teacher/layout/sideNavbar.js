import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Menu, Icon, Popover, Tooltip, Avatar, Meta } from "antd";
import koompi_logo from "../../../assets/images/koompi-logo.svg";
import search_icon from "../../../assets/images/icons/search.svg";
import discussion from "../../../assets/images/icons/information.svg";
import upload_video_icon from "../../../assets/images/icons/video-upload-button.svg";
import user_avatar from "../../../assets/images/avatar.jpg";

// ========= User Info =========
import { UserContext } from "../../../Layout";
import { GET_USER } from "../../../queries/query";
import { useQuery } from "@apollo/react-hooks";

const { Sider } = Layout;

const user_content = (
  <div>
    <p>
      <Link to="/teacher/settings">Profile</Link>
    </p>
    <a href="#/logout">Logout</a>
  </div>
);

function SideNavbar() {
  // ========== Use UserContext ============
  const context = useContext(UserContext);

  /**
   * ================== GET USER ==================
   */
  const DisplayUserData = () => {
    const { error, loading, data } = useQuery(GET_USER, {
      variables: { user_id: context.user.id }
    });
    if (loading) return "loading...";
    if (error) console.log(error);
    const { fullname, avatar } = data.user;
    return (
      <Popover
        placement="rightBottom"
        content={user_content}
        title={fullname}
        trigger="hover"
      >
        <div className="teacherAvatarNavbar">
          <img alt={fullname} src={`https://learnbackend.koompi.com/uploads/${avatar}`} />
        </div>
      </Popover>
    );
  };

  return (
    <div>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: "50px"
        }}
      >
        <Menu theme="dark" mode="inline">
          <div className="steam_logo">
            <span className="nav-text">KOOMPI STEAM</span>
          </div>
        </Menu>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" className="removePaddingMenu">
            <NavLink
              to="/teacher/dashboard"
              activeClassName="ant-menu-item-selected"
            >
              <div className="activeClass">
                <Icon type="line-chart" />
                <span className="nav-text">Dashboard</span>
              </div>
            </NavLink>
          </Menu.Item>
          {/* ============= Create Course ============ */}
          <Menu.Item key="2" className="removePaddingMenu">
            <NavLink
              activeClassName="ant-menu-item-selected"
              to="/teacher/course/new"
            >
              <div className="activeClass">
                <Icon type="cloud-upload" />
                <span className="nav-text">Create Course</span>
              </div>
            </NavLink>
          </Menu.Item>
          {/* ============= Teacher Courses ============ */}
          <Menu.Item key="3" className="removePaddingMenu">
            <NavLink
              activeClassName="ant-menu-item-selected"
              to="/teacher/tutorails"
            >
              <div className="activeClass">
                <Icon type="upload" />
                <span className="nav-text">Your Courses</span>
              </div>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* ============== Left Navbar ============= */}
      <div className="left_navabar_postion">
        <div className="left_navbar">
          <Link to="/teacher/dashboard">
            <img
              src={koompi_logo}
              alt="koompi_steam_logo"
              className="koompi_steam_logo"
            />
          </Link>
          <ul style={{ padding: "0px", marginTop: "30px" }}>
            <li>
              <Tooltip
                arrowPointAtCenter
                placement="rightBottom"
                title="Search"
              >
                <img
                  src={search_icon}
                  alt="seach icon"
                  className="search_icons"
                />
              </Tooltip>
            </li>
            <li>
              <Link to="/teacher/upload/video">
                <Tooltip
                  arrowPointAtCenter
                  placement="rightBottom"
                  title="Upload the video"
                  style={{ background: "#fff" }}
                >
                  <img
                    src={upload_video_icon}
                    alt="seach icon"
                    className="search_icons"
                  />
                </Tooltip>
              </Link>
            </li>
          </ul>

          <div className="left_navbar_bottom">
            <ul style={{ padding: "0px", marginTop: "30px" }}>
              <li>
                <img
                  src={discussion}
                  alt="discussion"
                  className="discussion_icon"
                />
              </li>
              <br />
              <li>{DisplayUserData()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
