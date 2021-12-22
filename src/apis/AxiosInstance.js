import axios from "axios";

const instance = axios.create({
  //baseURL:process.env.BACKEND_URL,
  baseURL: "https://todo-backenda.herokuapp.com",
  timeout: 0,
});

export default instance;
