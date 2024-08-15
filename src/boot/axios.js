/* eslint-disable */
import { boot } from "quasar/wrappers";
import axios from "axios";

const baseURL = "http://localhost:4000";
// const baseURL = "https://backendrumahbumn-production.up.railway.app";
const api = axios.create({ baseURL: baseURL });

export default boot(({ app, router }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$imgUrl = baseURL;
  app.config.globalProperties.$api = api;
});

export { api, axios };
