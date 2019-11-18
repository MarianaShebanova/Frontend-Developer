import "./styles.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import ProfilePage from './components/ProfilePage.js';
import PrivateRoute from './components/PrivateRoute';
import AddForm from "./components/AddForm";


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/profile-page">
            <Route exact path="/profile-page" component={ProfilePage} />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
