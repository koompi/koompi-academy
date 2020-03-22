import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CATEGORIES } from "../../queries/query";
import { CREATE_COURSE } from "../../queries/mutation";
import { UserContext } from "../../Layout";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
import {
  Icon,
  Spin,
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  InputNumber,
  message,
  Upload
} from "antd";

const { Option } = Select;
const { Dragger } = Upload;
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000
});

function NewCourse(props) {
  /**
   * ================== State Section ==================
   */
  const [section, setSection] = useState({
    id: "",
    section_number: "",
    point_number: "",
    title: "",
    type: "1"
  });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [createCourse] = useMutation(CREATE_COURSE);
  const [selectedTab, setSelectedTab] = useState("write");

  // ========== Use UserContext ============
  const context = useContext(UserContext);

  // const [data, setData] = useState([]);
  const { getFieldDecorator } = props.form;

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
        console.log(info.file.name.replace(/\s+/g, "-").toLowerCase());
      }
      if (status === "done") {
        setImage(info.file.name.replace(/\s+/g, "-").toLowerCase());
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
    accept: "image/*",
    className: "video_upload"
  };

  /**
   * ================== END Upload Image Location ==================
   */

  /**
   * ================== GET and Disply Categories ==================
   */
  const DisplayCategory = () => {
    const { error, loading, data } = useQuery(GET_CATEGORIES);
    if (loading)
      return (
        <div className="category_loading">
          <Spin />
        </div>
      );
    if (error) console.log(error);
    return (
      <Form.Item className="marginBottomForm" hasFeedback>
        {getFieldDecorator("category_name", {
          rules: [{ required: true, message: "Please select the category!" }]
        })(
          <Select
            onChange={handleSelectChange}
            placeholder="Select the category"
          >
            {data.categories.map(category => {
              return (
                <Option value={category.title} key={category.id}>
                  {category.title}
                </Option>
              );
            })}
          </Select>
        )}
      </Form.Item>
    );
  };

  /**
   * ================== Tags Input Section ==================
   */
  const children = [];

  /**
   * ================== Section Input Section ==================
   */
  const handleSubmit = () => {
    props.form.validateFields(async (err, values) => {
      console.log({ ...values, description });

      await createCourse({
        variables: { ...values, description },
        refetchQueries: ["GET_COURSES"]
      });

      await Toast.fire({
        type: "success",
        title: "The course has been added successfully."
      });

      await props.form.resetFields();
    });
  };

  const handleEditorChange = (content, editor) => {
    // const result = ;
    // console.log(result);
    setDescription(content);
  };

  const handleSelectChange = value => {
    setSection({ ...section, type: value });
    console.log(`selected ${value}`);
  };

  const handleTagsChange = value => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="new_course_container">
      <h2 className="tutorailsTitle">Let's create awesome tutorails</h2>
      <Form onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            {/* ===== Title ===== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input your course title!"
                  }
                ]
              })(
                <Input
                  className="academyInputLarge"
                  prefix={
                    <Icon
                      type="font-size"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Course Title"
                />
              )}
            </Form.Item>

            {/* ===== Category ===== */}
            <Row>
              <Col span={24}>{DisplayCategory()}</Col>
            </Row>
            <Form.Item style={{ display: "none" }}>
              {getFieldDecorator("owner_id", {
                rules: [
                  {
                    required: true,
                    message: "Please input your owner_id!"
                  }
                ],
                initialValue: context.user.id
              })(
                <Input
                  className="academyInputLarge"
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="owner id"
                />
              )}
            </Form.Item>

            {/* ===== Price ===== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("price", {
                rules: [
                  {
                    required: true,
                    message: "Please input your price!"
                  }
                ],
                initialValue: 0
              })(
                <InputNumber
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  prefix={
                    <Icon type="dollar" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="price"
                  className="academySelect"
                />
              )}
            </Form.Item>

            {/* ===== Status ===== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("status", {
                rules: [
                  {
                    required: true,
                    message: "Please select the status!"
                  }
                ]
              })(
                <Select
                  placeholder="Select the status"
                  onChange={handleSelectChange}
                  className="academyInputLarge"
                >
                  <Option value="private">private</Option>
                  <Option value="public">public</Option>
                </Select>
              )}
            </Form.Item>

            {/* ===== Tags ===== */}
            <Form.Item hasFeedback>
              {getFieldDecorator("tags", {
                rules: [
                  {
                    required: true,
                    message: "Please input your tags!"
                  }
                ]
              })(
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleTagsChange}
                  className="academyInputLarge"
                >
                  {children}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* ========= Video Upload Section ======= */}
            <Form.Item>
              <Dragger
                {...imageProps}
                style={{
                  background: `url(https://learnbackend.koompi.com/uploads/${image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
                // className="draggerImage"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="file-image" />
                </p>
                <p className="ant-upload-text">Select image to upload</p>
                <p className="ant-upload-hint">or drag and drop image files</p>
              </Dragger>
            </Form.Item>

            <Form.Item hasFeedback>
              {getFieldDecorator("feature_image", {
                rules: [
                  {
                    required: true,
                    message: "Please upload image"
                  }
                ],
                initialValue: `${"https://learnbackend.koompi.com/uploads/" +
                  image}`
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="feature_image"
                  className="academyInputLarge"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {/* ================ Text Area ================= */}
            <Form.Item>
              <Editor
                apiKey="o8o9mqg89004wa97tt6edflsa8v2cgzwoeoss0n7d5xbw479"
                init={{ plugins: "link table" }}
                onEditorChange={handleEditorChange}
                // toolbar="bold italic underline code"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button htmlType="submit" className="btn_add_new_section">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(NewCourse);
