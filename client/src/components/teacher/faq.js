import React from "react";

import { Collapse, Icon, Form } from "antd";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: "#ffffff",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};

const FAQ = () => {
  return (
    <React.Fragment>
      <div className="faqContainer">
        <center>
          <h1>FAQ</h1>
          <br />
        </center>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <Icon type="caret-right" rotate={isActive ? 90 : 0} />
          )}
        >
          <Panel
            header="This is panel header 1"
            key="1"
            style={customPanelStyle}
          >
            <p>{text}</p>
          </Panel>
          <Panel
            header="This is panel header 2"
            key="2"
            style={customPanelStyle}
          >
            <p>{text}</p>
          </Panel>
          <Panel
            header="This is panel header 3"
            key="3"
            style={customPanelStyle}
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default Form.create()(FAQ);
