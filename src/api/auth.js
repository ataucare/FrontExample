import API from "./http";

export default class ApiAuth {
  static login(username, password) {
    return API.post("/Auth/login", { username, password });
  }

  static resetTokenHeader() {
    API.defaults.headers.common = { Authorization: null };
    //APISIGFE.defaults.headers.common = { Authorization: null };
  }

  static verify() {
    return API.post("/Auth/verify");
  }
}