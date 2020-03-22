import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Icon, Row, Col, Upload, message } from "antd";

import { CREATE_COURSE } from "../../queries/mutation";
const { Dragger } = Upload;

function UploadVideo(props) {
  console.log(props);

  /**
   * ================== State Section ==================
   */
  const [, setVideo] = useState("");

  /**
   * ================== Handle Submit ================
   */
  const [createCourse, { error }] = useMutation(CREATE_COURSE);
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      await createCourse({ variables: values });
      await message.success("course created successfully");
    });
    if (error) {
      console.log({ "message: ": error.errors });
    }
  };

  /**
   * ================== Videos Props ================
   */
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
        setVideo(info.file.name);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: "video/*",
    className: "video_upload"
  };

  return (
    <div>
      <React.Fragment>
        <div className="containerNewPost">
          <Row gutter={16}>
            <Col span={24}>
              <Form className="login-form" onSubmit={handleSubmit}>
                <Row gutter={16}>
                  <Col>
                    {/* ========= Video Upload Section ======= */}
                    <Form.Item>
                      <Dragger {...videoProps}>
                        <p className="ant-upload-drag-icon">
                          <Icon type="video-camera" />
                        </p>
                        <p className="ant-upload-text">
                          Select files to upload
                        </p>
                        <p className="ant-upload-hint">
                          or drag and drop video files
                        </p>
                      </Dragger>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    </div>
  );
}

export default Form.create()(UploadVideo);
