import { Link } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, getUser } from "../../store/users";
import jwt_decode from "jwt-decode";

import "./style.css";

const Header = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (localStorage.getItem("access_token")) {
      const datas = {
        sub: jwt_decode(localStorage.getItem("access_token")).sub,
        token: localStorage.getItem("access_token"),
      };
      await dispatch(fetchUser(datas));
    } else {
      console.log("nothing");
    }
  }, []);
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <div className="navbar-nav mr-auto">
            <div className="nav-item active">
              <Link className="nav-link" to={"/articles"}>
                Articles
              </Link>
            </div>
            <div className="nav-item">
              <Link className="nav-link" to={"/add"}>
                Add
              </Link>
            </div>
            {!localStorage.getItem("access_token") && (
              <div className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </div>
            )}
            {!localStorage.getItem("access_token") && (
              <div className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </div>
            )}
            {localStorage.getItem("access_token") && (
              <div className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
