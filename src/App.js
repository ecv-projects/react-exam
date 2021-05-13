import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);


export default App;
