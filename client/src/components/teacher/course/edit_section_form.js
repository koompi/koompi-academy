import React, { useState } from "react";
import { UPDATE_SECTION } from "../../../queries/mutation";
import { GET_SECTION_BY_ID } from "../../../queries/query";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
/** Ant Design */
import { Icon, Modal, Button, Form, Col, message, Row, Input } from "antd";

/** Handle Edit Point */
function EditSection({ id, form, visible, handleCancel }) {
  const [updateSection] = useMutation(UPDATE_SECTION);
  const { getFieldDecorator } = form;
  const [data, setData] = useState({});

  /** Display the section data by section id */
  const DisplaySectionData = () => {
    const { error, loading, data } = useQuery(GET_SECTION_BY_ID, {
      variables: { id }
    });
    if (loading) return "Loading...";
    if (error) console.log(error);
    setData(data.section_by_id);
    console.log(data.section_by_id);

    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await form.validateFields(async (err, values) => {
      if (err) {
        return message.error("Please make sure, All the input are required!");
      } else {
        await updateSection({ variables: { id, ...values } })
          .then(async res => {
            await message.success(res.data.update_section.message);
            await window.location.reload();
          })
          .catch(error => console.error(error));
      }
    });
  };

  return (
    <Modal
      title={`Edit ${data.title}`}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="40%"
    >
      <DisplaySectionData />
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
                initialValue: data.no
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
                initialValue: data.title
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

export default Form.create()(EditSection);
