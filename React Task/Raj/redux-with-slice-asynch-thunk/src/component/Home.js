import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import cuid from "cuid";

import { btnEdit } from "../Config/Config";

export const Home = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const state1 = useSelector(state => state.editData);

  const { name, email, address, phone } = state;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      btnEdit({
        id: cuid(),
        name,
        email,
        address,
        phone,
      })
    );
    setState({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };
  const handleChange = (name, e) =>
    setState({ ...state, [name]: e.target.value });

  const editBtn = e => {
    e.preventDefault();
    setState({
      ...state,
      name: state1.name,
      email: state1.email,
      address: state1.address,
      phone: state1.phone,
    });
  };

  return (
    <div>
      <h3>Edit Form</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          onChange={e => handleChange("name", e)}
          label="Enter Name"
          required
          value={name}
        />
        <TextField
          type="email"
          onChange={e => handleChange("email", e)}
          label="Enter Email"
          required
          value={email}
        />
        <TextField
          type="text"
          onChange={e => handleChange("address", e)}
          label="Enter Address"
          required
          value={address}
        />
        <TextField
          type="Number"
          onChange={e => handleChange("phone", e)}
          label="Enter Phone"
          required
          value={phone}
        />
        <button color="primary" variant="contained">
          Submit
        </button>
      </form>

      <div>
        <h3>{state1.id}</h3>
        <h3>{state1.name}</h3>
        <h3>{state1.email}</h3>
        <h3>{state1.address}</h3>
        <h3>{state1.phone}</h3>
      </div>
      <div>
        <Button m={10} color="primary" variant="contained" onClick={editBtn}>
          Edit
        </Button>
      </div>
    </div>
  );
};
