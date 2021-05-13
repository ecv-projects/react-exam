import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../../store/users";

import Input from "../../components/Input";

const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [fields, setFields] = useState({
    firstname: "Léa",
    lastname: "Dubois",
    image: "https://via.placeholder.com/250",
    role: "admin",
    password: "azertyuiop",
    email:"lea@gmail.com",
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
    history.push('/profile')
  };

  return (
    <>
      <h1>Inscription</h1>
      <form className="m-10" onSubmit={submitForm}>
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
        <button type="submit" className="py-3 px-5 border mt-10">
          Créer un compte
        </button>
      </form>
      <Link className="block" to="/login">
        Déjà inscrit ?
      </Link>
    </>
  );
};

export default Register;
