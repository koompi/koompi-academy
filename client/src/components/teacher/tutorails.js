import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Rate,
  Spin,
  Button,
  Modal,
  message
} from "antd";
import { UserContext } from "../../Layout";
import { TutorailsLoading } from "../layout/loading";

import { GET_COURSES_BY_USER } from "../../queries/query";
import { DELETE_COURSE } from "../../queries/mutation";
import playIcon from "../../assets/images/play.svg";

const { Meta } = Card;
const { confirm } = Modal;
const { Content } = Layout;

function Tutorails() {
  // ========== Use UserContext ============
  const context = useContext(UserContext);
  const [deleteCourse] = useMutation(DELETE_COURSE);

  const displayLoading = () => {
    let loading = [];
    for (let index = 0; index < 12; index++) {
      loading.push(
        <div className="column blur" key={index}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={4}
            className="course-box-shadow"
          >
            <div
              style={{
                background: "#fff",
                marginBottom: "15px",
                height: "280px"
              }}
            >
              {TutorailsLoading()}
            </div>
          </Col>
        </div>
      );
    }
    return loading;
  };

  /**
   * ================== GET COURSE ==================
   */
  const DisplayCourse = () => {
    const { error, loading, data, refetch } = useQuery(GET_COURSES_BY_USER, {
      variables: { owner_id: context.user.id }
    });

    const showDeleteConfirm = async course_id => {
      await confirm({
        title: "Are you sure delete this task?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await deleteCourse({ variables: { course_id: `${course_id}` } });
          await message.success("This post has been Deleted");
          await refetch();
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    };

    if (loading) return <center>Loading ...</center>;
    if (error) console.log(error);

    if (data.courses_by_owner.length === 0) {
      return "no data";
    }

    return data.courses_by_owner.map(course => {
      return (
        <div>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            className="course-box-shadow"
          >
            <Card
              className="cardBoxShadow"
              cover={
                <div
                  className="tutorailsImage"
                  style={{
                    backgroundImage: `linear-gradient(rgba(4, 4, 4, 0.18), rgba(0, 0, 0, 0.23)),url(${course.feature_image})`
                  }}
                >
                  <img src={playIcon} alt="koompi play" />
                </div>
              }
            >
              <Row gutter={16}>
                <Col span={4}>
                  <img
                    className="userAvatar"
                    alt={course.user.fullname}
                    src={`https://learnbackend.koompi.com/uploads/images/${course.user.avatar}`}
                  />
                </Col>
                <Col span={20}>
                  <p className="author_name">{course.user.fullname}</p>
                  <p className="views">1000 views - 1 hour ago</p>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "15px" }}>
                <Col span={8}>
                  <Link to={`/teacher/course/add/section/${course.id}`}>
                    <Button type="primary" className="teacherBtn">
                      Secion
                    </Button>
                  </Link>
                </Col>
                <Col span={8}>
                  <Link to={`/teacher/course/add/section/${course.id}`}>
                    <Button type="primary" className=" teacherBtn editBtn">
                      Edit
                    </Button>
                  </Link>
                </Col>
                <Col span={8}>
                  <div>
                    <Button
                      type="danger"
                      className="teacherBtn"
                      onClick={() => {
                        showDeleteConfirm(course.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </div>
      );
    });
  };
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <Row gutter={16}>{DisplayCourse()}</Row>
      <br />
      {/* <center>
        <Pagination defaultCurrent={15} total={500} className="remove_border" />
      </center> */}
    </Content>
  );
}

export default Tutorails;
