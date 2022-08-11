import axios from "axios";
import router from "../router"

export const API_BASE_DOMAIN = process.env.VUE_APP_API_BACKEND;
export const API_BASE_URL = `${API_BASE_DOMAIN}/api/v1`;

console.log(API_BASE_URL);

let apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export function setTokenToHeader(http, token) {
  http.defaults.headers.common = {
    Authorization: token ? `Bearer ${token}` : null
  };
}

apiInstance.interceptors.response.use(
  response => response,
  error => {
    console.log("error");
    console.log(error);
    console.log("error.response");
    console.log(error.response);
    const { status } = error.response;

    if (status == 401 || status == null) { // unauthorized
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export default apiInstance;