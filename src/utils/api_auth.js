import axios from "axios";
import { API_URL } from "./constants";

export const login = async (email, password) => {
  const res = await axios.post(API_URL + "users/login", { email, password });
  return res.data;
};

export const signup = async (name, email, password) => {
  const res = await axios.post(API_URL + "users/signup", {
    name,
    email,
    password,
  });
  return res.data;
};
