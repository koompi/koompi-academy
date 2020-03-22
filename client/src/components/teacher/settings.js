import React from "react";

import { Input, Row, Col, Avatar, Button, Form } from "antd";

const { TextArea } = Input;

function UserSetting() {
  return (
    <React.Fragment>
      <div className="user_container">
        <div className="settings_background">
          {/* User Avatar */}
          <div className="user_profile">
            <Row gutter={16}>
              <Col span={6}>
                <Avatar size={100} icon="user" />
              </Col>
            </Row>
          </div>
        </div>

        <div className="settings_form">
          <Form>
            <br />

            {/* User Name */}
            <Row gutter={16}>
              <Col span={12}>
                <Input placeholder="First Name" />
              </Col>
              <Col span={12}>
                <Input placeholder="Last Name" />
              </Col>
            </Row>
            <br />

            {/* User Email */}
            <Row gutter={16}>
              <Col span={24}>
                <Input placeholder="Email" />
              </Col>
            </Row>
            <br />

            {/* User Description */}
            <Row gutter={16}>
              <Col span={24}>
                <TextArea rows={4} placeholder="About you" />
              </Col>
            </Row>

            <br />

            <Button type="primary">Save changes</Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserSetting;
