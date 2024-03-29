import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "../css/register.module.css";
import { validateForm, validateAll, checkErrors } from "./formValidation";
import user from "../css/user.png";

const Register = () => {
  const history = useHistory();
  const [value, setValue] = useState({
    email: "",
    password: "",
    fullName: "",
    address: "",
    phone: "",
    formErrors: {},
  });

  const { formErrors } = value;

  const onChangeHandler = (name, e) => {
    const errors = validateAll({ [name]: e.target.value });
    console.log(value)
    setValue({
      ...value,
      [name]: e.target.value,
      formErrors: { ...value.formErrors, [name]: errors[name] },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { email, password, fullName } = value;
    const errors = validateForm({ email, password, fullName });
    console.log(errors);
    if (checkErrors(errors)) {
      console.log("valid", errors);
      history.push("/login");
    } else {
      console.log("invalid", errors);
    }
    setValue({ ...value, formErrors: errors });
  };

  return (
    <div className={classes.signup}>
      <img className={classes.image} src={user} alt="" />
      <h1 className={classes.header}>Register Now</h1>
      <form
        action=""
        onSubmit={(e) => onSubmitHandler(e)}
        className={classes.form}
      >
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => onChangeHandler("email", e)}
          validator={["required", "email"]}
        />
        {formErrors.email ? (
          <div className={classes.error} style={{ color: "red" }}>
            {formErrors.email}
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={(e) => onChangeHandler("password", e)}
          validator={["required", "password", "capital", "special"]}
        />
        {formErrors.password ? (
          <div className={classes.error} style={{ color: "red" }}>
            {formErrors.password}
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          name="fullName"
          placeholder="fullName"
          onChange={(e) => onChangeHandler("fullName", e)}
          validator={["required", "fullName"]}
        />
        {formErrors.fullName ? (
          <div className={classes.error} style={{ color: "red" }}>
            {formErrors.fullName}
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="address"
          onChange={(e) => onChangeHandler("address", e)}
        />
        <input
          type="number"
          placeholder="phone"
          onChange={(e) => onChangeHandler("phone", e)}
        />

        <button className={classes.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;

function outfun(fun) {
  let a = 1;
  return fun(a);
}

console.log(outfun((a) => a + 1));
