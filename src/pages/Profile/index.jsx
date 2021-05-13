import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";
import React from 'react';

import "./style.css";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(getUser);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const datas = {
        sub: jwt_decode(localStorage.getItem("access_token")).sub,
        token: localStorage.getItem("access_token"),
      };
      dispatch(fetchUser(datas));
    } else {
      history.push("/login");
    }
  }, []);

  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="container profile">
      <h1>Profile</h1>
      <div className="profile-actions">
        <button className="btn btn-danger" onClick={logout}>
          Se déconnecter
        </button>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/profile-edit")}
        >
          Editer son profil
        </button>
      </div>

      <div className="profile-content container-fluid">
        <div className="row">
          <div className="col-6">
            <img src={user.image} alt="" />
          </div>
          <div className="col-6">
            <h3>
              {user.firstname} {user.lastname}
            </h3>
            <p>
              <b>Email</b> : {user.email}
            </p>
            <p>
              <b>Rôle</b> : {user.role}
            </p>
            <p>
              <b>Age</b> : {user.age}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
