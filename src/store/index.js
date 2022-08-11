import Vue from 'vue'
import Vuex from 'vuex'
import ApiCuenta from "@/api/auth";
import http, { setTokenToHeader } from "@/api/http";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || '0',
    usuario: null,
    token: null,
    menu: null,
    dark: false
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },
    setUsuario(state, newUsuario) {
      state.usuario = newUsuario;
    },
    setMenu(state, newMenu) {
      state.menu = newMenu;
    },
    setTheme(state, dark) {
      state.dark = dark;
    }
  },
  actions: {
    async login({ dispatch, commit }, { username, password }) {
      try {
        const user = await ApiCuenta.login(username, password);
        console.log(user);
        commit("setToken", user.data.token);
        commit("setUsuario", user.data.usuario);
        commit("setMenu", user.data.menu);
        setTokenToHeader(http, user.data.token);
        console.log(this.state);
        dispatch("save");
      } catch (e) {
        console.error(e);
        console.error(`Failed to login: ${username}`);
        dispatch("logout");
        throw e;
      }
    },
    async logout({ commit, dispatch }) {
      console.log("logout");
      commit("setToken", null);
      commit("setUsuario", null);
      commit("setMenu", null);
      setTokenToHeader(http, null);
      dispatch("clear");
    },

    async save({ state }) {
      console.log("save");
      console.log(state);
      if (state.token != null && state.usuario != null) {
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.usuario));
        localStorage.setItem("menu", JSON.stringify(state.menu));
      }
    },

    async clear() {
      console.log("clear");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("menu");
    },

    async restore({ commit }) {
      console.log("restore");
      const usuario = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const menu = localStorage.getItem("menu");
      const dark = JSON.parse(localStorage.getItem("dark") ?? "false");
      if (usuario != null && token != null && menu != null) {
        commit("setToken", token);
        commit("setUsuario", JSON.parse(usuario));
        commit("setMenu", JSON.parse(menu));
        commit("setTheme", dark);
        setTokenToHeader(http, token);
        return true;
      }
      return false;
    },

    toggleTheme({ commit }, dark) {
      console.log(dark);
      commit("setTheme", dark);
      localStorage.setItem("dark", dark.toString());
    }
  },
  getters: {
    appVersion: (state) => {
      return state.packageVersion
    },
    
    hasToken(state) {
      return state.token != null;
    },

    hasUser(state) {
      return state.usuario != null;
    },

    hasMenu(state) {
      return state.menu != null;
    },

    getUser(state) {
      return state.usuario;
    },

    getMenu(state) {
      return state.menu;
    },

    isDark(state) {
      return state.dark;
    }
  },
  modules: {
  }
})
