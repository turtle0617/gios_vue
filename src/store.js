import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    }
  },
  actions: {
    retriveToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/login", credentials)
          .then(data => {
            localStorage.setItem("access_token", data.access_token);
            context.commit("retriveToken", data.access_token);
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    destroyToken(context) {
      return new Promise(function(resolve, reject) {
        API.Logout(
          "/logout/2",
          "XZ5lqmYivXXiaqf3YvFlke4pENX0JaEQMLyXkcD2BdKarwvRZWT9jDPZ3SGK"
        )
          .then(res => {
            localStorage.removeItem("access_token");
            context.commit("destroyToken");
            resolve("logout success", res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});
