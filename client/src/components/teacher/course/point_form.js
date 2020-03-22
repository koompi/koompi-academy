import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SECTION } from "../../../queries/query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Icon,
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  Checkbox,
  Spin,
  InputNumber,
  message
} from "antd";

const { Option } = Select;

function PointForm(props) {
  const { id } = useParams();

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

  const [video] = useState();

  const { getFieldDecorator } = props.form;

  /**
   * ================== Display Section in SELECT OPTION ==================
   */
  const DisplaySection = () => {
    const { error, loading, data } = useQuery(GET_SECTION, {
      variables: { course_id: id }
    });
    if (loading)
      return (
        <div className="category_loading">
          <Spin />
        </div>
      );
    if (error) console.log(error);
    return (
      <Form.Item className="marginBottomForm" hasFeedback>
        {getFieldDecorator("section_id", {
          rules: [{ required: true, message: "Please select the section!" }]
        })(
          <Select
            onChange={handleSelectChange}
            placeholder="Select the section"
            className="displayCourseSection"
          >
            {data.sections.map(section => {
              return (
                <Option value={section.id} key={section.id}>
                  {section.title}
                </Option>
              );
            })}
          </Select>
        )}
      </Form.Item>
    );
  };

  const handleSelectChange = value => {
    setSection({ ...section, type: value });
  };

  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.form.validateFields(async (err, values) => {
            if (err) {
              return message.error(
                "Please make sure, All the input are required!"
              );
            } else {
              await props.addPoint(values);
              await props.form.resetFields();
            }
          });
        }}
      >
        <Row gutter={16}>
          {/* ================ course id ================= */}
          <Col span={24}>{DisplaySection()}</Col>
        </Row>

        <Row gutter={16}>
          {/* ================ Section No ================= */}
          <Col span={6}>
            <Form.Item hasFeedback>
              {getFieldDecorator("no", {
                rules: [
                  {
                    required: true,
                    message: "Please input your point_no!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Point No"
                  className="ant-input-lg"
                />
              )}
            </Form.Item>
          </Col>
          {/* ================ Section Title ================= */}
          <Col span={18}>
            <Form.Item hasFeedback>
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input your point title!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="font-size"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Point Title"
                  className="ant-input-lg"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* ================ Video Url ================= */}
          <Col span={24}>
            <Form.Item hasFeedback>
              {getFieldDecorator("video_link", {
                rules: [
                  {
                    required: true,
                    message: "Please input your point title!"
                  }
                ],
                initialValue: video
              })(
                <Input
                  prefix={
                    <Icon
                      type="font-size"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Video Link"
                  className="ant-input-lg"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ display: "none" }}>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator("preview", {
                initialValue: false
              })(<Checkbox>Preview</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>

        <Button className="btn_add_new_section" htmlType="submit">
          Add Point
        </Button>
      </Form>
    </div>
  );
}

export default Form.create()(PointForm);
