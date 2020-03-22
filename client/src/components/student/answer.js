import React, { useContext } from "react";
import { UserContext } from "../../Layout";
import { Icon, Button, Form, Input } from "antd";
const { TextArea } = Input;

function Answer(props) {
  // ========== Use UserContext ============
  const context = useContext(UserContext);

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <Form
        onSubmit={async e => {
          await e.preventDefault();
          await props.form.validateFields(async (err, values) => {
            await props.answer_submit(values);
            await props.form.resetFields();
          });
        }}
      >
        <Form.Item hasFeedback>
          {getFieldDecorator("answer", {
            rules: [
              {
                required: true,
                message: "Please input your answer!"
              }
            ]
          })(
            <TextArea
              prefix={
                <Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Your answer"
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
        <Form.Item style={{ display: "none" }}>
          {getFieldDecorator("question_id", {
            rules: [
              {
                required: true,
                message: "Please input your question_id!"
              }
            ],
            initialValue: props.question_id
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button className="question_btn" htmlType="submit">
            Answer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Form.create()(Answer);
