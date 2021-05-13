import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddArticle from "./pages/AddArticle";
import Article from "./pages/Article";
import ArticlesList from "./pages/ArticlesList";

import Home from './pages/Home'

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

  <div className="container mt-3">
    <Switch>
       <Route exact path={["/"]} component={Home} />
      <Route exact path={["/articles"]} component={ArticlesList} />
      <Route exact path="/add" component={AddArticle} />
      <Route path="/articles/:id" component={Article} />
    </Switch>
  </div>
</Router>
  // <Router>
  //   <Switch>
  //     <Route path="/create-article" component={CreateArticle} />
  //     <Route path="/edit-article" component={EditArticle} />
  //     <Route path="/articles/:id" component={Article} />
  //     <Route path="/articles" component={Articles} />
  //     <Route path="/" component={Home} />
  //   </Switch>
  // </Router>
);

export default App;