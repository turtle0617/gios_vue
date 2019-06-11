import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
    isAdmin: localStorage.getItem("admin") || null,
    user_datail: {
      id: "",
      account: "",
      name: "",
      rice: "",
      vegetable: "",
      group_id: "",
      note: ""
    }
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    isAdmin(state) {
      return state.isAdmin !== null;
    }
  },
  mutations: {
    retriveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    updateUserDetail(state, data) {
      state.user_datail.id = data.id;
      state.user_datail.account = data.account;
      state.user_datail.name = data.name;
      state.user_datail.rice = data.rice;
      state.user_datail.vegetable = data.vegetable;
      state.user_datail.group_id = data.group_id;
      state.user_datail.note = data.note;
    }
  },
  actions: {
    register(context, data) {
      return new Promise(function(resolve, reject) {
        API.Register("/register", data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retriveCustomerToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/login", credentials)
          .then(data => {
            localStorage.setItem("access_token", data.access_token);
            context.commit("retriveToken", data.access_token);
            context.commit("updateUserDetail", data);
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retriveTraderToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/boss/login", credentials)
          .then(data => {
            // localStorage.setItem("access_token", data.access_token);
            // localStorage.setItem("admin", true);
            context.commit("retriveToken", data.access_token);
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    destroyToken({ commit, state }) {
      return new Promise(function(resolve, reject) {
        API.Logout(
          "/logout",
          state.user_datail.id,
          "XZ5lqmYivXXiaqf3YvFlke4pENX0JaEQMLyXkcD2BdKarwvRZWT9jDPZ3SGK"
        )
          .then(res => {
            localStorage.removeItem("access_token");
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
