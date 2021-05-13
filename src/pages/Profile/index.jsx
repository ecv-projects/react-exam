import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser, getUser } from "../../store/users";

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
      history.push("/");
    }
  });

  function logout(e) {
    e.preventDefault();
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1>Profile</h1>
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
