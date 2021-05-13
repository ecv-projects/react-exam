import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editProfile, getUser } from "../../store/users";

import Input from "../../components/Input";
import "./style.css";

const Register = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const user = useSelector(getUser);

  const [fields, setFields] = useState({});

  useEffect(() => {
    if (user) {
      setFields({
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        image: user.image,
        role: user.role,
        password: user.password,
        email: user.email,
        id: user.id,
      });
    }
  }, []);

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
    console.log({ ...fields });
    dispatch(
      editProfile({
        ...fields,
      })
    );
    history.push("/profile");
  };

  return (
    <>
      <div className="container register">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <h1>Editer mon profil</h1>
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
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
