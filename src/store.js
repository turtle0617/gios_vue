import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("api_token") || null,
    login_role: localStorage.getItem("login_role") || null,
    user_datail: JSON.parse(localStorage.getItem("user_profile")) || null,
    user_id: localStorage.getItem("user_id") || null,
    groups: localStorage.getItem("groups") || null
  },
  getters: {
    loggedIn(state) {
      return state.login_role;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
      state.login_role = null;
    },
    updateLoginRole(state, role) {
      state.login_role = role;
    },
    updateId(state, id) {
      state.user_id = id;
    },
    retrieveGroups(state, groups) {
      state.groups = groups;
    }
  },
  actions: {
    register(context, data) {
      return new Promise(function(resolve, reject) {
        API.Register("/member", data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retrieveGroups(context) {
      API.GET("/groups")
        .then(({ data }) => {
          localStorage.setItem("groups", data);
          context.commit("retrieveGroups", data);
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    retrieveCustomerToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/login", credentials)
          .then(data => {
            localStorage.setItem("api_token", data.api_token);
            localStorage.setItem("login_role", "customer");
            localStorage.setItem("user_profile", JSON.stringify(data));
            localStorage.setItem("updateId", data.id);
            context.commit("retrieveToken", data.api_token);
            context.commit("updateLoginRole", "customer");
            context.commit("updateId", data.id);
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retrieveTraderToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/boss/login", credentials)
          .then(data => {
            localStorage.setItem("api_token", data.api_token);
            localStorage.setItem("login_role", "trader");
            localStorage.setItem("updateId", data.id);
            context.commit("retrieveToken", data.api_token);
            context.commit("updateLoginRole", "trader");
            context.commit("updateId", data.id);
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    destroyCustomerToken({ commit, state }) {
      return new Promise(function(resolve, reject) {
        API.Logout(
          "/member/logout",
          state.user_id,
          "XZ5lqmYivXXiaqf3YvFlke4pENX0JaEQMLyXkcD2BdKarwvRZWT9jDPZ3SGK"
        )
          .then(res => {
            localStorage.clear();
            commit("destroyToken");
            resolve("logout success", res);
          })
          .catch(err => {
            commit("destroyToken");
            reject(err);
          });
      });
    },
    destroyTraderToken({ commit, state }) {
      return new Promise(function(resolve, reject) {
        API.Logout("/boss/logout", state.user_id, state.token)
          .then(res => {
            localStorage.clear();
            commit("destroyToken");
            resolve("logout success", res);
          })
          .catch(err => {
            commit("destroyToken");
            reject(err);
          });
      });
    }
  }
});
