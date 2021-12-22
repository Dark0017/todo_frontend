import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
  //baseURL:process.env.BACKEND_URL,
  timeout: 0,
});

export default instance;
