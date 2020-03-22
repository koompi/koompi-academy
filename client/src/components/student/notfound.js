import React from "react";
import { Result, Button } from "antd";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <a href="/#/student/dashboard">
          <Button type="primary">Back Home</Button>
        </a>
      }
    />
  );
}

export default NotFound;
