import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const token = localStorage.getItem("token");
console.log("instances token", token);

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  accept: "application/json",
};

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers,
});
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
