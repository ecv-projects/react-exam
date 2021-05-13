import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, { payload }) {
      state.users = [...state.users, payload];
    },
    getOneUser(state, { payload }) {
      state.user = payload;
    },
    updateUser(state, { payload }) {
      let newArray = [...state.users];
      let index = newArray.findIndex((item) => item.id === payload.id);
      newArray[index] = { ...newArray[index], payload };
      state.users = [...newArray];
    },
  },
});

const { addUser, getOneUser, updateUser } = users.actions;

export const register = (user) => async (dispatch) => {
  console.log(user);
  try {
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch(addUser(data));
    console.log(data);
    localStorage.setItem("access_token", data.accessToken);
  } catch (e) {
    console.error(e);
  }
};

export const login = (user) => async (dispatch) => {
  console.log(user);
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch(addUser(data));
    localStorage.setItem("access_token", data.accessToken);
  } catch (e) {
    console.error(e);
  }
};

export const fetchUser = (datas) => async (dispatch) => {
  console.log(datas);
  try {
    const response = await fetch(
      `http://localhost:3001/600/users/${datas.sub}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${datas.token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(getOneUser(data));
  } catch (e) {
    console.error(e);
  }
};

export const editProfile = (datas) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:3001/600/users/${datas.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(datas),
      }
    );
    const data = await response.json();
    dispatch(updateUser(data));
  } catch (e) {
    console.error(e);
  }
};

//Selectors
export const getUser = (state) => state.users.user;

export default users.reducer;
