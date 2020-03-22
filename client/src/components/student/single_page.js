import React, { useState } from "react";
import {
  Tabs,
  Icon,
  Menu,
  Modal,
  Form,
  Badge,
  Comment,
  Avatar,
  message,
  Layout,
  Row,
  Col
} from "antd";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_SECTION, GET_COURSE_AND_QUESTIONS } from "../../queries/query";

/**
 * ================== Ant Design ==================
 */
import "antd/dist/antd.css";
import "../../assets/css/App.css";
import Question from "./question";
import Answer from "./answer";
import NotFound from "./notfound";
import { CREATE_QUESTION } from "../../queries/mutation";
import { CREATE_ANSWER } from "../../queries/mutation";
import { DisplaySectionLoading, CourseDetailLoading } from "../layout/loading";
import parser from "html-react-parser";

const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Sider } = Layout;
const ReactMarkdown = require("react-markdown");

function SinglePage(props) {
  const [tabs, setTabs] = useState("1");
  const [visibleQuestion, setVisibleQuestion] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [video, setVideo] = useState(null);
  const [defaultVideo, setDefaultVideo] = useState(null);
  const [questionId, setQuestionId] = useState("");
  const [createQuestion] = useMutation(CREATE_QUESTION);
  const [createAnswer] = useMutation(CREATE_ANSWER);
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const { id } = useParams();
  const tabsChange = key => {
    setTabs(key);
  };

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  /** Global varible QUERY data from QUESTION and ANSWER */
  const {
    error: error_course_question,
    loading: loading_course_question,
    data: get_course_question,
    refetch
  } = useQuery(GET_COURSE_AND_QUESTIONS, {
    variables: {
      course_id: id,
      id: id
    }
  });

  const {
    error: error_section,
    loading: loading_section,
    data: data_section
  } = useQuery(GET_SECTION, {
    variables: { course_id: id }
  });

  /** Handle All popup of the Single Page */
  const QuestionModal = () => {
    setVisibleQuestion(true);
  };

  const answerModal = question_id => {
    setVisibleAnswer(true);
    setQuestionId(question_id);
  };

  const handleOk = () => {
    // e.preventDefault();
    setVisibleQuestion(false);
    setVisibleAnswer(false);
  };

  const handleCancel = () => {
    setVisibleQuestion(false);
    setVisibleAnswer(false);
  };

  /**
   * ================== Handle Question when it Submit and pass it <Question/>  ==================
   */
  const handleQuestionSubmit = async ({ question, user_id }) => {
    let today = new Date();
    props.form.validateFields(async () => {
      await createQuestion({
        variables: { question, user_id, course_id: id, created_at: today }
      });
      await refetch();
      setVisibleQuestion(false);
      message.success("Your Question has beed add successfully");
      props.form.resetFields();
    });
  };

  /**
   * ================== Handle the Answer Submit ==================
   */
  const handleAnswerSubmit = ({ user_id, answer }) => {
    props.form.validateFields(async () => {
      await createAnswer({
        variables: {
          user_id,
          question_id: questionId,
          answer,
          created_at: new Date()
        }
      });
      await refetch();
      setVisibleAnswer(false);
      message.success("Thank you for your answer.");
      props.form.resetFields();
    });
  };

  /** Display Section and Point */
  const DisplaySection = () => {
    if (loading_section) {
      return (
        <div style={{ padding: "0px 10px" }}>{DisplaySectionLoading()}</div>
      );
    } else if (error_section) console.log(error_section);
    else if (!data_section.sections || data_section === undefined) {
      setNotfound(true);
      return (
        <div className="not_found">
          <NotFound />
        </div>
      );
    } else {
      return (
        <Menu openKeys={openKeys} onOpenChange={onOpenChange} mode="inline">
          {data_section.sections
            .sort((a, b) => a.no - b.no)
            .map(item => {
              if (item) {
                if (item.points.length > 0) {
                  setDefaultVideo(item.points[0].video_link);
                }
                return (
                  <SubMenu
                    title={
                      <span>
                        <span>{item.no + ": " + item.title}</span>
                      </span>
                    }
                    key={item.id}
                  >
                    {item.points.length === 0 ? (
                      <Menu.Item>No point</Menu.Item>
                    ) : (
                      item.points
                        .sort((a, b) => a.no - b.no)
                        .map(point => {
                          return (
                            <Menu.Item key={point.id}>
                              <Link
                                to={`/student/course/${id}/${point.id}`}
                                onClick={e => setVideo(point.video_link)}
                              >
                                <div>{point.no + ". " + point.title}</div>
                              </Link>
                            </Menu.Item>
                          );
                        })
                    )}
                  </SubMenu>
                );
              }
            })}
        </Menu>
      );
    }
  };

  /**
   * ================== Display the Course Detail  ==================
   * 1. Course Detail
   * 2. Question
   * 3. Answer
   * 4. User
   */
  const DisplayCourseDetail = () => {
    if (error_course_question) console.log(error_course_question);
    if (loading_course_question)
      return (
        <div className="section_point_container_loading">
          <div className="video_height" style={{ padding: "15px" }}>
            {CourseDetailLoading()}
          </div>
        </div>
      );

    if (!get_course_question.course || get_course_question === undefined) {
      setNotfound(true);
      return (
        <div className="not_found">
          <NotFound />
        </div>
      );
    } else {
      setNotfound(false);
      const { title, description } = get_course_question.course;
      const { questions } = get_course_question;
      return (
        <React.Fragment>
          {/* <div
              className="video_height"
              style={{ backgroundImage: `url(${data.course.feature_image})` }}
            ></div> */}

          <Tabs
            defaultActiveKey={tabs}
            style={{ backgroundColor: "#fff", padding: "15px" }}
            onChange={tabsChange}
            tabBarExtraContent={
              <div className="btn_ask_question" onClick={QuestionModal}>
                Ask a Question?
              </div>
            }
          >
            <TabPane tab={<span>Overview</span>} key={"1"}>
              <div className="description">
                <h3>Couse Title: {title || ""}</h3>
                {parser(description)}
              </div>
            </TabPane>
            <TabPane
              tab={
                <Badge
                  count={questions.length}
                  style={{
                    top: 0,
                    minWidth: "18px",
                    height: "18px",
                    lineHeight: "18px",
                    right: "-5px"
                  }}
                >
                  <span>
                    Question <Icon type="question" />
                  </span>
                </Badge>
              }
              key={"2"}
            >
              {questions.map(data => {
                const { fullname, avatar } = data.user;
                const { id, question, answers, created_at } = data;
                return (
                  <React.Fragment key={id}>
                    <Comment
                      actions={[
                        <span key="comment-nested-reply-to">
                          <b>{answers.length + " "}</b> Answer
                          {answers.length > 1 ? "s" : " "}
                        </span>,
                        <span
                          key="comment-basic-reply-to"
                          onClick={e => {
                            e.preventDefault();
                            answerModal(id);
                          }}
                        >
                          Reply to
                        </span>
                      ]}
                      author={<div>{fullname}</div>}
                      avatar={
                        <Avatar
                          src={`https://learnbackend.koompi.com/uploads/images/${avatar}`}
                          alt={fullname}
                        />
                      }
                      datetime={
                        <span>{moment(parseInt(created_at)).fromNow()}</span>
                      }
                      content={<p>{question}</p>}
                    >
                      {data.answers
                        .sort((a, b) => b.created_at - a.created_at)
                        .map(data => {
                          const { fullname, avatar } = data.user;
                          const { created_at } = data;
                          return (
                            <Comment
                              key={data.id}
                              author={<div>{fullname}</div>}
                              avatar={<Avatar src={avatar} alt={fullname} />}
                              datetime={
                                <span>
                                  {moment(parseInt(created_at)).fromNow()}
                                </span>
                              }
                              content={<p>{data.answer}</p>}
                            ></Comment>
                          );
                        })}
                    </Comment>
                  </React.Fragment>
                );
              })}
            </TabPane>
            {/* <TabPane tab={<span>Quizzes</span>} key={"1"}>
              <div className="description">
                <h3>Couse Title: {title || ""}</h3>
                {parser(description)}
              </div>
            </TabPane> */}
          </Tabs>
        </React.Fragment>
      );
    }
  };

  if (data_section === undefined) {
    console.log("No data");
  } else {
    console.log(data_section.sections[0].points[0].video_link);
  }

  return (
    <div className="section_point_width">
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={18} xl={17}>
          <div>
            {!data_section || data_section !== undefined ? (
              <ReactPlayer
                // Disable download button
                config={{
                  file: { attributes: { controlsList: "nodownload" } }
                }}
                url={!video ? defaultVideo : video}
                playing
                pip
                controls
                light
                width="100%"
                height="28vw"
                style={{ backgroundColor: "#142634" }}
              />
            ) : (
              ""
            )}

            <DisplayCourseDetail />
          </div>
          <Modal
            // key={uuidv1()}
            title="A few reminders before you post"
            visible={visibleQuestion}
            onClick={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <React.Fragment>
              <ol>
                <li>
                  There may be other students who have already asked the same
                  question. You should do a quick search first to make sure your
                  question is unique.
                </li>
                <li>
                  The best way to get the answers you're looking for is to learn
                  how to ask good questions. Get tips on how to ask good
                  questions to get answers more quickly
                </li>
                <li>
                  If you're experiencing what appears to be a bug or something
                  that doesn't seem to be working correctly, please contact
                  support directly.
                </li>
              </ol>
              <Question question_submit={handleQuestionSubmit} />
            </React.Fragment>
          </Modal>
          <Modal
            title="Please help to answer this question"
            visible={visibleAnswer}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Answer answer_submit={handleAnswerSubmit} />
          </Modal>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={7}>
          {notfound ? "" : <h2 className="course_content">Course Content</h2>}
          <div className="new_course_upload">
            <DisplaySection />
          </div>
        </Col>
      </Row>
      {/* <div className="section_point_right_width">
        
      </div> */}
    </div>
  );
}
export default Form.create()(SinglePage);
