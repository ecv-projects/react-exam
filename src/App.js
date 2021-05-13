import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddArticle from "./pages/AddArticle";
import Article from "./pages/Article";
import ArticlesList from "./pages/ArticlesList";
import ProfileEdit from "./pages/ProfileEdit";

const App = () => (
  <Router>
  <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/"} className="navbar-brand">
      Home
    </Link>
    <div className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to={"/articles"} className="nav-link">
          Articles
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/add"} className="nav-link">
          Add
        </Link>
      </li>
    </div>
  </nav>

  <div className="mt-3">
    <Switch>
    <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route exact path={["/"]} component={Home} />
      <Route exact path={["/articles"]} component={ArticlesList} />
      <Route exact path="/add" component={AddArticle} />
      <Route path="/articles/:id" component={Article} />
      <Route path="/profile-edit" component={ProfileEdit} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
</Router>
);

export default App;