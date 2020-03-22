import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_COURSE } from "../../../queries/query";
import { UserContext } from "../../../Layout";
import { useParams, Link } from "react-router-dom";
import {
  Icon,
  Button,
  Form,
  Input,
  Select,
  Col,
  Row,
  Spin,
  InputNumber,
  message
} from "antd";

const { Option } = Select;

function SectionForm(props) {
  /**
   * ================== State Section ==================
   */
  const [setSection] = useState("");
  const { id } = useParams();

  // ========== Use UserContext ============
  const context = useContext(UserContext);
  const { getFieldDecorator } = props.form;

  /**
   * ================== GET COURSE ==================
   */
  const DisplayCourse = () => {
    const { error, loading, data } = useQuery(GET_COURSE, {
      variables: {
        id
      }
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
        {getFieldDecorator("course_id", {
          rules: [{ required: true, message: "Please select the course!" }],
          initialValue: data.course.id
        })(
          <Select
            // showSearch
            onChange={handleSelectChange}
            className="displayCourseSection"
          >
            <Option value={data.course.id} key={data.course.id}>
              {data.course.title}
            </Option>
          </Select>
        )}
      </Form.Item>
    );
  };

  /**
   * ================== Mutation Section ==================
   */
  const handleSelectChange = value => {
    setSection(value);
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          await props.form.validateFields(async (err, values) => {
            if (err) {
              return message.error(
                "Please make sure, All the input are required!"
              );
            } else {
              await props.addSection(values);
              await props.form.resetFields();
            }
          });
        }}
      >
        <Row gutter={16}>
          {/* ================ course id ================= */}
          <Col span={24}>{DisplayCourse()}</Col>
        </Row>
        <Row gutter={16}>
          {/* ================ Section No ================= */}
          <Col span={6}>
            <Form.Item hasFeedback>
              {getFieldDecorator("no", {
                rules: [
                  {
                    required: true,
                    message: "Please input your section_no!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Section No"
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
                    message: "Please input your section title!"
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
                  placeholder="Section Title"
                  className="ant-input-lg"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* ================ owner id ================= */}
          <Col span={24}>
            <Form.Item hasFeedback style={{ display: "none" }}>
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
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder={context.user.id}
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        <Button className="btn_add_new_section" htmlType="submit">
          Add Section
        </Button>
      </Form>
    </div>
  );
}

export default Form.create()(SectionForm);
