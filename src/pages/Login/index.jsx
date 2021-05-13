import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/users";
import jwt from "jsonwebtoken";

import Input from "../../components/Input";
import './style.css';

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.push("/profile");
    }
  });

  const [fields, setFields] = useState({
    email: "lea@gmail.com",
    password: "azertyuiop",
  });

  const handleChangeField = ({ target: { value, name } }) =>
    setFields({
      ...fields,
      [name]: value,
    });

  const submitForm = (e) => {
    e.preventDefault();
    const checkRequired = Object.keys(fields).find((key) => fields[key] === "");
    if (checkRequired) {
      return;
    }
    console.log(fields);
    dispatch(login({ ...fields }));
    const payload = {
      email: fields.email,
      password: fields.password,
    };
    localStorage.setItem(
      "access_token",
      jwt.sign(payload, "123456789", { expiresIn: "1h" })
    );
    history.push("/profile");
  };

  return (
    <>
      <div className="container login">
        <div className="row justify-content-center">
        <div className="col-12 col-md-8">
        <h1>Connexion</h1>
        <form className="card" onSubmit={submitForm}>
          <div className="form-group card-body">
            <Input
              label="Email"
              name="email"
              handleChange={handleChangeField}
              value={fields.email}
            />

            <Input
              label="Mot de passe"
              name="password"
              type="password"
              handleChange={handleChangeField}
              value={fields.password}
            />
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
        </form>
        <Link className="block" to="/register">
          Pas encore de compte ?
        </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default Login;
