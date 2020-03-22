import React, { useState } from "react";

import PointForm from "./course/point_form";
import SectionForm from "./course/section_form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { IoIosMore } from "react-icons/io";
import {
  CREATE_SECTION,
  CREATE_POINT,
  DELETE_POINT,
  DELETE_SECTION
} from "../../queries/mutation";
import { GET_SECTION, GET_POINT_BY_ID } from "../../queries/query";
import blank_image from "../../assets/images/blank.svg";
import { useParams, useRouteMatch } from "react-router-dom";

/** Ant Design */
import {
  Tabs,
  Icon,
  Menu,
  Modal,
  Button,
  Form,
  Col,
  Upload,
  message,
  Row,
  Popover
} from "antd";
import EditPoint from "./course/edit_point";
import EditSection from "./course/edit_section_form";
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { confirm } = Modal;
const { Dragger } = Upload;

function Index(props) {
  /** Global verible Sections */
  const { id } = useParams();
  const matchSection = useRouteMatch(`/teacher/course/add/section/${id}`);
  const matchPoint = useRouteMatch("/teacher/course/add/point/:id");

  /** State Sections */
  const [tabs, setTabs] = useState(matchSection.url);
  const [visible, setVisible] = useState({
    point: false,
    section: false
  });
  const [pointId, setpointId] = useState("");
  const [setVideo] = useState("");
  const [pointData, setPointData] = useState({});
  const [sectionId, setSectionId] = useState("5e758640dbc4861ce7027f86");

  /** Mutation Sectio */
  const [createSection] = useMutation(CREATE_SECTION);
  const [createPoint] = useMutation(CREATE_POINT);
  const [deletePoint] = useMutation(DELETE_POINT);
  const [deleteSection] = useMutation(DELETE_SECTION);

  /** Videos Props */
  const videoProps = {
    name: "file",
    multiple: false,
    action: "https://learnbackend.koompi.com/image-upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setVideo(info.file.name.replace(/\s+/g, "-").toLowerCase());
        message.success(
          `${info.file.name
            .replace(/\s+/g, "-")
            .toLowerCase()} file uploaded successfully.`
        );
      } else if (status === "error") {
        message.error(
          `${info.file.name
            .replace(/\s+/g, "-")
            .toLowerCase()} file upload failed.`
        );
      }
    },
    accept: "video/*",
    className: "video_upload"
  };

  const handleOk = () => {
    setVisible({ point: false });
  };
  const handleCancel = () => {
    setVisible({ point: false });
  };

  /** Handle Edit Point */
  const GetPointData = () => {
    const { loading, error, data } = useQuery(GET_POINT_BY_ID, {
      variables: { id: pointId }
    });
    if (loading) {
      return "Loading ...";
    }
    if (error) console.log(error);
    setPointData(data.point_by_id);
    return null;
  };

  /** Handle Section Submit */
  const handleSectionSubmit = ({ course_id, no, title }) => {
    props.form.validateFields(async () => {
      await createSection({
        variables: {
          course_id,
          no,
          title
        }
      });
      await refetch();
      await message.success("The section has been added successfully.");
    });
  };

  /** Handle Point Submit */
  const handlePointSubmit = async ({ section_id, no, title, video_link }) => {
    props.form.validateFields(async () => {
      await createPoint({
        variables: {
          section_id,
          no,
          title,
          video_link
        }
      });
      await refetch();
      await message.success("The point has been added successfully.");
    });
  };

  const {
    error: section_error,
    loading: section_loading,
    data: section_data,
    refetch
  } = useQuery(GET_SECTION, {
    variables: { course_id: id }
  });

  /** Modal Section*/
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      content: (
        <Dragger {...videoProps}>
          <p className="ant-upload-drag-icon">
            <Icon type="video-camera" />
          </p>
          <p className="ant-upload-text">Select files to upload</p>
          <p className="ant-upload-hint">or drag and drop video files</p>
        </Dragger>
      )
    });
  };

  const tabsChange = key => {
    console.log(key);
    setTabs(key.toString());
  };

  const DisplaySection = () => {
    if (section_loading) return "loading...";
    if (section_error) console.log(section_data);
    if (section_data.sections === []) return "";
    else {
      const result = section_data.sections.sort(
        (a, b) => parseInt(a.no) - parseInt(b.no)
      );

      return result.map(item => (
        <div>
          <div className="sectionBack">
            <span>
              {item.no + ": " + item.title}{" "}
              <Popover
                content={
                  <div>
                    <Button
                      className="pointEdit"
                      onClick={async () => {
                        await setVisible({ section: true });
                        await setSectionId(item.id);
                        return null;
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="pointDelete"
                      onClick={async () => {
                        const res = await deleteSection({
                          variables: { id: item.id }
                        });
                        await message.success(res.data.delete_section.message);
                        refetch();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                }
                trigger="click"
              >
                <IoIosMore className="sectionPopUp" />
              </Popover>
            </span>
          </div>
          <Menu
            mode="inline"
            defaultOpenKeys={[matchSection.url]}
            onOpenChange={false}
          >
            {item.points.length === 0 ? (
              <Menu.Item>No point</Menu.Item>
            ) : (
              item.points
                .sort((a, b) => a.no - b.no)
                .map(point => (
                  <Menu.Item className="teacherUploadPoint" key={point.id}>
                    {point.no + ". "}{" "}
                    {point.title.length > 30
                      ? point.title.substring(0, 30) + "..."
                      : point.title}
                    <div className="deleteEditBtn">
                      <Popover
                        placement="top"
                        content={
                          <div>
                            <Button
                              className="pointEdit"
                              onClick={async () => {
                                await setVisible({ point: true });
                                setpointId(point.id);
                                return null;
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="pointDelete"
                              onClick={async () => {
                                const res = await deletePoint({
                                  variables: { id: point.id }
                                });
                                await refetch();
                                message.success(res.data.delete_point.message);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        }
                        trigger="click"
                      >
                        <IoIosMore />
                      </Popover>
                    </div>
                  </Menu.Item>
                ))
            )}
          </Menu>
        </div>
      ));
    }
  };

  return (
    <div className="section_point_width">
      <Row gutter={24}>
        <Col span={16}>
          <div className="section_point_container">
            {/* <Player sources={sources} /> */}
            <div className="video_height">
              {tabs === matchSection.url ? (
                <center>
                  <br />
                  <br />
                  <img src={blank_image} alt={blank_image} height="350px"></img>
                </center>
              ) : (
                <div className="button_upload_video">
                  <Form>
                    <Form.Item>
                      <Col span={12}>
                        <Button onClick={showConfirm}>
                          <Icon type="video-camera" />
                          Select exist video
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button onClick={showConfirm}>
                          <Icon type="video-camera" /> Upload new video
                        </Button>
                      </Col>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
            <Tabs
              animated
              defaultActiveKey={matchSection.url}
              style={{ backgroundColor: "#fff", padding: "15px" }}
              onChange={tabsChange}
            >
              <TabPane tab={<span>Add Section</span>} key={matchSection.url}>
                <SectionForm addSection={handleSectionSubmit} />
              </TabPane>

              <TabPane tab={<span>Add Point</span>} key={matchPoint}>
                <PointForm addPoint={handlePointSubmit} />
              </TabPane>
              {/* <TabPane tab={<span>Add Quize</span>} key="3">
            <PointForm addPoint={handlePointSubmit} />
          </TabPane> */}
            </Tabs>
          </div>
        </Col>
        <Col span={8}>
          <div className="section_point_right_width">
            <h2 className="course_content">Course Content</h2>
            {/* <div className="course_content"></div> */}
            <div className="new_course_upload">
              <div>
                <DisplaySection />
                {pointId === "" ? null : <GetPointData />}
                <EditPoint
                  no={pointData.no}
                  id={pointData.id}
                  video_link={pointData.video_link}
                  title={pointData.title}
                  visible={visible.point}
                  handleCancel={handleCancel}
                  handleOk={handleOk}
                />
                <EditSection
                  id={sectionId}
                  visible={visible.section}
                  handleCancel={handleCancel}
                  handleOk={handleOk}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Form.create()(Index);
