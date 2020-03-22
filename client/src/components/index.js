import React, { useContext } from "react";
import { UserContext } from "../Layout";
import Teacher from "./teacher/layout";

function Index(props) {
  // ========== Use UserContext ============
  const context = useContext(UserContext);
  console.log("index", context);

  if (context.user.role === "teacher") {
    return <Teacher />;
  } else {
    return null;
  }
}

export default Index;
