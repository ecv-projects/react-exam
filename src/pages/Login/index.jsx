import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/users";
import jwt from "jsonwebtoken";

import Input from "../../components/Input";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [fields, setFields] = useState({
    email: "",
    password: "",
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
      <h1>Connexion</h1>
      <form className="m-10" onSubmit={submitForm}>
        <Input
          label="Email"
          name="email"
          handleChange={handleChangeField}
          value={fields.text}
        />

        <Input
          label="Mot de passe"
          name="password"
          type="paswword"
          handleChange={handleChangeField}
          value={fields.password}
        />
        <button type="submit" className="py-3 px-5 border mt-10">
          Se connecter
        </button>
      </form>
      <Link className="block" to="/register">
        Pas encore de compte ?
      </Link>
    </>
  );
};

export default Login;
