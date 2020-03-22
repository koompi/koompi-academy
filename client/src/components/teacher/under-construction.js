import React from "react";
import underconstruction from "../../assets/images/underconstruction.png";
import { Layout } from "antd";

const { Content } = Layout;
function UnderConstruction() {
  return (
    <Content style={{ margin: "24px 16px 0" }}>
      <div style={{ backgroundColor: "#f1f2f2" }}>
        <center>
          <img src={underconstruction} alt="underconstruction" />
        </center>
      </div>
    </Content>
  );
}

export default UnderConstruction;
