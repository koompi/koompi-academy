import React, { Fragment, Suspense } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { TeacherRoute } from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

/**
 * ================== Ant Design ==================
 */
import "antd/dist/antd.css";
import "./assets/css/App.css";

/**
 * ================== All Routes ==================
 */
import Login from "./components/users/login";
import Register from "./components/users/register";

import Logout from "./components/layout/logout";
import Student from "./components/student/routes/routes";
import Teacher from "./components/teacher/routes/routes";

function App() {
  return (
    <div className="App">
      <Fragment>
        <HashRouter>
          <Switch>
            <PublicRoute exact path="/" component={Student} />
            <PublicRoute path="/student" component={Student} />
            <PublicRoute
              exact
              path="/login"
              restricted={true}
              component={Login}
            />
            <PublicRoute
              exact
              path="/register"
              restricted={true}
              component={Register}
            />
            <PublicRoute
              exact
              restricted={false}
              component={Logout}
              path="/logout"
            />

            <Suspense fallback={<div>Loading.....</div>}>
              {/* ======== Teacher Route =========== */}

              <TeacherRoute
                exact
                path="/teacher/dashboard"
                component={Teacher}
              />
              <TeacherRoute exact path="/teacher/courses" component={Teacher} />
              <TeacherRoute
                exact
                path="/teacher/upload/video"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/course/new"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/course/add/section/:id"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/course/edit/section/:id"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/course/add/point/:section_id"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/course/edit/point/:id"
                component={Teacher}
              />

              <TeacherRoute exact path="/faq" component={Teacher} />
              <TeacherRoute
                exact
                path="/teacher/settings"
                component={Teacher}
              />
              <TeacherRoute
                exact
                path="/teacher/under-construction"
                component={Teacher}
              />
            </Suspense>
          </Switch>
        </HashRouter>
      </Fragment>
    </div>
  );
}
export default App;
