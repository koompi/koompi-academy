import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Card, Rate } from "antd";
import { GET_COURSES } from "../../queries/query";
import playIcon from "../../assets/images/play.svg";
import moment from "moment";

const { Meta } = Card;
const { Content } = Layout;

function Tutorails() {
  /**
   * ================== GET COURSE ==================
   */
  const DisplayCourse = () => {
    const { error, loading, data } = useQuery(GET_COURSES);
    if (loading)
      return (
        <center>
          <div>Loading ...</div>
        </center>
      );
    if (error) console.log(error);
    // console.log(data);

    return data.courses.map((course, index) => {
      return (
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={6}
          className="course-box-shadow"
          key={index}
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
                    1000 views - {moment(parseInt(course.created_at)).fromNow()}
                  </p>
                </Col>
              </Row>
            </Card>
          </Link>
        </Col>
      );
    });
  };
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <Row gutter={16} type="flex">
        <DisplayCourse />
      </Row>
      <br />
      {/* <center>
        <Pagination defaultCurrent={15} total={500} className="remove_border" />
      </center> */}
    </Content>
  );
}

export default Tutorails;
