import axios from "axios";

const api = axios.create({
  baseURL: "https://creatoros-mm7s.onrender.com/api",
});

export default api;