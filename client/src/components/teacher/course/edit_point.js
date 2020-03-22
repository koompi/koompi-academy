import React, { useState } from "react";
import { UPDATE_POINT } from "../../../queries/mutation";
import { GET_POINT_BY_ID } from "../../../queries/query";
import { useMutation } from "@apollo/react-hooks";
/** Ant Design */
import { Icon, Modal, Button, Form, Col, message, Row, Input } from "antd";

/** Handle Edit Point */
function EditPoint({
  no,
  title,
  visible,
  video_link,
  id,
  handleCancel,
  form,
  refetch
}) {
  const [updatePoint] = useMutation(UPDATE_POINT);
  const { getFieldDecorator } = form;

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFields(async (err, values) => {
      if (err) {
        return message.error("Please make sure, All the input are required!");
      } else {
        await updatePoint({ variables: { id, ...values } })
          .then(async res => {
            await message.success(res.data.update_point.message);
            await window.location.reload();
          })
          .catch(error => console.error(error));
      }
    });
  };

  return (
    <Modal
      title={`Edit ${title}`}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="40%"
    >
      <Form onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item hasFeedback>
              {getFieldDecorator("no", {
                rules: [
                  {
                    required: true,
                    message: "Please input your section_no!"
                  }
                ],
                initialValue: no
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

          <Col span={18}>
            <Form.Item hasFeedback>
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input your section title!"
                  }
                ],
                initialValue: title
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

          <Col span={24}>
            <Form.Item hasFeedback>
              {getFieldDecorator("video_link", {
                rules: [
                  {
                    required: true,
                    message: "Please input your section title!"
                  }
                ],
                initialValue: video_link
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
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </Modal>
  );
}

export default Form.create()(EditPoint);
