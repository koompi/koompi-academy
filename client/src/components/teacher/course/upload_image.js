import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Form, Icon, Row, Col, Upload, message } from "antd";

import { CREATE_COURSE } from "../../../queries/mutation";
const { Dragger } = Upload;

function UploadImage(props) {
  console.log(props);

  /**
   * ================== State Section ==================
   */
  const [, setImage] = useState("");

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
  const imageProps = {
    name: "file",
    multiple: false,
    action: "https://learnbackend.koompi.com/image-upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file);
      }
      if (status === "done") {
        setImage(info.file.name);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: "image/*",
    className: "video_upload"
  };

  return (
    <div>
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col>
              {/* ========= Video Upload Section ======= */}
              <Form.Item>
                <Dragger {...imageProps}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="file-image" />
                  </p>
                  <p className="ant-upload-text">Select image to upload</p>
                  <p className="ant-upload-hint">
                    or drag and drop image files
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    </div>
  );
}

export default Form.create()(UploadImage);
