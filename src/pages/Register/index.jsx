import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../store/users";
import React from 'react';

import Input from "../../components/Input";
import './style.css';


const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.push("/profile");
    }
  });

  const [fields, setFields] = useState({
    firstname: "Léa",
    lastname: "Dubois",
    age: 24,
    image: "https://via.placeholder.com/250",
    role: "admin",
    password: "azertyuiop",
    email: "lea@gmail.com",
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
    dispatch(register({ ...fields }));
    history.push("/profile");
  };

  return (
    <>
      <div className="container register">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <h1>Inscription</h1>
            <form className="card" onSubmit={submitForm}>
              <div className="form-group card-body">
                <Input
                  label="Prénom"
                  name="firstname"
                  handleChange={handleChangeField}
                  value={fields.firstname}
                />
                <Input
                  label="Nom"
                  name="lastname"
                  handleChange={handleChangeField}
                  value={fields.lastname}
                />
                 <Input
                  label="Age"
                  name="age"
                  type="number"
                  handleChange={handleChangeField}
                  value={fields.age}
                />
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
                <Input
                  label="Image"
                  name="image"
                  handleChange={handleChangeField}
                  value={fields.image}
                />
                <Input
                  label=""
                  name="role"
                  type="hidden"
                  handleChange={handleChangeField}
                  value={fields.role}
                />
                <button type="submit" className="btn btn-primary">
                  Créer un compte
                </button>
              </div>
            </form>
            <Link className="block" to="/login">
              Déjà inscrit ?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
