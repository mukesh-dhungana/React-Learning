import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Thunk
export const getData = createAsyncThunk("data/getData", (endpoint) => {
  return fetch(endpoint)
    .then((response) => response.json())
    .then((user) => user.results);
});

//CreateSlice

const initialState = {
  entities: [],
  user: {
    id: 12,
    name: "Xyz",
    email: "xyz@gmail.com",
    address: "xyz xyz",
    phone: "2121212121221",
  },
  addUser: {
    name: "",
    pass: "",
  },
  loading: false,
  error: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    add(state, action) {
      state.addUser = action.payload;
    },
    edit(state, action) {
      state.user = action.payload;
    },
    load(state) {
      state.loading = true;
    },
    editPass(state, action) {
      state.addUser.pass = action.payload.pass;
    },
    error(state, action) {
      state.error = true;
    },
    setError(state, action) {
      state.error = false;
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
      console.warn("slice", action);
    },
  },
});

export const { edit, load, add, editPass } = dataSlice.actions;

export default dataSlice.reducer;
