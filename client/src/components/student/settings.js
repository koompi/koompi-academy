import React, { useContext } from "react";

import { Input, Row, Col, Avatar, Button, Form } from "antd";
import { GET_USER } from "../../queries/query";
import { useQuery } from "@apollo/react-hooks";
import { UserContext } from "../../Layout";

const { TextArea } = Input;

function UserSetting() {
  const context = useContext(UserContext);

  const DisplayUser = () => {
    const { error, loading, data } = useQuery(GET_USER, {
      variables: { user_id: context.user.id }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return error;
    if (data.user === undefined || data.user === "") return null;
    else {
      const { avatar, fullname, email } = data.user;
      return (
        <React.Fragment>
          <div className="user_container">
            <div className="settings_background">
              {/* User Avatar */}

              <div className="user_profile">
                <Row gutter={16}>
                  <Col span={6}>
                    <Avatar size={100} icon="user" src={avatar} />
                  </Col>
                </Row>
              </div>
              <h4 className="user_profile_name">{fullname}</h4>
            </div>

            <div className="settings_form">
              <Form>
                <br />

                {/* User Name */}
                <Row gutter={16}>
                  <Col span={12}>
                    <Input value={fullname} />
                  </Col>
                  <Col span={12}>
                    <Input placeholder="Last Name" />
                  </Col>
                </Row>
                <br />

                {/* User Email */}
                <Row gutter={16}>
                  <Col span={24}>
                    <Input value={email} />
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
  };
  return DisplayUser();
}

export default UserSetting;
