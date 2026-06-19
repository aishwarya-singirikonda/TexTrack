import axios from "axios";

const API = axios.create({
  baseURL: "https://textrack-backend-kr8w.onrender.com/api",
});

export default API;