import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Projects from "./components/projects/Projects";
import NewAccount from "./components/auth/NewAccount";

import StateProject from "./context/projects/stateProject";
import StateTask from "./context/task/stateTask";

function App() {
  return (
    <StateProject>
      <StateTask>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/newAccount" component={NewAccount} />
            <Route exact path="/projects" component={Projects} />
          </Switch>
        </Router>
      </StateTask>
    </StateProject>
  );
}

export default App;
