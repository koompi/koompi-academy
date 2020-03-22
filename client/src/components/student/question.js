import React, { useContext } from "react";
import { UserContext } from "../../Layout";

import { Icon, Button, Form, Input } from "antd";

const { TextArea } = Input;

function Question(props) {
  // ========== Use UserContext ============
  const context = useContext(UserContext);

  const { getFieldDecorator, validateFields } = props.form;

  return (
    <div>
      <Form
        onSubmit={async e => {
          await e.preventDefault();
          await validateFields(async (err, values) => {
            if (!err) {
              await props.question_submit(values);
              await props.form.resetFields();
            }
            // const { user_id, question } = values;
          });
        }}
      >
        <Form.Item hasFeedback>
          {getFieldDecorator("question", {
            rules: [
              {
                required: true,
                message: "Please input your question!"
              }
            ]
          })(
            <TextArea
              prefix={
                <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Question?"
            />
          )}
        </Form.Item>
        <Form.Item style={{ display: "none" }}>
          {getFieldDecorator("user_id", {
            rules: [
              {
                required: true,
                message: "Please input your user_id!"
              }
            ],
            initialValue: context.user.id
          })(<Input />)}
        </Form.Item>

        <Form.Item>
          <Button className="question_btn" htmlType="submit">
            Ask
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(Question);
