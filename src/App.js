import "./styles.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage.js";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";

function App() {
  const [userPhotos, setUserPhotos] = useState([
    {
      id: 1,
      name: "Harry Potter",
      avatar:
        "https://fsmedia.imgix.net/43/e6/c3/51/cc03/4242/af6a/479124d85903/screen-shot-2019-02-19-at-40014-pmpng.png?auto=compress&h=1200&w=1200&crop=edges&fit=crop",
      image:
        "https://images.unsplash.com/photo-1573853818293-0a47b8cd95de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      likes: "123"
    },
    {
      id: 2,
      name: "Jerry Potter",
      avatar:
        "https://fsmedia.imgix.net/43/e6/c3/51/cc03/4242/af6a/479124d85903/screen-shot-2019-02-19-at-40014-pmpng.png?auto=compress&h=1200&w=1200&crop=edges&fit=crop",
      image:
        "https://images.unsplash.com/photo-1573853818293-0a47b8cd95de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      likes: "123"
    },
    {
      id: 3,
      name: "Larry Potter",
      avatar:
        "https://fsmedia.imgix.net/43/e6/c3/51/cc03/4242/af6a/479124d85903/screen-shot-2019-02-19-at-40014-pmpng.png?auto=compress&h=1200&w=1200&crop=edges&fit=crop",
      image:
        "https://images.unsplash.com/photo-1573853818293-0a47b8cd95de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      likes: "123"
    },
    {
      id: 4,
      name: "Larry Potter",
      avatar:
        "https://fsmedia.imgix.net/43/e6/c3/51/cc03/4242/af6a/479124d85903/screen-shot-2019-02-19-at-40014-pmpng.png?auto=compress&h=1200&w=1200&crop=edges&fit=crop",
      image:
        "https://images.unsplash.com/photo-1573853818293-0a47b8cd95de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80",
      likes: "123"
    }
  ]);

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute path="/profile-page">
          <Route exact path="/profile-page" component={ProfilePage} />
        </PrivateRoute>
        <Link to="/gallery">Gallery</Link>
        <Route
          exact
          path="/"
          render={props => {
            {
              return <GalleryList {...props} userPhotos={userPhotos} />;
            }
          }}
        />
        <Route
          exact
          path="/photo-data/:id"
          render={props => {
            {
              return <CardDetails {...props} userPhotos={userPhotos} />;
            }
          }}
        />
         
        <Route exact path="/photo-data/:id" component={GalleryCard} />
      </div>
    </Router>
  );
}

export default App;
