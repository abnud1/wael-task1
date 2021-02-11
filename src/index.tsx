import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "@util/util.css";
import axios, { AxiosResponse } from "axios";
import store from "@store";
import { fetchColumns, fetchData } from "@store/issues";
import { Provider } from "react-redux";
import App from "./App";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `token ${token} hmac`;
    } else {
      config.headers = { Authorization: `token ${token} hmac` };
    }
  }
  return config;
});
axios
  .post(
    "https://bpro.net/api/v1/login",
    {
      username: "lab",
      password: "65",
    },
    {
      headers: {
        Authorization: "token hmac",
      },
    }
  )
  .then(async (res: AxiosResponse) => {
    localStorage.setItem("token", res.data.token);
    await store.dispatch(fetchColumns());
    await store.dispatch(fetchData());
    localStorage.removeItem("token");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("app")
    );
  });
