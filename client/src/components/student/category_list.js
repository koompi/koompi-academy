import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link, useParams } from "react-router-dom";
import { Layout, Row, Col, Card, Rate } from "antd";
import { GET_COURSES_BY_CATEGORY } from "../../queries/query";
import playIcon from "../../assets/images/play.svg";
import moment from "moment";

const { Meta } = Card;
const { Content } = Layout;

function CategoryDisplay() {
  let { category } = useParams();
  /**
   * ================== GET COURSE ==================
   */
  const DisplayCourse = () => {
    const { error, loading, data } = useQuery(GET_COURSES_BY_CATEGORY, {
      variables: { query: category }
    });
    if (loading)
      return (
        <center>
          <div>Loading ...</div>
        </center>
      );
    if (error) console.log(error);

    return data.courses_by_search.map(course => {
      return (
        <div key={course.id}>
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            xl={6}
            className="course-box-shadow"
          >
            <Link to={`/student/course/${course.id}`}>
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
                <p className="courseTitle">
                  {course.title.length > 30
                    ? course.title.substring(0, 30) + "..."
                    : course.title}
                </p>
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
                    <p className="views">
                      1000 views -{" "}
                      {moment(parseInt(course.created_at)).fromNow()}
                    </p>
                  </Col>
                </Row>
                {/* <Meta
                  avatar={
                    <img
                      alt={course.user.fullname}
                      src={`https://learnbackend.koompi.com/uploads/images/${course.user.avatar}`}
                    />
                  }
                  title={
                    course.title.length > 40
                      ? course.title.substring(0, 40) + "..."
                      : course.title
                  }
                  start={
                    <Rate
                      allowHalf
                      defaultValue={2.5}
                      style={{ fontSize: "15px" }}
                    />
                  }
                /> */}
              </Card>
            </Link>
          </Col>
        </div>
      );
    });
  };

  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <Row gutter={16}>
        <h2 style={{ padding: "10px 0px 10px 0px" }}>
          {category === "moeys-cambodia"
            ? "MOEYS CAMBODIA"
            : category.charAt(0).toUpperCase() + category.substring(1)}{" "}
          Courses
        </h2>
        <DisplayCourse />
      </Row>
      <br />
      {/* <center>
        <Pagination defaultCurrent={15} total={500} className="remove_border" />
      </center> */}
    </Content>
  );
}

export default CategoryDisplay;
